import { AppState } from "../AppState.js"
import { Ticket } from "../models/Ticket.js"
import { logger } from "../utils/Logger.js"
import Pop from "../utils/Pop.js"
import { api } from "./AxiosService.js"


class TicketsService {

    async purchaseTicket(ticketData){
        const res = await api.post(`api/tickets`, ticketData)
        logger.log('new ticket purchase', res.data)
        AppState.activeEventTickets.push(new Ticket(res.data))
    }
    // async getTicketsByAccount(){
    //    try {
    //      const res = await api.get(`api/account/tickets`)
    //      logger.log('ticket array', res.data)
    //      AppState.activeEventTickets = res.data.map(ticket =>new Ticket(ticket))
    //    } catch (error) {
    //     Pop.error(error)
    //    }
    // }

    async returnTicket(ticketId){
        const res = await api.delete(`api/tickets/${ticketId}`)
        let indexRemoved = AppState.activeEventTickets.findIndex(ticket => ticket.id = ticketId)
        AppState.activeEventTickets.splice(indexRemoved,1)
    }
}

export const ticketsService = new TicketsService