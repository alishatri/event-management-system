const nodemailer = require("nodemailer");

const USER_EMAIL = "alishatri21@gmail.com";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

const sendConfirmationEmail = async (email) => {
  const info = await transporter.sendMail({
    from: USER_EMAIL,
    to: email,
    subject: "Confirmation for event registration",
    text: "Thank you for registering for the event. Please confirm your attendance.",
    html: `
    Thank you for registering for the event. Please confirm your attendance.
    <br>
    <button style="width:100px; padding:1rem; border-radius:20px; ">Confirm</button>`,
  });

  console.log("Confirmation email sent: ", info.messageId);
};

const sendDeletedEmail = async (email) => {
  const info = await transporter.sendMail({
    from: USER_EMAIL,
    to: email,
    subject: "You are deleted from event",
    text: "You are deleted from event..",
    html: `
    You are deleted from this event..
    `
  });

  console.log("Confirmation email sent: ", info.messageId);
};

module.exports = { sendConfirmationEmail, sendDeletedEmail };
