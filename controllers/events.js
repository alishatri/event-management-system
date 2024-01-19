const prisma = require("@prisma/client");

const setEvent = async () => {
  try {
    const event = await prisma;
  } catch (error) {
    console.log(error);
  }
};

const getEvents = async () => {
  try {
    const event = await prisma;
  } catch (error) {
    console.log(error);
  }
};

const getEvent = async () => {
  try {
    const event = await prisma;
  } catch (error) {
    console.log(error);
  }
};

const updateEvent = async () => {
  try {
    const event = await prisma;
  } catch (error) {
    console.log(error);
  }
};

const deleteEvent = async () => {
  try {
    const event = await prisma;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  setEvent,
  getEvent,
  getEvents,
  updateEvent,
  deleteEvent,
};
