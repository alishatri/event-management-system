const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3000;
const google = require("googleapis");

const bodyParser = require("body-parser");
// const oauth2Client = new google.auth.OAuth2(
//   process.env.CLIENT_ID,
//   process.env.CLIENT_SECRET,
//   process.env.REDIRECT_URI,

// );

// oauth2Client.setCredentials({
//   access_token: process.env,
//   refresh_token: "your-refresh-token",
// });

app.use(cors());
app.use(bodyParser.json());
// const gmail = google.gmail({ version: "v1", auth: oauth2Client });

const eventsRouter = require("./routers/events");
const registrationRouter = require("./routers/registrations");

app.use("/api/events", eventsRouter);

app.use("/api/registration", registrationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
