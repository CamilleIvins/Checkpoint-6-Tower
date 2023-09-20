import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";

export class EventsController extends BaseController {

    constructor() {
        super('api/events')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
    }

    //req: 
    //res: 
    async createEvent(req, res, next) {
        //try-catch
        try {
            // what are we framing: the info of the event
            const eventBody = req.body
            //whodunnit?
            eventBody.creatorId = req.userInfo._id
            //data alteration = need service
            const event = await eventsService.createEvent(eventBody)
            // do NOT forget the res portion - what you get back
            res.send(event)
        } catch (error) {
            next(error)
        }
    }
}