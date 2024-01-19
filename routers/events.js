const router = require("express").Router();
const {
  setEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
} = require("../controllers/events");

router.post("/", setEvent);
router.get("/", getEvent);
router.get("/", getEvents);
router.get("/", updateEvent);
router.get("/", deleteEvent);


module.exports = router;
