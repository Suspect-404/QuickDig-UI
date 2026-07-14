# QuickDig UI - Server Status Monitor

A fast, lightweight, and open-source web interface designed to verify game server status, network addresses, and live player rosters.

**Live Tool:** [Click Here to Use QuickDig UI](https://quick-dig-ui.vercel.app)

## About The Project
QuickDig UI is built for server administrators and community developers who need a quick way to verify a target server's exact IP, Query Port, and live connection status. Instead of relying on manual command-line queries, this tool provides a direct visual confirmation of the server's backend data and active player connections.

## Supported Games
To ensure accurate data extraction and correct team parsing, this tool is optimized for the GameSpy3 query protocol utilized by:
* Project Reality: BF2
* Battlefield 2

## Key Features
* Server Verification: Quickly confirm if an IP and Port belong to the target server.
* Team Roster Parsing: Automatically divides connected players into their respective teams.
* Player Statistics: Extracts and displays live player data including Score, Kills, Deaths, and Ping.
* Live Updates: Server data and player lists automatically refresh in the background.

## Known Limitations
* 64-Player Query Limit: Due to hardcoded limitations within the GameSpy3 protocol and UDP packet constraints, external player roster extraction is generally capped at approximately 64 players. 
* Next Map Visibility: The Next Map string is only displayed if the server explicitly broadcasts it. Vanilla Battlefield 2 servers generally do not provide this variable externally.

## Architecture
* Frontend: HTML5, CSS3, Vanilla JavaScript.
* Backend API: Node.js, Express.
* Query Engine: node-gamedig.
* Deployment: Vercel.
