import Groq from "groq-sdk";
import fs from "fs";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * Transcribes audio file using Groq Whisper model
 * @param {string} filePath - Path to the audio file in temp/
 * @returns {Promise<string>} - Transcribed text
 */
export const transcribeAudio = async (filePath) => {
  try {
    if (!fs.existsSync(filePath)) {
      throw new Error(` ❌ File not found at path: ${filePath}`);
    }

    const transcription = await groq.audio.transcriptions.create({
      file: fs.createReadStream(filePath),
      model: "whisper-large-v3",
      response_format: "verbose_json",
    });

    return transcription.text;
  } catch (error) {
    console.error(" ❌ Error in Whisper Transcription:", error.message);
    throw new Error(` ❌ Whisper Error: ${error.message}`);
  }
};