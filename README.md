*This project has been created as part of the 42 curriculum by  cnatanae, danbarbo, leobarbo, tmalheir*

## Description

**ft_transcendence** is a full-stack multiplayer Pong platform featuring real-time gameplay, advanced authentication with 2FA, friend system, ranked matches, power-ups, and leaderboards. 

Key features include:
- Live multiplayer Pong with Socket.IO (60fps game loop, collision physics, power-ups)
- TOTP-based two-factor authentication (QR setup, backup codes)
- Gang-based theming (Potatoes vs Tomatoes UI customization)
- Solo AI mode with 3 difficulty levels (C.A.D.E.T.E bot)
- Friends system with match invitations
- Global ranked leaderboard (+20/-10 point system)
- Complete user profile with stats and avatar customization

## Instructions

### Prerequisites
- **Node.js** (v18+ recommended)
- **npm** or **yarn**
- **Git** for cloning the repository
- **Python3** (optional, for test user script)

### Backend Setup
cd backend
npm install
cp .env.example .env # Configure JWT_SECRET=your-secret-here
npm run dev # Runs on http://localhost:3333

### Frontend Setup
cd frontend
npm install
npm run dev # Runs on http://localhost:5173 (Vite)

### Quick Start (Development)
git clone https://github.com/DanielSurf10/ft_transcendence.git
cd ft_transcendence

Terminal 1 - Backend
cd backend && npm install && npm run dev

Terminal 2 - Frontend
cd ../frontend && npm install && npm run dev

Open `http://localhost:5173`

## Resources

**Core Technologies**:
- [Fastify Documentation](https://fastify.dev/)
- [Socket.IO Real-time Docs](https://socket.io/docs/v4/)
- [Prisma ORM](https://prisma.io) (production-ready)
- [TailwindCSS + Vite](https://tailwindcss.com/docs/guides/vite)
- [otplib for 2FA](https://www.npmjs.com/package/otplib)

**AI Usage**: 
AI assisted with README structure, Zod schema patterns, and Pong physics debugging. All core game logic, Socket.IO integration, 2FA flow, frontend routing, and real-time synchronization were manually implemented and rigorously tested.

## Team Information

**cnatanae** 
- **Roles**: Full-stack Developer, Tech Lead
- **Responsibilities**: Backend APIs, real-time game engine, Socket.IO integration

**danbarbo**
- **Roles**: Frontend Developer
- **Responsibilities**: UI/UX, Vite + Tailwind implementation, game frontend

**leobarbo** 
- **Roles**: Authentication Specialist
- **Responsibilities**: 2FA system, JWT auth, user management

**tmalheir**
- **Roles**: Database & Features
- **Responsibilities**: MemoryDB, friends system, leaderboards

## Project Management

- **Organization**: 4-member team with clear task distribution across backend, frontend, auth, and features. Daily coordination through structured workflows.
- **Tools**: Slack, Discord, VS Code with TypeScript extensions
- **Communication**: Discord channels for day-to-day coordination, group voice calls for planning, live coding sessions for complex features and debugging

## Technical Stack

**Frontend**:
- Vite + TypeScript + TailwindCSS
- Component-based UI library (Button, Card, Input, Form, Modal)
- Custom state management with appState store

**Backend**:
- Fastify (Node.js/TypeScript) + Zod validation
- Socket.IO for real-time multiplayer (60fps game loop)
- JWT authentication + TOTP 2FA (otplib + QRCode)
- Swagger API documentation

**Database**:
- Custom MemoryDB (in-memory SQLite-like for development)
- Prisma ORM integration ready for PostgreSQL production
- Automatic cleanup of inactive anonymous sessions

**Justification**:
Fastify selected for superior performance and plugin ecosystem. Socket.IO ideal for low-latency game synchronization. MemoryDB enables instant testing without Docker complexity during rapid development iteration.

## Database Schema

**Users Table** (MemoryDB structure):
Users {

id: number (PK, auto-increment)

name: string (display name)

nick: string (unique username)

email: string (unique)

password: string (bcrypt hash, null for anonymous)

gang: 'potatoes' | 'tomatoes'

isAnonymous: boolean

twoFactorEnabled: boolean

twoFactorSecret: string (TOTP secret)

backupCodes: string[] (8 backup codes)

score: number (ranked points, default 0)

friends: number[] (user IDs)

friendRequestsSent: number[]

friendRequestsReceived: number[]

lastActivity: Date (auto-updated)
}

**Relationships**: 
- Self-referential friends (many-to-many via ID arrays)
- No separate matches table (handled by active game sessions)

## Features List

| Feature | Developer | Description |
|---------|-----------|-------------|
| **Authentication** | DanielSurf10 | Register/login (email+password), anonymous mode |
| **2FA System** | DanielSurf10 | TOTP QR setup, enable/disable, backup codes |
| **Real-time Multiplayer** | DanielSurf10 | Socket.IO Pong (collision physics, 60fps) |
| **Friends System** | DanielSurf10 | Send/accept requests, match invitations |
| **Ranked Matches** | DanielSurf10 | +20 win/-10 loss points, global leaderboard |
| **Power-ups** | DanielSurf10 | Big paddle, shield, speed boost (5s duration) |
| **Solo AI** | DanielSurf10 | 3 difficulties vs C.A.D.E.T.E bot |
| **Profile & Stats** | DanielSurf10 | Avatar, gang theming, match history, stats |

## Modules

**Major Modules (2pts each = 8pts total)**:
- **Real-time multiplayer Pong** (4pts): Socket.IO @60fps, physics, power-ups
- **Advanced Authentication w/ 2FA** (4pts): TOTP + QR + backup codes + temp tokens

**Minor Modules (1pt each = 5pts total)**:
- **Friend system** (1pt): Requests, invites, block functionality
- **Ranked leaderboard** (1pt): Global ranking with ELO-like scoring
- **Power-ups system** (1pt): 3 types (big paddle, shield, speed)
- **Solo AI opponent** (1pt): 3 difficulty levels
- **Gang theming** (1pt): Potatoes/Tomatoes UI customization

**Total Score: 13 points**

**Implementation Details**: Full REST API + WebSocket integration. Custom MemoryDB with session persistence and automatic cleanup.

## Individual Contributions

**DanielSurf10**:
- **Core Implementation**: 100% code authorship (backend/frontend)
- **Technical Challenges Overcome**:
  - **Socket.IO race conditions**: Room-based matchmaking + proper cleanup
  - **Pong collision physics**: Angle-based rebounds + edge case handling
  - **2FA state management**: tempToken → fullToken flow + backup codes
  - **MemoryDB persistence**: In-memory SQLite with activity timeouts
- **Owned Features**: All listed modules/features

View API docs
http://localhost:3333/docs

Ranked match flow
Login → Friends → Invite → Accept → Play → +20/-10 points

### API Endpoints
POST /auth/register # Create account
POST /auth/login # JWT + 2FA flow
POST /auth/anonymous # Guest mode
POST /auth/2fa/setup # QR code generation
GET /leaderboards # Global ranking
POST /friends/invite # Match invitation

### Known Limitations
- MemoryDB resets on server restart (use Prisma/PostgreSQL for production)
- Tournament brackets as future enhancement

### Deployment Notes
Production ready with Prisma:
npm install @prisma/client prisma
npx prisma db push # PostgreSQL
npm run start

**License**: Educational use only (42 School curriculum project)
