const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const {sendConfirmationEmail } = require("../middleware/emailVerify");

const setRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, eventId } = req.body;

    const existingEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    if (!existingEvent) {
      return res
        .status(404)
        .json({ message: `Event with ID ${eventId} not found` });
    }

    const existingRegistration = await prisma.registration.findFirst({
      where: {
        email,
        eventId,
      },
    });

    if (existingRegistration) {
      return res.status(400).json({
        message: `Email ${email} is already registered for this event`,
      });
    }
    const register = await prisma.registration.create({
      data: { firstName, lastName, email, eventId },
    });

    await sendConfirmationEmail(email);

    res
      .status(201)
      .json({ message: "Registration successful", registration: register });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal server error", error: `${error}` });
  }
};

const getRegistrations = async (req, res) => {
  try {
    const registration = await prisma.registration.findMany({
      include: {
        event: true,
      },
    });

    if (registration.length > 0) {
      res.json(registration);
    } else {
      res.status(404).json({ message: `Registrations not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`,
      error: `${error}`,
    });
  }
};

const getRegistration = async (req, res) => {
  try {
    const { email } = req.body;
    const registration = await prisma.registration.findFirst({
      where: {
        email: email,
      },
      include: {
        event: true,
      },
    });
    registration
      ? res.json(registration)
      : res.status(404).json({
          message: `Registration with email ${email} not found`,
        });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`,
      error: `${error}`,
    });
  }
};

const updateRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email } = req.body;
    const registrationId = parseInt(req.params.id);
    const registration = await prisma.registration.update({
      where: {
        id: registrationId,
      },
      data: { firstName, lastName, email },
    });
    res
      .status(201)
      .json({ message: "Registration updated successful", registration });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`,
      error: `${error}`,
    });
  }
};

const deleteRegistration = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const checkId = await prisma.registration.findUnique({
      where: {
        id,
      },
    });
    if (!checkId) {
      res.status(404).json({
        message: `Registration with id ${id} not found , please check the  correct id!!`,
      });
    }
    const deleteRegistration = await prisma.registration.delete({
      where: {
        id,
      },
    });
    res.status(200).json({
      message: `Registration with id ${id} deleted `,
      registration: deleteRegistration,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`,
      error: `${error}`,
    });
  }
};

module.exports = {
  setRegistration,
  getRegistration,
  getRegistrations,
  updateRegistration,
  deleteRegistration,
};
