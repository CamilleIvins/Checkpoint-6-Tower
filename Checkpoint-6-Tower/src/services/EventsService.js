import { dbContext } from "../db/DbContext.js"

class EventsService {
    async createEvent(eventBody) {
        const event = await dbContext.Events.create(eventBody)
        // ALL creates await pop
        await event.populate('creator')
        //send something back
        return event
    }

}

export const eventsService = new EventsService