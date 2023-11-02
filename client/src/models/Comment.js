export class Comment {
    constructor(data){
        this.id = data.id
        this.body = data.body
        this.creator = data.creator
        this.eventId = data.eventId
        this.creatorId = data.creatorId
        this.creadtedAt = new Date(data.creadtedAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}