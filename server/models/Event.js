const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  description: { type: String },
  date: { type: Date, required: true },
  venue: { type: String, required: true },
  capacity: { type: Number, required: true },
  ticketsSold: { type: Number, default: 0 }
});

module.exports = mongoose.model('Event', eventSchema);