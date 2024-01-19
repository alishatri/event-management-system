const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
app.use(cors());

const eventsRouter = require("./routers/events");

app.use("/", eventsRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
