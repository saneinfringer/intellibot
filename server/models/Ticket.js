// server/models/Ticket.js
import mongoose from 'mongoose';

const ticketSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String, required: true },
  response: { type: String },
  status: { type: String, enum: ['open', 'closed'], default: 'open' },
}, { timestamps: true });

export default mongoose.model('Ticket', ticketSchema);
