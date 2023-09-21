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
    AppState.TowerEvent.unshift(newEvent)
}

async getEvents(){
    const res = await api.get('api/events')
    logger.log('got events', res.data)

    AppState.towerEvents = res.data.map(towerEvent => new Event(towerEvent))
    logger.log('do events show?')
}


}

export const eventsService = new EventsService