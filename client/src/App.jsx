import React, { useState } from "react";
import { processMeeting } from "./services/api";
import { Video, Sparkles, FileText, CheckCircle2, Loader2, Play } from "lucide-react";

export default function App() {
  const [meetingUrl, setMeetingUrl] = useState("");
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!meetingUrl) return;

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await processMeeting(meetingUrl, Number(duration));
      if (res.data?.success) {
        setResult(res.data.data);
      } else {
        setError("Failed to process meeting.");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Error connecting to AI Bot backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-6 md:p-12 font-sans">
      {/* Header */}
      <header className="max-w-4xl w-full text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4 border border-indigo-500/20">
          <Sparkles className="w-4 h-4" /> AI-Powered Google Meet Assistant
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
          AI Meeting Bot & Summarizer
        </h1>
        <p className="text-slate-400 mt-3 text-lg max-w-xl mx-auto">
          Paste your Google Meet link, let our Puppeteer bot join, record, transcribe with Groq Whisper, and summarize with Gemini AI.
        </p>
      </header>

      {/* Main Content Form */}
      <main className="max-w-3xl w-full space-y-8">
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 shadow-2xl space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Video className="w-4 h-4 text-indigo-400" /> Google Meet URL
            </label>
            <input
              type="url"
              placeholder="https://meet.google.com/abc-defg-hij"
              value={meetingUrl}
              onChange={(e) => setMeetingUrl(e.target.value)}
              required
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Play className="w-4 h-4 text-indigo-400" /> Recording Duration (Seconds)
            </label>
            <input
              type="number"
              min="10"
              max="300"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2 transition duration-200"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Processing Meeting... (Recording & Summarizing)
              </>
            ) : (
              <>
                <Sparkles className="w-5 h-5" /> Start AI Meeting Bot
              </>
            )}
          </button>
        </form>

        {/* Error Alert */}
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl text-sm">
            ❌ {error}
          </div>
        )}

        {/* Results Container */}
        {result && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6">
            <div className="flex items-center gap-3 text-emerald-400 border-b border-slate-800 pb-4">
              <CheckCircle2 className="w-6 h-6" />
              <h2 className="text-xl font-bold">Meeting Processed Successfully</h2>
            </div>

            {/* AI Summary Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-indigo-400 flex items-center gap-2">
                <Sparkles className="w-5 h-5" /> Gemini AI Executive Summary
              </h3>
              <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl text-slate-300 leading-relaxed whitespace-pre-line text-sm">
                {result.summary || "No summary generated."}
              </div>
            </div>

            {/* Full Transcript Section */}
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
                <FileText className="w-5 h-5 text-slate-400" /> Groq Whisper Transcript
              </h3>
              <div className="bg-slate-950 border border-slate-800/80 p-5 rounded-xl text-slate-400 text-sm max-h-60 overflow-y-auto leading-relaxed">
                {result.transcript || "No transcript detected."}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}