const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
  },
});

async function sendConfirmationEmail(email) {
  const info = await transporter.sendMail({
    from: '"Your Name" <your-email@gmail.com>', // replace with your sender address
    to: email,
    subject: "Confirmation for event registration",
    text: "Thank you for registering for the event. Please confirm your attendance.",
    html: `<button style="width:100px; padding:1rem;">Confirm</button>`,
  });

  console.log("Confirmation email sent: ", info.messageId);
}
