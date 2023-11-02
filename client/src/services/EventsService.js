import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import{api} from './AxiosService.js';
// IMPORT MODEL SO THAT IT CAN USE IT WHEN CREATING...AND INSTANCE
import { Event } from '../models/Event.js';
import { Comment } from '../models/Comment.js';
import { Ticket } from '../models/Ticket.js';

class EventsService {
async createEvent(eventData){
    logger.log('create method can be called', eventData)
    const res = await api.post('api/events', eventData)
    const newEvent = new Event(res.data)
    AppState.towerEvents.unshift(newEvent)
    return newEvent
}

async getEvents(){
    const res = await api.get('api/events')
    logger.log('got events', res.data)

    AppState.towerEvents = res.data.map(towerEvent => new Event(towerEvent))
    logger.log('do events show?')
}

async getEventById(eventId){
    const res= await api.get(`api/events/${eventId}`)
    logger.log(`Here is your selected event`, res.data)
    logger.log(res.data.creator)
    // appstate location doesn't match what we put in the appstate
    // AppState.ActiveEvent = new Event(res.data)
    AppState.activeEvent = new Event(res.data)
}

async cancelEvent(eventId){
    // const res = await this.getEventById(eventId)
    // const res = await api.put(`api/events/${eventId}`)
    const res = await api.delete(`api/events/${eventId}`)
    logger.log("event to cancel", res.data.isCanceled)
// AppState.activeEvent = res
    // res.data.isCanceled = true
    // res.data.isCancelled = true
    // res.data.isCanceled = !res.data.isCanceled
    // res.data.isCancelled = !res.data.isCancelled
    // if(res.data.isCancelled && res.data.isCanceled == false){
    //    res.data.isCanceled = true
    //    res.data.isCancelled = true
    // } else {AppState.activeEvent.isCancelled = true}{
    //     res.data.isCanceled = false
    //    res.data.isCancelled = false
    // }
    // logger.log("event cancelled", res.data.isCanceled)
    // const towerIndex = AppState.towerEvents.findIndex(event => event.id == eventId)
    // const updatedEvent = new Event(res.data)
    // AppState.activeEvent = new Event(updatedEvent)

    // return updatedEvent
}

async createComment(eventComment){
    // const res = await api.post(`api/events/${eventId}/comments`, eventComment)
    // AppState.activeEvent = eventId
    const res = await api.post(`api/comments`, eventComment)
    logger.log('added comment', res.data)
    AppState.activeEventComments.push(new Comment(res.data))
}
// ANSWER IS IN HERE, DO NOT CHANGE TO EVENT ENDPOINTS
// async createPicture(){
//     try {
//       logger.log(pictureData.value, AppState.activeAlbum.id, route.params.albumId)
//       pictureData.value.albumId = route.params.albumId // assigns the album's id to the pictureData
//       // NOTE we need to send ONE object with all the data included on it. not separate pieces of info
//       await picturesService.createPicture(pictureData.value)
//       Pop.toast('Added picture', 'success', 'center-end')
//       pictureData.value = {}
//       Modal.getOrCreateInstance('#create-picture').hide()
//     } catch (error) {
//       Pop.error(error)
//     }
//   }
//  }
// }


async getCommentsInEvent(eventId){
    logger.log(eventId)
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('comments should load', res.data)
    AppState.activeEventComments = res.data.map(comm => new Comment(comm))
}


async deleteComment(deletedCommentId){
    logger.log(deletedCommentId)
    await api.delete(`api/comments/${deletedCommentId}`)

    // const deletedCommentIndex = AppState.activeEventComments.findIndex(comment => comment.id == deletedCommentId)
    // AppState.activeEventComments.splice(deletedCommentIndex,1)
    AppState.activeEventComments = AppState.activeEventComments.filter(c => c.id !=deletedCommentId)
}


// async deleteComment(commentId){
//     const activeComment= await AppState.activeEventComments.findIndex(comment => comment.id == commentId)
//     const deletedCommentIndex =  activeComment
//     logger.log(commentId)
//     await api.delete(`api/comments/${activeComment}`)
//     AppState.activeEventComments.splice(deletedCommentIndex,1)
// }
async getTicketsByEventId(eventId){
    const res = await api.get(`api/events/${eventId}/tickets`)
    logger.log('ticket data', res.data)
    AppState.activeEventTickets = res.data.map(ticket => new Ticket(ticket))
}

}

export const eventsService = new EventsService