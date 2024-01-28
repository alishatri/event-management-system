const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

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
    res.json(event);
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

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const imageUrl = req.file.path;

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
    const event = await prisma.event.delete({
      where: {
        id: eventId,
      },
    });
    event
      ? res.status(200).json({ message: `Event with id ${eventId} is deleted` })
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

    const registrationRecord = await prisma.registration.findUnique({
      where: {
        eventId,
        email,
      },
    });
    if (!registrationRecord) {
      return res.status(404).json({
        message: "Registration not found",
      });
    }

    await prisma.registration.delete({
      where: {
        id: registrationRecord.id,
      },
    });

    res.json({
      message: "Registration deleted successfully",
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
