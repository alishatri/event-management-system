const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const setRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, eventId } = req.body;
    const register = await prisma.registration.create({
      data: {
        firstName,
        lastName,
        email,
        eventId,
      },
    });
    res.json(register);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: `Internal server error` });
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
    const registration = await prisma.registration.findUnique({
      where: {
        email,
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
    const { email } = req.body;

    await prisma.registration.delete({
      where: {
        email,
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
