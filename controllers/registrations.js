const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const setRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, eventId } = req.body;
   
    const findEventId = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });
    const registration = await prisma.registration.create({
      data: {
        firstName,
        lastName,
        email,
        eventId,
      },
    });
    res.json(registration);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`,
      error: `${error}`,
    });
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
    const registrationId = parseInt(req.params.id);
    const registration = await prisma.registration.findUnique({
      where: {
        id: registrationId,
      },
    });
    registration
      ? res.json(registration)
      : res
          .status(404)
          .json({ message: `Member with id ${registrationId} not found` });
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
    const registrationId = parseInt(req.params.id);
    const registration = await prisma.registration.delete({
      where: {
        id: registrationId,
      },
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
