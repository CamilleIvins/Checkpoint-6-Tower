import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import{api} from './AxiosService.js';
// IMPORT MODEL SO THAT IT CAN USE IT WHEN CREATING...AND INSTANCE
import { Event } from '../models/Event.js';

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
    AppState.ActiveEvent = new Event(res.data)
}

async getCommentsInEvent(eventId){
    logger.log(eventId)
    const res = await api.get(`api/events/${eventId}/comments`)
    logger.log('comments should load', res.data)
    AppState.activeEventComments = res.data.map(comm => new Comment(comm))
}

}

export const eventsService = new EventsService