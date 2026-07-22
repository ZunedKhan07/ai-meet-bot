import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect_DB from "./config/db.js";
import meetRoutes from "./routes/meetRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/meet", meetRoutes);

app.get("/", (req, res) => {
  res.send("🚀 AI Google Meet Bot Server Running...");
});

const PORT = process.env.PORT || 7000;

connect_DB().then(() => {
  app.listen(PORT, () => {
    console.log(` ✅ Server running on http://localhost:${PORT}`);
  });
});