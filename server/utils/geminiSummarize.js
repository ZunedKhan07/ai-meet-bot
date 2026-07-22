import { model } from "../config/gemini.js"; 

/**
 * Generates a summary and action items from meeting transcript using Gemini AI
 * @param {string} transcriptText - Raw text from Whisper
 * @returns {Promise<string>} - Formatted summary
 */
export const summarizeText = async (transcriptText) => {
  try {
    if (!transcriptText || transcriptText.trim() === "") {
      return "No audio/transcript detected to summarize.";
    }

    console.log("🧠 Sending transcript to Gemini AI for analysis...");

    const prompt = `
      You are an expert AI meeting assistant. Please analyze the following meeting transcript and provide a structured summary in Markdown format:

      1. **Executive Summary:** A brief 2-3 sentence overview of the meeting.
      2. **Key Action Items:** Bulleted list of tasks assigned or next steps.
      3. **Main Decisions:** What were the final conclusions or decisions made?

      Here is the transcript:
      "${transcriptText}"
    `;

    const result = await model.generateContent(prompt);
    const summary = result.response.text();
    
    return summary;
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    throw new Error(`Gemini Summarization Failed: ${error.message}`);
  }
};