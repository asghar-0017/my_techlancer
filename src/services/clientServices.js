const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();
const dataInRepo=require('../Repository/clientRepo')

const sendMessageTOService = async (bodyData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, 
        },
    });

    const clientMailOptions = {
        from: process.env.EMAIL, 
        to: bodyData.email,
        subject: 'Thank you for your submission', 
        text: `Hi ${bodyData.name},\n\nThank you for your message. We have received the following information:\n\nName: ${bodyData.name}\nEmail: ${bodyData.email}\nMessage: ${bodyData.message}\n\nWe will get back to you soon.`,
        html: `<p>Hi <b>${bodyData.name}</b>,</p>
               <p>Thank you for your message. We have received the following information:</p>
               <ul>
                 <li><b>Name:</b> ${bodyData.name}</li>
                 <li><b>Email:</b> ${bodyData.email}</li>
                 <li><b>Message:</b> ${bodyData.message}</li>
               </ul>
               <p>We will get back to you soon.</p>`,
    };

    const adminMailOptions = {
        from: process.env.EMAIL,
        to: process.env.ADMIN_EMAIL, 
        subject: 'New Contact Form Submission',
        text: `You have a new contact form submission from ${bodyData.name}.\n\nMessage: ${bodyData.message}\n\nClient Email: ${bodyData.email}`,
        html: `<p>You have a new contact form submission from <b>${bodyData.name}</b>.</p>
               <p>Message: ${bodyData.message}</p>
               <p>Client Email: ${bodyData.email}</p>`,
    };

    try {
        const saveInDb=await dataInRepo(bodyData)
        const clientInfo = await transporter.sendMail(clientMailOptions);
        const adminInfo = await transporter.sendMail(adminMailOptions);

        return {
            data:saveInDb,
            clientMessageId: clientInfo.messageId,
            adminMessageId: adminInfo.messageId,
            previewUrl: nodemailer.getTestMessageUrl(adminInfo), 
        };
    } catch (error) {
        console.error('Error sending emails:', error);
    }
};

module.exports = sendMessageTOService;
