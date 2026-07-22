import express from "express";
import { processFullMeeting } from "../controllers/meetController.js";

const router = express.Router();

router.post("/process", processFullMeeting);

export default router;