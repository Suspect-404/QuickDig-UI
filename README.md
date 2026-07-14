# QuickDig UI

A professional, lightweight, and login-free web interface to monitor game server status using GameDig.

**🔴 Live Website:** [Click Here to Use QuickDig UI](https://quick-dig-ui.vercel.app/) 

## Overview
QuickDig UI allows users to instantly query any supported game server (e.g., Project Reality, Battlefield 2, Arma 3, CS:GO) by simply entering the server IP and Query Port. The tool automatically fetches real-time data and displays it in a clean, comprehensive interface.

## How to Use
1. Open the [QuickDig UI Website](https://quick-dig-ui.vercel.app/).
2. Select the **Game Type** from the dropdown menu (e.g., Project Reality, CS:GO).
3. Enter the **Server IP** and the correct **Query Port**.
4. Click **Search**. The data will automatically refresh every few seconds.

## Key Features
* **Multi-Game Support:** Seamlessly switch between different game protocols via the intuitive dropdown menu.
* **Split Team Roster:** Automatically divides players into their respective teams or factions (e.g., US vs MEC, T vs CT).
* **Deep Player Statistics:** Extracts and displays detailed player information, including Score, Kills, Deaths, and Ping (depending on the game protocol).
* **Live Silent Updates:** The server data and player list automatically refresh in the background without reloading the page.
* **Detailed Server Info:** Displays the current map, upcoming map, game mode (e.g., AAS, CQ), and live player count.
* **Zero Configuration:** As a fully hosted web tool, users do not need to download any software, log in, or configure complex settings.

## Powered By
This project relies on the robust Node.js `gamedig` library, meaning its underlying engine supports over 300 game titles. While highly optimized for tactical shooters like Project Reality: BF2, it works flawlessly with any supported game protocol.
