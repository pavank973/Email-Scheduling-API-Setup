// services/emailService.js

const sgMail = require('@sendgrid/mail');
const Email = require('../models/Email');

sgMail.setApiKey('<YOUR_SENDGRID_API_KEY>');

// Function to send scheduled emails
exports.sendScheduledEmails = async () => {
    try {
        const unsentEmails = await Email.find({ sent: false, scheduledTime: { $lte: new Date() } });
        for (const email of unsentEmails) {
            const msg = {
                to: email.recipient,
                from: 'your@example.com',
                subject: email.subject,
                text: email.body
            };
            await sgMail.send(msg);
            email.sent = true;
            await email.save();
        }
    } catch (err) {
        console.error(err);
    }
};
