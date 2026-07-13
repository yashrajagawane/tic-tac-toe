# 🎮 Tic Tac Toe - React Game

A modern and interactive **Tic Tac Toe game** built using **React.js** with a clean user interface, smooth gameplay experience, and intelligent AI opponent.

The project is fully deployed and available online using **Vercel**.

🚀 **Live Demo:**  
https://tic-tac-toe-two-ashen-45.vercel.app

---

# ✨ Features

## 🎮 Gameplay

- Player vs Player mode
- Player vs Computer (AI) mode
- Interactive 3x3 game board
- Real-time game updates
- Automatic win detection
- Draw detection
- Restart game functionality


## 🤖 AI Opponent

- Intelligent computer moves
- Detects player winning opportunities
- Blocks possible winning moves
- Uses game strategy logic for better decisions


## 🏆 Game Management

- Score tracking
- Match history
- Turn indicator
- Winner popup
- Game status updates


## ⚙️ Customization

- Game settings
- Player preferences
- Sound controls
- Responsive design for different screen sizes


## 💾 Data Storage

- Uses browser storage for saving user preferences
- Maintains game-related information between sessions

---

# 🛠️ Tech Stack

## Frontend

| Technology | Usage |
|------------|-------|
| React.js | User Interface Development |
| JavaScript | Game Logic |
| CSS | Styling |
| Tailwind CSS | UI Styling |
| CRACO | React Configuration |
| React Hooks | State Management |

## Development Tools

| Tool | Usage |
|------|-------|
| Git | Version Control |
| GitHub | Repository Hosting |
| Vercel | Deployment |

---

# 📂 Project Structure

```
tic-tac-toe/

│
├── frontend/
│
│   ├── public/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   └── game/
│   │   │       ├── Board.jsx
│   │   │       ├── Controls.jsx
│   │   │       ├── Scoreboard.jsx
│   │   │       ├── WinPopup.jsx
│   │   │       └── other components
│   │   │
│   │   ├── hooks/
│   │   │   └── useGameState.js
│   │   │
│   │   ├── lib/
│   │   │   ├── gameLogic.js
│   │   │   └── ai.js
│   │   │
│   │   ├── pages/
│   │   │
│   │   ├── App.js
│   │   └── index.js
│   │
│   ├── package.json
│   └── package-lock.json
│
├── backend/
│
├── tests/
│
└── README.md

```

---

# 🚀 Installation & Setup

## Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git


Check versions:

```bash
node -v

npm -v

git --version
```

---

# 📥 Clone Repository

Clone the repository:

```bash
git clone https://github.com/yashrajagawane/tic-tac-toe.git
```

Navigate into the project:

```bash
cd tic-tac-toe
```

---

# 💻 Running Frontend Locally

Go inside the frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm start
```

The application will run at:

```
http://localhost:3000
```

---

# 🏗️ Production Build

To create a production-ready build:

```bash
npm run build
```

The optimized files will be generated inside:

```
frontend/build
```

---

# 🎮 How To Play

1. Open the application
2. Select your preferred game mode
3. Choose your symbol (X or O)
4. Click on an empty cell
5. Try to create a line of three symbols

Winning possibilities:

- Horizontal line
- Vertical line
- Diagonal line


Example:

```
X | X | X
---------
O | O |  
---------
  |   |
```

---

# 🧠 AI Logic

The AI opponent is implemented using JavaScript game logic.

The AI can:

- Analyze possible moves
- Block player attacks
- Find winning opportunities
- Choose better board positions


AI implementation:

```
frontend/src/lib/ai.js
```

Game rules:

```
frontend/src/lib/gameLogic.js
```

---

# 🌐 Deployment

This project is deployed using **Vercel**.

Deployment process:

1. Connect GitHub repository with Vercel
2. Select the frontend directory
3. Install dependencies
4. Run production build
5. Deploy application


Live Website:

https://tic-tac-toe-two-ashen-45.vercel.app

---

# 🧪 Testing

Run tests using:

```bash
npm test
```

---

# 🔮 Future Improvements

Planned improvements:

- 🌍 Online multiplayer support
- 🔥 Real-time gameplay using WebSockets
- 👤 User authentication
- 🏆 Global leaderboard
- 📱 Mobile application
- 🎨 More themes and animations
- ☁️ Cloud-based score storage

---

# 🤝 Contribution

Contributions are welcome.

Steps to contribute:

1. Fork this repository

2. Create a new branch:

```bash
git checkout -b feature-name
```

3. Make your changes

4. Commit changes:

```bash
git commit -m "Added new feature"
```

5. Push changes:

```bash
git push origin feature-name
```

6. Create a Pull Request

---

# 👨‍💻 Author

## Yash Agawane

GitHub:

https://github.com/yashrajagawane

---

# ⭐ Support

If you like this project, consider giving it a ⭐ on GitHub.

Thank you for checking out this Tic Tac Toe project! 🎮
