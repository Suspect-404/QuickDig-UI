# QuickDig UI - Server Verification Tool

A fast, lightweight, and completely open-source web interface designed to instantly verify game server status, network addresses, and live player rosters.

**Live Tool:** [Click Here to Use QuickDig UI](https://quick-dig-ui.vercel.app)

## About The Project
QuickDig UI was built to eliminate the need for complex command-line queries. Often, server administrators, modders, and community developers need to verify a target server's exact IP, Query Port, and live connection status. Instead of opening a terminal and running manual scripts, this tool provides an instant, visual confirmation of the server's backend details and active player connections.

## Supported Protocols
To ensure absolute accuracy, complete data extraction (including full player names, Kills, Deaths, and Ping), and correct team parsing, this tool is exclusively optimized for the GameSpy3 protocol utilized by:
* Project Reality: BF2
* Battlefield 2

## Key Features
* Instant Target Verification: Quickly confirm if an IP and Port belong to the target server without launching the game client.
* Faction Roster Split: Automatically divides connected players into their respective factions (e.g., Team 1 vs. Team 2) for an accurate tactical overview.
* Deep Player Statistics: Extracts and displays live, detailed player telemetry including Score, Kills, Deaths, and Ping.
* Live Silent Updates: Server data and player lists automatically refresh in the background every few seconds to maintain a real-time feed.
* Dynamic Tactical Interface: A modern, animated CSS grid interface engineered for a premium user experience.

## Technical Limitations
* Project Reality 64-Player Limit: Due to hardcoded limitations within the aging GameSpy3 query protocol and UDP packet constraints, the external player roster extraction is generally capped at approximately 64 players. 
* Next Map Visibility: The Next Map string is only displayed if the server explicitly broadcasts it. Vanilla Battlefield 2 servers generally do not provide this variable externally.

## Architecture & Tech Stack
* Frontend: HTML5, CSS3, Vanilla JavaScript.
* Backend API: Node.js, Express.
* Engine: node-gamedig.
* Deployment: Vercel.
