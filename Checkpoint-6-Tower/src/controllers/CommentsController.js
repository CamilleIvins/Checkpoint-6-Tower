import { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { commentsService } from "../services/CommentsService.js";



export class CommentsController extends BaseController {
    constructor() {
        super('api/comments')
        this.router
            .use(Auth0Provider.getAuthorizedUserInfo)
            .post('', this.createComment)
    }
    async createComment(req, res, next) {
        try {
            const commentBody = req.body
            commentBody.creatorId = req.userInfo.id
            const comment = await commentsService.createComment(commentBody)
            res.send(comment)
        } catch (error) {
            next(error)
        }

    }

}