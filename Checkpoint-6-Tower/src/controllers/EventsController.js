import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { eventsService } from "../services/EventsService.js";
import { commentsService } from "../services/CommentsService.js";
import { ticketsService } from "../services/TicketsService.js";
import { dbContext } from "../db/DbContext.js";

export class EventsController extends BaseController {

    constructor() {
        super('api/events')
        this.router
            .get('', this.getEvents)
            .get('/:eventId', this.getEventById)
            // comments
            .get('/:eventId/comments', this.getCommentsInEvent)
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createEvent)
            .put('/:eventId', this.editEvent)
            .delete('/:eventId', this.cancelEvent)
            // tickets
            .get('/:eventId/tickets', this.getTicketsForEvent)
    }

    //req: 
    //res: 
    async createEvent(req, res, next) {
        //try-catch
        try {
            // what are we framing: the info of the event
            const eventBody = req.body
            //whodunnit?
            eventBody.creatorId = req.userInfo.id
            //data alteration = need service
            const event = await eventsService.createEvent(eventBody)
            // do NOT forget the res portion - what you get back
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async getEvents(req, res, next) {
        try {
            const events = await eventsService.getEvents(req.query)
            res.send(events)
        } catch (error) {
            next(error)
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventsService.getEventById(req.params.eventId)
            res.send(event)
        } catch (error) {
            next(error)
        }
    }

    async editEvent(req, res, next) {
        try {
            const updates = req.body
            const eventId = req.params.eventId
            // const eventLead = req.userInfo.id
            const editedEvent = await eventsService.editEvent(eventId, updates)
            res.send(editedEvent)
        } catch (error) {
            next(error)
        }
    }

    async cancelEvent(req, res, next) {
        try {
            const eventId = req.params.eventId
            const userId = req.userInfo.id
            const event = await eventsService.cancelEvent(eventId, userId)
            res.send(event)
        } catch (error) {
            next(error)
        }

    }

    // to tickets SERVICE
    async getTicketsForEvent(req, res, next) {
        try {
            // passes postman w/ CORRECT endpoint
            const ticketHolders = await ticketsService.getTicketsForEvent(req.params.eventId)
            res.send(ticketHolders)
        } catch (error) {
            next(error)
        }

    }

    async getCommentsInEvent(req, res, next) {
        try {
            const comments = await commentsService.getCommentsInEvent(req.params.eventId)
            res.send(comments)
        } catch (error) {
            next(error)
        }
    }
}