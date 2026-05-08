import { Request, Response } from 'express';
import { prisma } from '../index';

export const getTickets = async (req: Request, res: Response) => {
  try {
    const tickets = await prisma.ticket.findMany({
      include: { technician: { select: { name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.json(tickets);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tickets' });
  }
};

export const createTicket = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    const ticket = await prisma.ticket.create({ data });
    await prisma.log.create({
      data: { action: 'Ticket created', ticketId: ticket.id }
    });
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create ticket' });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const ticket = await prisma.ticket.update({
      where: { id },
      data
    });
    await prisma.log.create({
      data: { action: 'Ticket updated', ticketId: ticket.id }
    });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update ticket' });
  }
};

export const exitCPD = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.update({
      where: { id },
      data: { startTime: new Date(), status: 'IN_PROGRESS' }
    });
    await prisma.log.create({
      data: { action: 'Technician left CPD', ticketId: ticket.id }
    });
    res.json(ticket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log exit' });
  }
};

export const returnCPD = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const ticket = await prisma.ticket.findUnique({ where: { id } });
    if (!ticket || !ticket.startTime) {
      return res.status(400).json({ error: 'Invalid ticket state' });
    }
    
    const endTime = new Date();
    const duration = Math.round((endTime.getTime() - ticket.startTime.getTime()) / 60000); // minutes

    const updatedTicket = await prisma.ticket.update({
      where: { id },
      data: { endTime, duration, status: 'COMPLETED' }
    });
    
    await prisma.log.create({
      data: { action: 'Technician returned to CPD', ticketId: updatedTicket.id }
    });
    
    res.json(updatedTicket);
  } catch (error) {
    res.status(500).json({ error: 'Failed to log return' });
  }
};
