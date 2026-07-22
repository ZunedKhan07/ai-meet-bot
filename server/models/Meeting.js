import mongoose from "mongoose";

const meetingSchema = new mongoose.Schema(
  {
    meetingUrl: {
      type: String,
      required: true,
    },
    audioPath: {
      type: String,
    },
    transcript: {
      type: String,
      default: "",
    },
    summary: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["processing", "completed", "failed"],
      default: "processing",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", meetingSchema);