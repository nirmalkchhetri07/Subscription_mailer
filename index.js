// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sendingMail from "./nodemailer.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("dist"));

// Subscription endpoint
app.post("/subscribe", async (req, res) => {
  try {
    const { email } = req.body;
    await sendingMail(email);
    res.status(200).json({ message: "Subscription email sent" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to send subscription email" });
  }
});

app.listen(3000, () => {
  console.log(`Server running on port 3000`);
});
