# 🤖 AI Meeting Bot & Summarizer

> An end-to-end automated AI assistant that joins Google Meet calls, captures real-time audio streams, transcribes speech using Groq Whisper, and generates structured executive summaries powered by Gemini AI.

![React](https://img.shields.io/badge/Frontend-React%20%2F%20Vite-blue?style=flat-square&logo=react)
![NodeJS](https://img.shields.io/badge/Backend-Node.js%20%2F%20Express-green?style=flat-square&logo=nodedotjs)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-darkgreen?style=flat-square&logo=mongodb)
![Puppeteer](https://img.shields.io/badge/Automation-Puppeteer-orange?style=flat-square&logo=puppeteer)
![Gemini AI](https://img.shields.io/badge/AI-Gemini%20API-purple?style=flat-square)

---

## 🌟 Key Features

* **Automated Meeting Entry:** Spawns a headless/stealth browser using Puppeteer to navigate to Google Meet links, automatically muting mic & camera.
* **In-Call Audio Capture:** Utilizes native browser MediaRecorder API to stream and record high-quality meeting audio.
* **Ultra-Fast Transcription:** Powered by **Groq Whisper** (`whisper-large-v3`) for sub-second, highly accurate speech-to-text conversion.
* **Executive Summaries:** Integrated with **Gemini AI** (`gemini-1.5-flash`) to generate structured summaries including:
  * 🎯 **Executive Brief**
  * 📋 **Action Items & Tasks**
  * 💡 **Key Decisions Made**
* **Modern Dashboard:** Built with React, Tailwind CSS, and Lucide icons for seamless link submission and meeting history tracking.

---

## 🏗️ Architecture & Flow

[ Google Meet URL ]
│
▼
[ Puppeteer Bot Joins Call ] ──► [ Audio Stream Captured (WebM) ]
│
▼
[ Groq Whisper API ]
│
(Text Transcript Output)
│
▼
[ Gemini AI Engine ]
│
(Structured Summary Result)
│
▼
[ React UI + MongoDB ]

---

## 🚀 Tech Stack

### Frontend
* **React.js** (Vite)
* **Tailwind CSS**
* **Axios** & **Lucide React**

### Backend
* **Node.js** & **Express.js**
* **Puppeteer Extra** (with Stealth Plugin)
* **MongoDB** & **Mongoose**

### AI Services
* **Groq SDK** (Whisper Transcription)
* **Google Generative AI SDK** (Gemini Summary Engine)

---

## ⚙️ Installation & Setup

### Prerequisites
* **Node.js** (v18 or higher)
* **MongoDB Connection URI**
* **Groq API Key**
* **Gemini API Key**

---

### 1. Clone the Repository
```bash
git clone [https://github.com/YOUR_GITHUB_USERNAME/ai-meet-bot.git](https://github.com/YOUR_GITHUB_USERNAME/ai-meet-bot.git)
cd ai-meet-bot

2. Backend Setup

cd server
npm install

Create a .env file in the server directory:

PORT=7000
MONGO_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
GEMINI_API_KEY=your_gemini_api_key

Start the backend server:

npm run dev

The application will be running at http://localhost:5173.

🛠️ Usage
Open a live Google Meet link in your browser.

Paste the meeting URL into the AI Meeting Bot frontend dashboard.

Set the desired recording duration (e.g., 30 or 60 seconds).

Click Launch Meeting Bot.

Once the host admits the bot, it will automatically mute audio/video, capture the speech, process transcription & summarization, and display the structured results on the dashboard.

🛡️ License
Distributed under the MIT License. See LICENSE for more information.

---
