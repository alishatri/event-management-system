const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = 3000;
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());


const eventsRouter = require("./routers/events");
const registrationRouter = require("./routers/registrations");

app.use("/api/events", eventsRouter);

app.use("/api/registration", registrationRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
