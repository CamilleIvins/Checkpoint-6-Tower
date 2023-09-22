import { dbContext } from "../db/DbContext.js"
import { eventsService } from "../services/EventsService.js";
import { Forbidden } from "../utils/Errors.js";
import { logger } from "../utils/Logger.js";


class CommentsService {
    async deleteComment(commentId, userId) {
        const nixComment = await dbContext.Comments.findById(commentId).populate('creator event')
        logger.log('comment to be deleted', nixComment)
        if (nixComment.creatorId != userId) {
            throw new Forbidden("Not your words to revoke")
        }
        await nixComment.remove()
    }
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