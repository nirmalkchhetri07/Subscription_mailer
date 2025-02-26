import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { companyName } from "./constants.js";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.USER,
    pass: process.env.APP_PASSWORD,
  },
});

export default async function sendingMail(receiverEmail) {
  try {
    await transporter.sendMail({
      from: {
        name: [`${companyName}`],
        address: process.env.USER,
      },
      to: receiverEmail,
      subject: "Thank you for subscribing!",
      html: `
      <h2>Welcome to the ${companyName} Family!🥰</h2>
<p>You're all set! 🎉</p>
<p>You’ll start receiving the latest news, updates, and exclusive content directly to your inbox. Stay tuned for exciting updates and offers!</p>
<p>If you ever want to update your preferences or unsubscribe, just click the link at the bottom of any email.</p>
<p>Thanks for joining our community! 💌</p>

      `,
    });
    console.log("Email has been sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
