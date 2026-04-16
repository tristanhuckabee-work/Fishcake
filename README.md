# 🐟 Fishcake
Fishcake — A layered abstraction platform for Atlassian Jira & Assets APIs, providing a unified interface for workflow automation via API, CLI, and web UI.
## Overview
Fishcake is a backend platform that sits on top of Atlassian Jira and Assets APIs and normalizes their complex data models into a simplified, consistent domain interface.

Fishcake is not a wrapper around Atlassian! It's a simplified operational layer that redefines how Atlassian is used programmatically.

It exposes a unified system for interacting with tickets, assets, and users through:
- a simplified and clean REST API
- a web frontend (WIP / planned)
<!-- - a CLI tool -->
The goal is to eliminate direct interaction with Atlassian’s fragmented APIs and replace them with a single, opinionated control layer.
## Problem
Atlassian APIs are powerful but:
- inconsistent across Jira and Assets
- heavily nested and schema-driven
- require multiple steps for simple workflows
- difficult to use in automation scripts

This leads to:
- duplicated integration logic
- brittle scripts
- poor developer experience for automation workflows
## Solution
Fishcake introduces a domain-first abstraction layer:

Instead of working with raw Atlassian objects, users interact with:
- Users
- Assets
- Tickets
- Assignments

All exposed through a consistent API, CLI, and UI.

## Architecture
```
Frontend (Web UI) / CLI Tools
│
Router Layer
│
Controller Layer
│
└ Service Layer
  ├ Adapter Layer
  │ └ Atlassian APIs
  ├ Normalizers
  └ Repository Layer
```
### Core Layers
#### Router Layer
Handles HTTP routing and delegates requests to controllers.
#### Controller Layer
Parses requests and forwards them to services with minimal logic.
#### Service Layer
Core business logic and orchestration between adapters and repositories.
#### Adapter Layer
Handles all external communication with Atlassian Jira & Assets APIs.
#### Normalizers
Transforms raw Atlassian responses into a consistent internal domain model.
#### Repository Layer
Stores internal metadata such as:
- user mappings
- configuration
- system preferences
### Interfaces
#### REST API
A unified API for interacting with assets, users, and tickets.

Example:
- `GET /assets/:id`
- `POST /tickets`
- `POST /assignments`
<!-- #### CLI
A command-line interface for automation and scripting.

Example:
- `fishcake getAsset laptop-001`
- `fishcake createTicket --asset laptop-001 --user tristan` -->
#### Web UI (WIP)
A simplified interface for browsing and managing assets and tickets without direct Atlassian exposure.

## Authentication
Fishcake uses centralized credential management:
- Atlassian API tokens are stored securely on the server
- Clients never handle raw credentials
- Requests are executed via a controlled service account or OAuth flow (configurable)
### Design Principles
1. Separation of concerns across layers
2. No Atlassian leakage into client interfaces
3. Domain-first API design
4. CLI-first automation support
5. Single source of truth for system behavior
## Why Fishcake
Fishcake is designed for environments where:
- Atlassian is powerful but too complex for direct use
- Teams need automation-friendly workflows
- Scripts and tools should not depend on raw Jira/Assets schemas
## Tech Stack
- Node.js
- Express.js
- Sequelize (SQLite)
- Atlassian Jira & Assets APIs
- Bash (CLI tooling)
- React.js
## Status
- [ ] Backend API: In progress
- [ ] CLI: In progress
- [ ] Normalization layer: Active development
- [ ] Frontend: Planned
