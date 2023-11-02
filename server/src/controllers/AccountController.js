import { Auth0Provider } from '@bcwdev/auth0provider'
import { accountService } from '../services/AccountService.js'
import { ticketsService } from '../services/TicketsService.js'
import BaseController from '../utils/BaseController'

export class AccountController extends BaseController {
  constructor() {
    super('account')
    this.router
      .use(Auth0Provider.getAuthorizedUserInfo)
      .get('', this.getUserAccount)
      // tickets
      .get('/tickets', this.getTicketsByAccount)

  }

  async getUserAccount(req, res, next) {
    try {
      const account = await accountService.getAccount(req.userInfo)
      res.send(account)
    } catch (error) {
      next(error)
    }
  }

  async getTicketsByAccount(req, res, next) {
    try {
      // where do we go? <-- SERVICE with? <-- userInfo
      const tickets = await ticketsService.getTicketsByAccount(req.userInfo.id)
      res.send(tickets)
    } catch (error) {
      next(error)
    }
  }
}
