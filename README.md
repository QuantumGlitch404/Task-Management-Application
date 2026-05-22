# TaskFlow - Productivity Scholar Edition

TaskFlow is a highly sophisticated, full-stack Task Management application built on the MERN stack (MongoDB, Express, React, Node.js). Designed with a strict "Productivity Scholar" aesthetic, the application shuns generic modern trends (like glassmorphism and neon glows) in favor of a clean, hyper-focused, and premium visual experience tailored for professionals and scholars.

## 🌟 Key Features

### 🎨 Custom Design System & Aesthetic
- **Productivity Scholar Aesthetic**: A dark, premium aesthetic using specific hex codes (`#0a0a0a` Obsidian, `#121212` Midnight) that emulate a high-end physical planner.
- **Bespoke UI Components**: A completely custom-built UI library from scratch, including Inputs, Buttons, Modals, Toasts, Badges, and Skeletons—eschewing heavy UI frameworks for maximum control and performance.
- **Typography**: Uses professional font pairings including *Sora* (Headings), *Inter* (Body), and *JetBrains Mono* (Code/Metrics).

### ⚡ Comprehensive Task Management
- **CRUD Operations**: Complete functionality to Create, Read, Update, and Delete tasks.
- **Kanban Board**: Drag-and-drop Kanban functionality allowing users to visually manage workflows across "Pending", "In Progress", and "Completed" states.
- **Advanced Filtering**: Filter tasks by status, priority, and perform text-based searches.

### 🌐 Sophisticated WebGL 3D Elements
- **React Three Fiber & Drei**: Integrates complex WebGL 3D elements that are lightweight and performant.
- **Geometric Artifacts**: The landing page features a slow-rotating, complex geometric object (Icosahedrons and orbital spheres) with cinematic lighting, reflecting a physical artifact rather than a "cringe" cyberpunk hologram.

### 🔐 Security & Architecture
- **JWT Authentication**: Secure user registration and login flows using JSON Web Tokens and bcrypt password hashing.
- **Smart Database Fallback**: Built-in redundancy mechanism! If the remote MongoDB Atlas connection is refused (due to IP whitelisting or DNS issues), the backend automatically spins up and falls back to a local `mongodb-memory-server` in-memory database to ensure the app remains functional for testing and development.

---

## 🛠️ Technology Stack

**Frontend (Client)**
- React 18 (Vite)
- Tailwind CSS v3 (Customized for bespoke styling)
- React Router v6 (Protected Routes)
- @react-three/fiber & @react-three/drei (3D Rendering)
- Axios (API Communication)
- Lucide React (Iconography)

**Backend (Server)**
- Node.js & Express.js
- MongoDB & Mongoose (ODM)
- mongodb-memory-server (In-memory fallback database)
- JSON Web Tokens (JWT) & bcryptjs (Auth)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- A MongoDB URI (or rely on the automated in-memory fallback for local testing)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/QuantumGlitch404/Task-Management-Application.git
   cd Task-Management-Application
   ```

2. **Install Backend Dependencies:**
   ```bash
   cd server
   npm install
   ```

3. **Install Frontend Dependencies:**
   ```bash
   cd ../client
   npm install --legacy-peer-deps
   ```

### Configuration

In the `server` directory, create a `.env` file (if not present) with the following variables:
```env
NODE_ENV=development
PORT=5005
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5174
```

### Running the Application

To run the application locally, you will need two terminals.

**Terminal 1 (Backend Server):**
```bash
cd server
npm start
```
*Note: The backend runs on port `5005`. If your MongoDB Atlas string fails to connect, you will see a log indicating that the in-memory database fallback has successfully initialized.*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm run dev
```
*The frontend will typically run on `http://localhost:5173` or `http://localhost:5174` depending on port availability.*

---

## 📂 Project Structure

```text
Task-Management-Application/
├── client/                     # React Frontend
│   ├── src/
│   │   ├── components/         # Custom UI, 3D elements, and Page components
│   │   ├── context/            # Global State Management (Auth & Tasks)
│   │   ├── pages/              # Route Level Components
│   │   ├── services/           # Axios interceptors and API wrappers
│   │   ├── styles/             # Tailwind & Base CSS
│   │   └── App.jsx             # Routing configuration
│   ├── tailwind.config.js      # Strict Productivity Scholar design system
│   └── vite.config.js          # Vite and Proxy configuration
└── server/                     # Node.js Backend
    ├── config/                 # DB connections and environment
    ├── controllers/            # Route logic (auth, tasks)
    ├── middleware/             # JWT Auth protection and Error Handlers
    ├── models/                 # Mongoose schemas (User, Task)
    ├── routes/                 # Express route definitions
    └── server.js               # Entry point
```

---

## 🎨 Design Philosophy
This project aggressively avoids common, overused "startup" trends. You will **not** find glassmorphism, floating translucent cards with heavy blur, cyan-to-purple gradients, or particle showers here. Instead, it leverages strict typography, monochromatic layouts accented by a single professional primary color (`#3b82f6`), and high-contrast borders for a grounded, software-as-a-tool aesthetic.
