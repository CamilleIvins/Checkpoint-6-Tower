import { Auth0Provider } from "@bcwdev/auth0provider"
import { ticketsService } from "../services/TicketsService.js"
import BaseController from "../utils/BaseController.js"

export class TicketsController extends BaseController {
    constructor() {
        super('api/tickets')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createTicket)
            .delete('/:ticketId', this.returnTicket)

    }

    async createTicket(req, res, next) {
        try {
            const ticketBody = req.body
            ticketBody.accountId = req.userInfo.id

            const ticket = await ticketsService.createTicket(ticketBody)

            res.send(ticket)

        } catch (error) {
            next(error)
        }
    }

    async returnTicket(req, res, next) {
        try {
            const hopeForRefund = await ticketsService.returnTicket(req.params.ticketId, req.userInfo.id)
            res.send(hopeForRefund)
        } catch (error) {
            next(error)
        }

    }

    // THIS GOES IN THE ACCOUNT controller ⬇️
    // async getTickets(req, res, next) {
    //     try {
    //         // where do we go? <-- SERVICE with? <-- a query
    //         const tickets = await ticketsService.getTickets(req.query)
    //         res.send(tickets)
    //     } catch (error) {
    //         next(error)
    //     }
    // }
}