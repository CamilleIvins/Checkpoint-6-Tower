import { dbContext } from "../db/DbContext.js"
import { eventsService } from "../services/EventsService.js";


class CommentsService {
    async createComment(commentBody) {
        const comment = await dbContext.Comments.create(commentBody)
        await comment.populate('creator event')
        return comment
    }

    async getCommentsInEvent(eventId) {
        await eventsService.getEventById(eventId)

        const comments = await dbContext.Comments.find({ eventId: eventId }).populate('creator event')

        return comments
    }
}

export const commentsService = new CommentsService()