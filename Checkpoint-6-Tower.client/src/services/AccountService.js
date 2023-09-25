import { AppState } from '../AppState'
import { Account } from '../models/Account.js'
import { Ticket } from '../models/Ticket.js'
import { logger } from '../utils/Logger'
import { api } from './AxiosService'
import Pop from "../utils/Pop.js"


class AccountService {
  async getAccount() {
    try {
      const res = await api.get('/account')
      AppState.account = new Account(res.data)
    } catch (err) {
      logger.error('HAVE YOU STARTED YOUR SERVER YET???', err)
    }
  }
  async getTicketsByAccount(){
  try {
    const res = await api.get(`account/tickets`)
    AppState.myTickets = res.data.map(tickets => new Ticket(tickets))
  } catch (error) {
    Pop.error(error)
  }
}
}



export const accountService = new AccountService()
