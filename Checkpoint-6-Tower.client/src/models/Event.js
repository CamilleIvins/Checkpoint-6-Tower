

export class Event {

    constructor(data){
        this.id = data.id
        this.name = data.name
        this.creatorId = data.creatorId
        this.location = data.location
        this.coverImg = data.coverImg
        this.description = data.description
        this.startDate = data.startDate
        // this.startDate = new Date(data.startDate).toLocaleDateString()
        this.capacity = data.capacity
        this.isCancelled = data.isCancelled || data.isCanceled
        this.type = data.type
        this.createdAt = new Date(data.createdAt)
        this.updatedAt = new Date(data.updatedAt)
    }
}