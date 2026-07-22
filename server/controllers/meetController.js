import { startMeetBot } from "../utils/puppeteerBot.js";
import { transcribeAudio } from "../utils/whisperTranscribe.js";
import { summarizeText } from "../utils/geminiSummarize.js";
import Meeting from "../models/Meeting.js";
import fs from "fs";

export const processFullMeeting = async (req, res) => {
  try {
    const { meetingUrl, duration = 30 } = req.body; // default 30 sec recording

    if (!meetingUrl) {
      return res.status(400).json({ success: false, message: "Meeting URL is required" });
    }

    const filename = `recording_${Date.now()}.webm`;

    // 1. Create DB Record
    const newMeeting = await Meeting.create({
      meetingUrl,
      status: "processing",
    });

    // 2. Step 1: Puppeteer Recording
    console.log("🚀 Step 1: Spawning Bot & Recording Audio...");
    const audioPath = await startMeetBot(meetingUrl, filename, duration);
    newMeeting.audioPath = audioPath;
    await newMeeting.save();

    // 3. Step 2: Whisper Transcribe
    console.log("🚀 Step 2: Transcribing Audio with Groq Whisper...");
    const transcriptText = await transcribeAudio(audioPath);
    newMeeting.transcript = transcriptText;
    await newMeeting.save();

    // 4. Step 3: Gemini Summarize
    console.log("🚀 Step 3: Generating Summary with Gemini AI...");
    const summaryText = await summarizeText(transcriptText);
    newMeeting.summary = summaryText;
    newMeeting.status = "completed";
    await newMeeting.save();

    // 5. Cleanup: Delete audio file from temp to save disk space
    if (fs.existsSync(audioPath)) {
      fs.unlinkSync(audioPath);
      console.log("🧹 Temp audio file cleaned up!");
    }

    res.status(200).json({
      success: true,
      message: "AI Bot Workflow Completed Successfully!",
      data: newMeeting,
    });
  } catch (error) {
    console.error("Pipeline Failed:", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};