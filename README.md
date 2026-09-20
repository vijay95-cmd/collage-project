# 🤖 AI Document Editor

> **An AI-powered document editing application that combines a React frontend with a Node.js/Express backend to summarize, rewrite, grammar-check, edit, and download documents.**

![React](https://img.shields.io/badge/React-Frontend-61DAFB?logo=react&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![OpenAI](https://img.shields.io/badge/OpenAI-AI%20Integration-412991?logo=openai&logoColor=white)
![Status](https://img.shields.io/badge/Project-Prototype-orange)

---

## 📌 Project Overview

This project demonstrates a full-stack **AI document editor** with a React-based editing interface and a Node.js/Express backend that communicates with an AI API.

Users can edit or paste plain-text/Markdown documents and apply AI-powered actions such as summarization, formal rewriting, and grammar correction. The application also provides undo/redo support and document download functionality.

---

## ✨ Key Features

- 📝 Plain-text and Markdown document editing
- 🤖 AI-powered summarization
- ✍️ AI-powered formal rewriting
- ✅ Grammar and punctuation correction
- ↩️ Undo and redo history
- 📂 Open/paste document content
- 💾 Download documents as Markdown
- ⚡ React-based interactive interface
- 🔌 Express API backend
- 🔐 Environment-variable based API key configuration

---

## 🛠️ Tech Stack

| Technology | Purpose |
| ---------- | ------- |
| React | Interactive frontend |
| JavaScript | Application logic |
| Node.js | Backend runtime |
| Express | API server |
| OpenAI API | AI document processing |
| dotenv | Environment configuration |
| node-fetch | Server-side API requests |

---

## 🧠 AI Actions

The editor currently supports three primary AI workflows:

```text
Document Content
      ↓
Select AI Action
      ↓
React Frontend
      ↓
POST /api/ai
      ↓
Express Backend
      ↓
OpenAI API
      ↓
AI Result
      ↓
Updated Document
```

### Available Actions

| Action | Purpose |
| ------ | ------- |
| Summarize | Creates a short summary of the document |
| Rewrite | Makes content more formal, clear, and concise |
| Grammar Check | Corrects grammar and punctuation |

---

## 📂 Project Structure

```text
collage-project/
│
├── 📂 front/
│   ├── 📂 scr/
│   │   ├── 📄 App.jsx
│   │   └── 📄 server.js
│   └── 📄 workspace.code-workspace
│
├── 📄 workspace.code-workspace
├── 📄 .gitattributes
└── 📄 README.md
```

---

## ⚙️ Configuration

The backend expects an OpenAI API key through an environment variable.

Create a `.env` file locally:

```env
OPENAI_API_KEY=your_api_key_here
```

**Never commit your real API key to GitHub.** Add `.env` to `.gitignore`.

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/vijay95-cmd/collage-project.git
cd collage-project
```

### 2️⃣ Install backend dependencies

```bash
npm install
```

### 3️⃣ Configure environment variables

```env
OPENAI_API_KEY=your_api_key_here
```

### 4️⃣ Start the backend

```bash
npm run start:server
```

The example backend runs on port `3001` unless another `PORT` value is configured.

### 5️⃣ Run the React frontend

Run the React client using your configured React/Vite development setup.

---

## 🔌 API Endpoint

### `POST /api/ai`

Request structure:

```json
{
  "action": "summarize",
  "content": "Your document content here"
}
```

The backend returns the generated result in JSON form.

---

## 🎯 Project Objectives

- Understand React state management
- Build a Node.js/Express API
- Integrate an external AI service
- Handle asynchronous API requests
- Implement document editing workflows
- Practice frontend/backend communication
- Manage environment variables securely

---

## 🎓 Skills Demonstrated

```text
✓ React Development
✓ JavaScript
✓ Node.js
✓ Express.js
✓ REST API Integration
✓ AI API Integration
✓ State Management
✓ Async/Await
✓ Document Processing
✓ Environment Configuration
✓ Full-Stack Development
```

---

## 🔮 Future Improvements

- 📝 Rich-text editor with Markdown preview
- 📄 DOCX/PDF import and export
- 💬 Streaming AI responses
- 👤 User authentication
- ☁️ Cloud document storage
- 🗂️ Document history and version management
- 🎨 Advanced editor formatting
- 🔒 Authentication, rate limiting, and production security

---

## ⚠️ Security Notes

- Keep API keys in environment variables.
- Never commit `.env` files containing secrets.
- Add authentication and rate limiting before production use.
- Validate document size and API input on the server.

---

## 👨‍💻 Author

### Vijay Kumar

**B.Tech — Computer Science Engineering**

`Python` • `JavaScript` • `AI/ML` • `Data Analytics`

🔗 GitHub: [@vijay95-cmd](https://github.com/vijay95-cmd)

---

## 📜 License

This project is intended for educational and portfolio purposes.

⭐ **If you found this project useful, consider giving the repository a star!**
