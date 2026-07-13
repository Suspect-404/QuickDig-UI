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
        return res.status(400).json({ error: 'Please provide both IP and Port.' });
    }

    try {
        const state = await GameDig.query({
            type: game || 'battlefield2',
            host: ip,
            port: parseInt(port)
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
            error: 'Failed to connect to the server. Please check the IP and Port.' 
        });
    }
});

app.listen(PORT, () => {
    console.log(`QuickDig UI Backend running on port ${PORT}`);
});
