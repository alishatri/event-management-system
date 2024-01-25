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
      members,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image file is required." });
    }
    const imageUrl = req.file.path;
    const mb = parseInt(members);
    const event = await prisma.event.create({
      data: {
        title,
        description,
        date,
        imageUrl,
        organizedBy,
        location,
        timeframe,
        members:mb,
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
    });
    res.json(event);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: `Internal server error , ${error}`,
    });
  }
};

const getEvents = async (req, res) => {
  try {
    const events = await prisma.event.findMany();
    res.json(events);
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

module.exports = {
  setEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
