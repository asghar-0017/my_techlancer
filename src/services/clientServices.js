const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config();

const sendMessageTOService = async (bodyData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD, 
        },
    });
    
    const clientMailOptions = {
        from: `"My Techlancer" <${process.env.EMAIL}>`, // Updated to show "My Techlancer"
        to: bodyData.email, 
        subject: 'Thank you for contacting us!', 
        text: `Hi ${bodyData.name},\n\nThank you for your message. Here is the information you submitted:\n\nName: ${bodyData.name}\nEmail: ${bodyData.email}\nSubject: ${bodyData.subject}\nPhone: ${bodyData.phone}\nMessage: ${bodyData.message}\n\nWe will get back to you shortly.\n\nBest Regards,\nYour Company Name`,
        html: `<p>Hi <b>${bodyData.name}</b>,</p>
               <p>Thank you for reaching out to us. We have received the following information:</p>
               <ul>
                 <li><b>Name:</b> ${bodyData.name}</li>
                 <li><b>Email:</b> ${bodyData.email}</li>
                 <li><b>Subject:</b> ${bodyData.subject}</li>
                 <li><b>Phone:</b> ${bodyData.phone}</li>
                 <li><b>Message:</b> ${bodyData.message}</li>
               </ul>
               <p>We will get back to you shortly.</p>
               <p>Best Regards,<br>My-TechLancer</p>`,
    };

    const adminMailOptions = {
        from: `"My Techlancer" <${process.env.EMAIL}>`, // Updated to show "My Techlancer"
        to: process.env.ADMIN_EMAIL, 
        subject: 'New Contact Form Submission',
        text: `A new contact form submission has been received from ${bodyData.name}.\n\nDetails:\nName: ${bodyData.name}\nEmail: ${bodyData.email}\nSubject: ${bodyData.subject}\nPhone: ${bodyData.phone}\nMessage: ${bodyData.message}\n\nPlease follow up with the client as soon as possible.`,
        html: `<p>A new contact form submission has been received from <b>${bodyData.name}</b>.</p>
               <p><b>Details:</b></p>
               <ul>
                 <li><b>Name:</b> ${bodyData.name}</li>
                 <li><b>Email:</b> ${bodyData.email}</li>
                 <li><b>Subject:</b> ${bodyData.subject}</li>
                 <li><b>Phone:</b> ${bodyData.phone}</li>
                 <li><b>Message:</b> ${bodyData.message}</li>
               </ul>`    };

    try {
        const clientInfo = await transporter.sendMail(clientMailOptions);
        const adminInfo = await transporter.sendMail(adminMailOptions);

        return {
            clientMessageId: clientInfo.messageId,
            adminMessageId: adminInfo.messageId,
            previewUrl: nodemailer.getTestMessageUrl(adminInfo),
        };
    } catch (error) {
        console.error('Error sending emails:', error);
        throw error
    }
};

const sendSubscriptionToService = async (bodyData) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'fa21bscs0017@maju.edu.pk',
            pass: 'gutz sdgf umxn bxqf',
        },
    })

    const clientMailOptions = {
        from: `"My Techlancer" <${process.env.EMAIL}>`, 
        to: bodyData.email, 
        subject: 'Welcome to My Techlancer - Subscription Confirmed!',
        html: `
            <div style="font-family: Arial, sans-serif; color: #333;">
                <h1 style="color: #007BFF;">Thank you for subscribing!</h1>
                <p>Hi,</p>
                <p>We're thrilled to have you on board. Stay tuned for exciting updates, exclusive content, and the latest news from <b>My Techlancer</b>.</p>
                <p>You'll be the first to know about:</p>
                <ul>
                    <li>New features</li>
                    <li>Special offers</li>
                    <li>Latest tech insights</li>
                </ul>
                <p>If you have any questions, feel free to reach out to us at <a href="mailto:${process.env.ADMIN_EMAIL}" style="color: #007BFF;">${process.env.EMAIL}</a>.</p>
                <p>Best Regards,<br><b>My Techlancer Team</b></p>
            </div>`,
    };

    const adminMailOptions = {
        from: `"My Techlancer" <${process.env.EMAIL}>`,
        to: process.env.ADMIN_EMAIL, 
        subject: 'New Subscription',
        text: `A new subscription has been received from ${bodyData.email}.`,
        html: `
            <p>A new subscription has been received from:</p>
            <ul>
                <li><b>Email:</b> ${bodyData.email}</li>
            </ul>
            <p>Please ensure they receive timely updates and newsletters.</p>`,
    };

    try {
        const clientInfo = await transporter.sendMail(clientMailOptions);
        const adminInfo = await transporter.sendMail(adminMailOptions);

        return {
            clientMessageId: clientInfo.messageId,
            adminMessageId: adminInfo.messageId,
            previewUrl: nodemailer.getTestMessageUrl(adminInfo),
        };
    } catch (error) {
        console.error('Error sending emails:', error);
        throw error;
    }
};


module.exports = {sendMessageTOService,sendSubscriptionToService}
