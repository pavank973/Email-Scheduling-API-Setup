const Email = require('../models/Email');
const nodemailer = require('nodemailer');
const config = require('../config');

const sendEmail = async (recipient, subject, body) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.gmail.user,
      pass: config.gmail.pass
    }
  });

  const mailOptions = {
    from: config.gmail.user,
    to: recipient,
    subject: subject,
    text: body
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (err) {
    console.error('Error sending email:', err);
  }
};

exports.createEmail = async (req, res) => {
  try {
    const { recipient, subject, body, scheduledAt } = req.body;
    const email = new Email({ recipient, subject, body, scheduledAt });
    await email.save();
    const currentTimeUTC = new Date().toISOString();
    console.log(scheduledAt,"logg",currentTimeUTC)
    if (scheduledAt <= currentTimeUTC) {
      await sendEmail(recipient, subject, body);
      email.sent = true;
      await email.save();
    }
    res.status(201).json(email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getEmail = async (req, res) => {
  try {
    const email = await Email.findById(req.params.id);
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }
    res.json(email);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getAllEmails = async (req, res) => {
  try {
    const emails = await Email.find();
    res.json(emails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.deleteEmail = async (req, res) => {
  try {
    const email = await Email.findByIdAndDelete(req.params.id);
    if (!email) {
      return res.status(404).json({ error: 'Email not found' });
    }
    res.json({ message: 'Email deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getUnsentEmails = async (req, res) => {
  try {
    const unsentEmails = await Email.find({ sent: false });
    res.json(unsentEmails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
