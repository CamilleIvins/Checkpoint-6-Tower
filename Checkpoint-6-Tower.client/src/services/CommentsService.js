import { AppState } from "../AppState.js"
import { api } from "./AxiosService.js"

class CommentsService{

    async createComment(commentData){
        const res = await api.post('api/comments', commentData)
        AppState.activeEventComments.push(new Comment(res.data))
    }
}

export const commentsService = new CommentsService()