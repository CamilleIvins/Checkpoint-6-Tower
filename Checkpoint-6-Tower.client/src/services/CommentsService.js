import { AppState } from "../AppState.js"
import { Comment } from "../models/Comment.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class CommentsService{

    async createComment(commentData){
        const res = await api.post('api/comments', commentData)
        logger.log('[CREATE COMMENTS]', res.data)
        // AppState.activeEventComments.push(new Comment(res.data))
    }
}

export const commentsService = new CommentsService()