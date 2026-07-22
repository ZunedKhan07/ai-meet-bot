import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import fs from "fs";
import path from "path";

puppeteer.use(StealthPlugin());

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const startMeetBot = async (meetUrl, outputFileName, durationInSeconds = 60) => {
  let browser;
  try {
    console.log("🤖 Launching Puppeteer Bot Browser...");

    const tempProfileDir = path.join(process.cwd(), "temp_chrome_profile");

    browser = await puppeteer.launch({
      headless: false, // Meeting UI dekhne ke liye
      executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
      userDataDir: tempProfileDir,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--use-fake-ui-for-media-stream",
        "--disable-notifications",
        "--disable-blink-features=AutomationControlled",
        "--window-size=1280,720",
      ],
    });

    const page = await browser.newPage();

    // User Agent Override
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"
    );

    // Audio & Mic permissions
    const context = browser.defaultBrowserContext();
    await context.overridePermissions(meetUrl, ["microphone", "camera"]);

    console.log(`🌐 Navigating to Google Meet: ${meetUrl}`);
    await page.goto(meetUrl, { waitUntil: "networkidle2" });

    await sleep(4000);

    // Mute Mic & Cam (Ctrl + E, Ctrl + D)
    console.log("🔇 Muting Mic & Camera...");
    await page.keyboard.down("Control");
    await page.keyboard.press("e");
    await page.keyboard.press("d");
    await page.keyboard.up("Control");

    await sleep(2000);

    // Enter Bot Name if prompted
    try {
      const nameInput = await page.$('input[type="text"]');
      if (nameInput) {
        await nameInput.type("AI Summarizer Bot", { delay: 50 });
        await sleep(1000);
      }
    } catch (e) {
      console.log("ℹ️ Name input bypassed.");
    }

    // Click "Ask to join" or "Join now"
    console.log("🔘 Attempting to click Join button...");
    await page.evaluate(() => {
      const buttons = Array.from(document.querySelectorAll("button"));
      const joinBtn = buttons.find((btn) => {
        const txt = btn.innerText.toLowerCase();
        return (
          txt.includes("ask to join") ||
          txt.includes("join now") ||
          txt.includes("got it")
        );
      });
      if (joinBtn) joinBtn.click();
    });

    console.log("⏳ Waiting 5s for room entry...");
    await sleep(5000);

    // Ensure temp folder exists
    const tempDir = path.join(process.cwd(), "temp");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    const outputPath = path.join(tempDir, outputFileName);

    console.log("🎙️ Starting Chrome Media Stream Recording...");

    // In-Page Browser Stream Recorder (WebRTC / MediaRecorder API)
    await page.evaluate(async (recordingTime) => {
      window.audioChunks = [];
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      window.mediaRecorder = new MediaRecorder(stream);

      window.mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          window.audioChunks.push(event.data);
        }
      };

      window.mediaRecorder.start(1000);
    }, durationInSeconds);

    console.log(`🔴 Recording audio for ${durationInSeconds} seconds...`);
    await sleep(durationInSeconds * 1000);

    console.log("⏹️ Stopping recording & saving file...");

    // Base64 Audio Data Fetch back to Node.js
    const base64Audio = await page.evaluate(async () => {
      return new Promise((resolve) => {
        window.mediaRecorder.onstop = async () => {
          const blob = new Blob(window.audioChunks, { type: "audio/webm" });
          const reader = new FileReader();
          reader.onloadend = () => resolve(reader.result.split(",")[1]);
          reader.readAsDataURL(blob);
        };
        window.mediaRecorder.stop();
      });
    });

    // Save File locally
    const buffer = Buffer.from(base64Audio, "base64");
    fs.writeFileSync(outputPath, buffer);

    await browser.close();
    console.log(`✅ Audio successfully recorded and saved at: ${outputPath}`);

    return outputPath;
  } catch (error) {
    if (browser) await browser.close();
    console.error("❌ Error in Puppeteer Bot:", error.message);
    throw new Error(`Puppeteer Bot Error: ${error.message}`);
  }
};