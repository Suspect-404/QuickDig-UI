const express = require('express');
const { GameDig } = require('gamedig');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all routes
app.use(cors());

// Serve static files (like index.html) from the current directory
app.use(express.static(path.join(__dirname, './')));

// API endpoint to fetch server status
app.get('/api/status', async (req, res) => {
    const { ip, port, game } = req.query;

    if (!ip || !port) {
        return res.status(400).json({ error: 'Please provide both IP and Port.' });
    }

    try {
        // Query the game server using GameDig
        const state = await GameDig.query({
            type: game || 'battlefield2', // Default to PR / BF2
            host: ip,
            port: parseInt(port)
        });

        // Return structured data to the frontend
        res.json({
            success: true,
            name: state.name,
            map: state.map,
            numplayers: state.players.length,
            maxplayers: state.maxplayers,
            players: state.players
        });
    } catch (error) {
        // Handle offline servers or invalid IP/Port
        res.status(500).json({ 
            success: false, 
            error: 'Failed to connect to the server. Please check the IP and Port.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`QuickDig UI Backend running on port ${PORT}`);
});
