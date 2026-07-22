import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:7000/api/meet",
});

export const processMeeting = (meetingUrl, duration) =>
  API.post("/process", { meetingUrl, duration });

export const getAllMeetings = () => API.get("/all");