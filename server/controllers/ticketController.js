// // server/controllers/ticketController.js
// import Ticket from '../models/Ticket.js';

// export const createTicket = async (req, res) => {
//   const { message } = req.body;
//   try {
//     const ticket = await Ticket.create({
//       user: req.user.id,
//       message
//     });
//     res.status(201).json(ticket);
//   } catch (err) {
//     res.status(500).json({ message: 'Ticket creation failed', error: err.message });
//   }
// };

// export const getUserTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find({ user: req.user.id });
//     res.status(200).json(tickets);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch tickets', error: err.message });
//   }
// };

// export const getAllTickets = async (req, res) => {
//   try {
//     const tickets = await Ticket.find().populate('user', 'name email');
//     res.status(200).json(tickets);
//   } catch (err) {
//     res.status(500).json({ message: 'Failed to fetch all tickets', error: err.message });
//   }
// };

// export const respondToTicket = async (req, res) => {
//     const { id } = req.params;
//     const { response, status } = req.body;
  
//     try {
//       const ticket = await Ticket.findById(id);
//       if (!ticket) {
//         return res.status(404).json({ message: 'Ticket not found' });
//       }
  
//       ticket.response = response || ticket.response;
//       ticket.status = status || ticket.status;
//       await ticket.save();
  
//       res.status(200).json(ticket);
//     } catch (err) {
//       res.status(500).json({ message: 'Failed to update ticket', error: err.message });
//     }
//   };
//-------------------------------

// controllers/ticketController.js
import dotenv from 'dotenv';
dotenv.config();

import Ticket from '../models/Ticket.js';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const createTicket = async (req, res) => {
  const { message } = req.body;
  const user = req.user;

  try {
    // Ask OpenAI GPT-3.5
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: message }],
    });

    const response = completion.choices[0].message.content;

    // Save to DB
    const ticket = new Ticket({
      user: user._id,
      message,
      response,
      status: 'closed',
    });

    await ticket.save();

    res.status(201).json(ticket);
  } catch (err) {
    console.error('OpenAI Error:', err);
    res.status(500).json({ message: 'Failed to create ticket' });
  }
};

export const getUserTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tickets' });
  }
};
