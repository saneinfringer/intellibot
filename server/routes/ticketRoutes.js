// // server/routes/ticketRoutes.js
// import express from 'express';
// import {
//   createTicket,
//   getUserTickets,
//   getAllTickets
// } from '../controllers/ticketController.js';

// import { protect, isAdmin } from '../middleware/authMiddleware.js';

// const router = express.Router();

// router.post('/', protect, createTicket);
// router.get('/my', protect, getUserTickets);
// router.get('/all', protect, isAdmin, getAllTickets);
// router.put('/:id', protect, isAdmin, respondToTicket);

// export default router;
//----------------------
// routes/ticketRoutes.js
import express from 'express';
import { createTicket } from '../controllers/ticketController.js';
import protect from '../middleware/authMiddleware.js';

import { getUserTickets } from '../controllers/ticketController.js';

const router = express.Router();

router.post('/', protect, createTicket);
router.get('/user', protect, getUserTickets);

export default router;
