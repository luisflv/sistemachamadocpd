import { Router } from 'express';
import { getTickets, createTicket, updateTicket, exitCPD, returnCPD } from '../controllers/ticket.controller';
import { authenticate } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

router.get('/', getTickets);
router.post('/', createTicket);
router.put('/:id', updateTicket);
router.post('/:id/exit', exitCPD);
router.post('/:id/return', returnCPD);

export default router;
