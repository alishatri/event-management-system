const router = require("express").Router();
const {
  setEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");
const upload = require("../middleware/imageUpload");

router.post("/create",upload.single("imageUrl"),  setEvent);

router.get("/get-event/:id", getEvent);

router.get("/get-events", getEvents);

router.put("/update/:id", upload.single("imageUrl"), updateEvent);

router.delete("/delete/:id", deleteEvent);

module.exports = router;
