const nodemailer = require('nodemailer');
const dataInRepo = require('../Repository/clientRepo'); 
const dotenv=require('dotenv')
dotenv.config()

// Create a reusable transporter
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // Use environment variables for security in production
  },
});

// Main service function to handle message sending and email notifications
const sendMessageTOService = async (data) => {
  try {
    const clientData = await dataInRepo(data); // Save client data in the repository
    if (clientData) {
      await Promise.all([
        sendEmailToClient(clientData.email, clientData.name),
        sendEmailToAdmin(clientData)
      ]);
      console.log('Data saved and emails sent successfully.');
    }
  } catch (error) {
    console.error('Error in sending message to service:', error);
  }
};

// Function to send a professional thank-you email to the client
const sendEmailToClient = async (clientEmail, clientName) => {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h3 style="color: #0056b3;">Dear ${clientName},</h3>
      <p>Thank you for contacting us. We have successfully received your message, and one of our representatives will get back to you shortly.</p>
      <p>If you have any additional questions, feel free to reply to this email or contact us at <a href="mailto:fa21bscs0006@maju.edu.pk">fa21bscs0006@maju.edu.pk</a>.</p>
      <p>Best Regards,<br>My-Techlancer Team</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: clientEmail,
      subject: 'Thank you for contacting My-Techlancer!',
      html: htmlBody,
    });
    console.log('Thank-you email sent to:', clientEmail);
  } catch (error) {
    console.error('Error sending thank-you email to client:', error);
  }
};

const sendEmailToAdmin = async (clientData) => {
  const htmlBody = `
    <div style="font-family: Arial, sans-serif; color: #333;">
      <h3 style="color: #d9534f;">New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${clientData.name}</p>
      <p><strong>Email:</strong> ${clientData.email}</p>
      <p><strong>Phone:</strong> ${clientData.phone}</p>
      <p><strong>Subject:</strong> ${clientData.subject}</p>
      <p><strong>Message:</strong> ${clientData.message}</p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL, 
      subject: `New Message from ${clientData.name}`,
      html: htmlBody,
    });
    console.log('Email with client details sent to admin.');
  } catch (error) {
    console.error('Error sending email to admin:', error);
  }
};

module.exports = { sendMessageTOService };
