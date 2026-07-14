const express = require('express');
const { GameDig } = require('gamedig');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static(path.join(__dirname, './')));

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

        res.json({
            success: true,
            name: state.name,
            map: state.map,
            numplayers: state.players.length,
            maxplayers: state.maxplayers,
            players: state.players,
            raw: state.raw
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            error: 'Connection failed. Verify the IP, Query Port, and Game Type.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on port ${PORT}`);
});

module.exports = app;
