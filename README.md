<p align="center">
  <img src="https://raw.githubusercontent.com/atulmy/atulmy.github.io/master/images/hire-smart/hero-shadow.png" alt="Hire Smart" />
</p>

<h1 align="center">HIRE SMART</h1>
<p align="center">An application for human resource team / recruitment consultancies to streamline hiring process, scheduling interviews and tracking candidates.</p>

## Proposed Features
  - Candidates management
    - Basic info
    - Total experience
    - Resume file attachment
    - Contact info
    - Current and expected compensation (visibility on basis of role)
  - Kanban board
    - Manage status
    - Drag and drop
  - User roles
    - Admin
    - Manager
    - Lead
    - Executive
    - Junior
  - Tags
    - Client name / internal team name
    - Location
  - Sharable URL
  - Schedule interview
    - Interview rounds
      - Round number
      - Panel selection
      - Mode
        - Telephonic
        - Online (Skype, Hangouts, etc.)
      - Feedback by panel
   - Email notifications

## Technology Stack
  - API
    - Node
    - Express
    - GraphQL
    - MongoDB
  - Web App
    - React
    - Redux
    - React Router
    - Server Side Rendering
    - Material UI
  - Mobile App
    - React Native
    - Redux
    - React Navigation

## Setup and Running
- Prerequisites
  - Node
  - MongoDB
- Clone repo `git clone git@github.com:atulmy/hire-smart.git hire-smart`
- Switch to `code` directory `cd code`
- Configurations
  - API
    - Modify `/api/src/config/database.json` for database credentials
    - Create local environment file `cp /api/.env.example .env`
    - Modify `/api/.env` for PORT (optional)
   - Webapp
      - Create local environment file `cp /web/.env.example .env`
      - Modify `/web/.env` for PORT / API URL (optional)
- Setup
  - API: Install packages and database setup (migrations and seed) `cd api` and `npm run setup`
  - Webapp: Install packages `cd web` and `npm install`
- Development
  - Run API `cd api` and `npm start`, browse GraphiQL at http://localhost:8000/
  - Run Webapp `cd webapp` and `npm start`, browse webapp at http://localhost:3000/
- Production
  - Run API `cd api` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server
  - Run Webapp `cd web` and `npm run start:prod`, creates an optimized build in `build` directory and runs the server
