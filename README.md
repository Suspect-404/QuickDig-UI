# QuickDig UI

A fast, lightweight, and open-source web interface designed to verify game server status, network addresses, and live player rosters.

**Live Tool:** [Click Here to Use QuickDig UI](https://quick-dig-ui.vercel.app)

## About The Project

QuickDig UI is built for server administrators and community developers who need a quick way to verify a target server's exact IP, Query Port, and live connection status. Instead of relying on manual command-line queries, this tool provides a direct visual confirmation of the server's backend data and active player connections.

This project is **not** a replacement for [PRSPY](https://www.realitymod.com/prspy/) — PRSPY remains the official, comprehensive server/player browser for the Project Reality community. QuickDig UI is a small, focused, login-free companion tool for quickly spot-checking a *specific* server by IP/Port, and it borrows from PRSPY's public master list only to complete a roster the GameSpy3 protocol would otherwise truncate.

## Supported Games

To ensure accurate data extraction and correct team parsing, this tool is optimized for the GameSpy3 query protocol utilized by:

* Project Reality: BF2
* Battlefield 2

## Key Features

* **Server Verification:** Quickly confirm if an IP and Port belong to the target server.
* **Team Roster Parsing:** Automatically divides connected players into their respective teams.
* **Player Statistics:** Extracts and displays live player data including Score, Kills, Deaths, and Ping.
* **Full Roster Completion:** Automatically supplements the GameSpy3 response with data from the official [PRSPY](https://www.realitymod.com/prspy/) master server list, so servers running more than ~64 players are still shown in full.
* **Live Updates:** Server data and player lists automatically refresh in the background.

## Known Limitations

* **Next Map Visibility:** The Next Map string is only displayed if the server explicitly broadcasts it. Vanilla Battlefield 2 servers generally do not provide this variable externally.
* **Roster Completion Depends on Matching:** Full-roster completion relies on matching the server's hostname against the PRSPY master list. If a server isn't listed on PRSPY (private/unlisted servers) or its hostname changes mid-session, the roster falls back to the standard GameSpy3 response, which is capped at ~64 players.

## Architecture

* **Frontend:** HTML5, CSS3, Vanilla JavaScript (Canvas Animation).
* **Backend API:** Node.js, Express.
* **Query Engine:** node-gamedig (GameSpy3 protocol).
* **Roster Completion:** [PRSPY API](https://www.realitymod.com/prspy/) — the master server list is fetched and cached for 1 minute to stay well within respectful usage limits, and is only used to fill in players missing from the GameSpy3 response, never to replace it.
* **Deployment:** Vercel.
