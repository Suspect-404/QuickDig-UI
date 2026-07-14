const express = require('express');
const { GameDig } = require('gamedig');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, './')));

const PRSPY_URL = 'https://servers.realitymod.com/api/ServerInfo';

// -----------------------------------------------------------------------
// Simple in-memory cache for the PRSPY payload.
// The endpoint returns EVERY PR server on the master list, so there's no
// point re-fetching it on every 5s poll from every connected client.
// -----------------------------------------------------------------------
let prspyCache = {
    data: null,
    timestamp: 0
};
const PRSPY_CACHE_TTL = 4000; // ms

async function getPrspyData() {
    const now = Date.now();
    if (prspyCache.data && (now - prspyCache.timestamp) < PRSPY_CACHE_TTL) {
        return prspyCache.data;
    }

    const response = await fetch(PRSPY_URL, {
        // small timeout guard so a slow PRSPY response never blocks the whole request
        signal: AbortSignal.timeout(5000)
    });

    if (!response.ok) {
        throw new Error(`PRSPY responded with status ${response.status}`);
    }

    const json = await response.json();
    prspyCache = { data: json, timestamp: now };
    return json;
}

// Normalize a hostname string for comparison (trim + collapse whitespace).
function normalizeName(str) {
    return (str || '').trim().replace(/\s+/g, ' ');
}

// Find the matching server entry in the PRSPY payload by hostname.
// The GameSpy3 "name" field and PRSPY's "hostname" property come from the
// exact same source string on the server side, so an exact match after
// normalization is reliable.
function findPrspyServer(prspyPayload, gamedigName) {
    if (!prspyPayload || !Array.isArray(prspyPayload.servers)) return null;

    const targetName = normalizeName(gamedigName);
    if (!targetName) return null;

    return prspyPayload.servers.find(srv => {
        const hostname = normalizeName(srv?.properties?.hostname);
        return hostname === targetName;
    }) || null;
}

app.get('/api/status', async (req, res) => {
    const { ip, port, game } = req.query;

    if (!ip || !port) {
        return res.status(400).json({ error: 'Please provide IP and Port.' });
    }

    try {
        const state = await GameDig.query({
            type: game || 'battlefield2',
            host: ip,
            port: parseInt(port),
            maxRetries: 2
        });

        // Default: whatever GameDig gave us (capped at ~64 players by the protocol)
        let players = state.players;
        let numplayers = state.players.length;
        let source = 'gamedig';

        // Try to enrich with the full roster from PRSPY, if we can find a match.
        try {
            const prspyPayload = await getPrspyData();
            const match = findPrspyServer(prspyPayload, state.name);

            if (match && Array.isArray(match.players)) {
                players = match.players;
                numplayers = match.players.length;
                source = 'prspy';
            }
        } catch (prspyErr) {
            // PRSPY being unreachable/slow should never break the core feature.
            // We just silently fall back to the GameDig-provided (possibly capped) roster.
            console.warn('PRSPY enrichment failed, falling back to GameDig data:', prspyErr.message);
        }

        res.json({
            success: true,
            name: state.name,
            map: state.map,
            numplayers,
            maxplayers: state.maxplayers,
            players,
            raw: state.raw,
            playerSource: source // "prspy" or "gamedig" - useful for debugging/UI badge
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: 'Connection failed. Verify the IP and Query Port.'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

module.exports = app;
