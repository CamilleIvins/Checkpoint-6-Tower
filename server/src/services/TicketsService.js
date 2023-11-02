import { dbContext } from "../db/DbContext.js";
import { BadRequest, Forbidden } from "../utils/Errors.js";
BadRequest
dbContext

class TicketsService {

    async getTicketsByEventId(eventId) {
        const ticketHolders = await dbContext.Tickets.find({ eventId }).populate('profile event')
        return ticketHolders
    }
    async getTicketsByAccount(userId) {
        // this is not identical to Mick's lecture, but it passed POSTMAN tests
        // const tickets = await dbContext.Tickets.find({ accountId: userId }).populate('profile event')
        const tickets = await dbContext.Tickets.find({ accountId: userId }).populate({ path: 'event', populate: { path: 'creator ticketCount', select: '-email' } })
        return tickets
    }
    async purchaseTicket(ticketBody) {
        const ticket = await dbContext.Tickets.create(ticketBody)
        //    populate virtuals
        await ticket.populate('profile event')

        return ticket
    }

    async returnTicket(ticketId, id) {
        const hopeForRefund = await dbContext.Tickets.findById(ticketId).populate('event profile')

        if (!hopeForRefund) throw new BadRequest(`Looks like the ticket with ID: ${ticketId} does not exist`)
        if (id != hopeForRefund.accountId) throw new Forbidden(`How uncouth to attempt a refund on another's ticket...`)

        await hopeForRefund.remove()
        // use virtual titles in RETURN, know that they show up in red squiggles.
        // @ts-ignore
        return `${hopeForRefund.profile.name} has returned their ticket for ${hopeForRefund.event.name}`
    }

}

export const ticketsService = new TicketsService()