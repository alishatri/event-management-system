const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { sendDeletedEmail } = require("../middleware/emailVerify");

const setEvent = async (req, res) => {
  try {
    const {
      title,
      description,
      date,
      organizedBy,
      location,
      timeframe,
      maxMembers,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const imageUrl = req.file.path;
    const mb = parseInt(maxMembers);
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        imageUrl,
        organizedBy,
        location,
        timeframe,
        maxMembers: mb,
      },
    });
    console.log(event);

    res.status(201).json({ message: "Event created successful", event: event });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error`,
      error: `${error}`,
    });
  }
};

const getEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
      include: {
        registrations: true,
      },
    });
    event
      ? res.json(event)
      : res.status(404).json({ message: `Event with id ${eventId} not found` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error , ${error}`,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany({
      include: {
        registrations: true,
      },
    });
    if (events.length > 0) {
      res.json(events);
    } else {
      res.status(404).json({ message: `Events not found` });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error , ${error}`,
    });
  }
};

const updateEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const { title, description, date, organizedBy, timeframe } = req.body;

    const checkEvent = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const imageUrl = req.file.path;

    if (!checkEvent) {
      return res
        .status(404)
        .json({ message: `Event with id ${eventId} not found` });
    }
    const event = await prisma.event.update({
      where: {
        id: eventId,
      },
      data: {
        title,
        description,
        date,
        imageUrl,
        organizedBy,
        timeframe,
      },
    });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error , ${error}`,
    });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const eventId = parseInt(req.params.id);
    const event = await prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    event
      ? await prisma.event.delete({
          where: {
            id: eventId,
          },
        })
      : res.status(404).json({ message: `Event with id ${eventId} not found` });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error , ${error}`,
    });
  }
};

const deleteEventMember = async (req, res) => {
  try {
    const { eventId, email } = req.body;

    const checkRegistration = await prisma.registration.findFirst({
      where: {
        eventId,
        email,
      },
    });

    if (!checkRegistration) {
      return res.status(404).json({
        message: `Registration with ${email} not found`,
      });
    }

    await prisma.registration.delete({
      where: {
        id: eventId,
      },
    });
    await sendDeletedEmail(email);
    res.json({
      message: `Registration with ${email} in event with id ${eventId} deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
      error: `${error}`,
    });
  }
};

module.exports = {
  setEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
  deleteEventMember,
};
