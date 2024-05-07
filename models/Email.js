const mongoose = require('mongoose');

const emailSchema = new mongoose.Schema({
  recipient: { type: String, required: true },
  subject: { type: String, required: true },
  body: { type: String, required: true },
  scheduledAt: { type: Date, required: true },
  sent: { type: Boolean, default: false }
});

module.exports = mongoose.model('Email', emailSchema);
