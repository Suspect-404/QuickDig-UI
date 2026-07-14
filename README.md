# QuickDig UI

A professional, lightweight, and completely open-source web interface to monitor game server status. 

**🔴 Live Demo:** [Click Here to Use QuickDig UI](https://quick-dig-ui.vercel.app/)

## Overview
QuickDig UI is designed to give server admins and players a fast, no-login-required tool to check the live status of tactical shooter servers. Simply enter the Server IP and Query Port, and instantly get server details and player rosters.

## Supported Games
Currently, this tool is strictly optimized for and officially supports **3 games** to ensure the most accurate data extraction:
* **Project Reality**
* **Battlefield 2**
* **CS:GO**

## Features
* **Split Team Roster:** Automatically divides players into their respective factions (e.g., US vs MEC, T vs CT).
* **Live Player Stats:** Displays detailed player information including Score, Kills, Deaths, and Ping.
* **Auto-Refresh:** Data silently updates in the background every few seconds without page reloads.
* **Zero Configuration:** Fully hosted and ready to use. No downloads or sign-ups required.

## ⚠️ Known Limitations
* **Project Reality / BF2 Player Limit:** Due to technical limitations within the aging GameSpy3 query protocol and UDP packet sizes, the player roster extraction is capped at approximately **64 players**. Even if a server has 100 players online, only the first ~64 will be displayed in the query results.
* **Incomplete Data in Some Modes:** If a server modifies its core variables or hides specific data to save bandwidth, some fields (like Ping or Next Map) may display as `N/A` or `-`.

## Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript.
* **Backend:** Node.js, Express.
* **Query Engine:** [GameDig](https://github.com/gamedig/node-gamedig).
* **Hosting:** Vercel.

## Contributing
Feel free to fork this repository, submit pull requests, or open an issue if you want to suggest improvements or fix a bug!
