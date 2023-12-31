import { dbContext } from "../db/DbContext.js"
import { BadRequest, Forbidden } from "../utils/Errors.js"
import { logger } from "../utils/Logger.js";


class EventsService {

    async getEvents(query) {
        const events = await dbContext.Events.find(query).sort('-startDate').populate('creator ticketCount')
        return events
    }
    async getEventById(eventId) {
        const targetEvent = (await dbContext.Events.findById(eventId)).populate('creator ticketCount')
        if (!targetEvent) {
            throw new BadRequest(`No event with id: ${eventId}`)
        }
        return targetEvent
    }
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        // ALL creates await pop
        await event.populate('creator ticketCount')
        //send something back
        return event
    }

    async editEvent(eventId, updates, eventLead) {
        const originalEvent = await dbContext.Events.findById(eventId)
        // const userId = await dbContext.Account
        // const eventOwner = await this.createEvent(eventId.creatorId)


        if (originalEvent.creatorId != eventLead) {
            throw new Forbidden(`You cannot change that which you did not create`)
        }

        if (!originalEvent) {
            throw new BadRequest(`This event with id ${eventId} has not been located`)
        }
        if (originalEvent.isCanceled == true) {
            throw new BadRequest(`This event with id ${eventId} has not been located`)

        }
        // pipe operators will NOT  work for BOOLEAN
        originalEvent.name = updates.name || originalEvent.name
        originalEvent.description = updates.description || originalEvent.description

        if (originalEvent.isCanceled == false) { updates.isCanceled = true }
        else { updates.isCanceled = false }
        // non-creator should not be able to edit
        // if(userId != eventOwner)
        await originalEvent.save()
        return originalEvent
    }

    async cancelEvent(eventId, userId) {
        const event = await this.getEventById(eventId)
        if (event.creatorId != userId) {
            throw new Forbidden(`You shall not be a killjoy!!!!!`)
        }

        event.isCanceled = !event.isCanceled
        event.isCancelled = !event.isCancelled
        await event.save()
        return event
    }

    async getCommentsInEvent(eventId) {
        await eventsService.getEventById(eventId)

        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator event')

        return comments
    }

    // async deleteComment(commentId, userId) {
    //     const nixComment = await dbContext.Comments.findById(commentId).populate('creator event')
    //     logger.log('comment to be deleted', nixComment)
    //     if (nixComment.creatorId != userId) {
    //         throw new Forbidden("Not your words to revoke")
    //     }
    //     await nixComment.remove()
    // }


}
export const eventsService = new EventsService()