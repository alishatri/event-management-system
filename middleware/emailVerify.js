const { google } = require("googleapis");
const nodemailer = require("nodemailer");

const CLIENT_ID = process.env.CLIENT_ID;
const CLIENT_SECRET = process.env.CLIENT_SECRET;
const REFRESH_TOKEN = process.env.REFRESH_TOKEN;
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const MY_EMAIL = process.env.MY_EMAIL;

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: MY_EMAIL,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
  },
});

async function sendConfirmationEmail(email) {
  const info = await transporter.sendMail({
    from: email, // replace with your sender address
    to: email,
    subject: "Confirmation for event registration",
    text: "Thank you for registering for the event. Please confirm your attendance.",
    html: `<button style="width:100px; padding:1rem;">Confirm</button>`,
  });

  console.log("Confirmation email sent: ", info.messageId);
}

sendConfirmationEmail(MY_EMAIL);
