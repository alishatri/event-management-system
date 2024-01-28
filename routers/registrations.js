const router = require("express").Router();
const {
  setRegistration,
  getRegistration,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
} = require("../controllers/registrations");

router.post("/create", setRegistration);

router.get("/get-registration", getRegistration);

router.get("/get-registrations", getRegistrations);

router.put("/update/:id", updateRegistration);

router.delete("/delete", deleteRegistration);

module.exports = router;
