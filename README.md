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