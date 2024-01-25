const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "outlook",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASSWORD,
    type: "PLAIN",
  },
});

async function sendConfirmationEmail(email) {
  const info = await transporter.sendMail({
    from: '"Ali Shatri" <alishatri@outlook.com>', // replace with your sender address
    to: email,
    subject: "Confirmation for event registration",
    text: "Thank you for registering for the event. Please confirm your attendance.",
    html: `<button style="width:100px; padding:1rem;">Confirm</button>`,
  });

  console.log("Confirmation email sent: ", info.messageId);
}




const setRegistration = async (req, res) => {
  try {
    const { firstName, lastName, email, eventId } = req.body;
    const existingEmail = await prisma.registration.findUnique({
      where: {
        email: email,
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
    // await sendConfirmationEmail(email);
    
    existingEmail
      ? res.status(400).json({ message: `${email} already exist` })
      : res.json(registration);

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
    const registration = await prisma.registration.findMany({});
    res.json(registration);
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
    res.json(registration);
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
