import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: config.SMTP_HOST,
    port: 587, // 465 not work all the time
    secure: config.NODE_ENV !== "development", // true for port 465, false for other ports
    auth: {
      user: config.SMTP_MAIL,
      pass: config.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: "developer.tanvirhossain@gmail.com", // sender address
    to,
    subject: "Reset your password within 10 min", // Subject line
    text: "", // plain text body
    html, // html body
  });
};
