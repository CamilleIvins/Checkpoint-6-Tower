import { AppState } from '../AppState.js';
import { logger } from '../utils/Logger.js';
import{api} from './AxiosService.js'
class EventsService {
async createEvent(eventData){
    logger.log('create method can be called', eventData)
    const res = await api.post('api/events', eventData)
    const newEvent = new Event(res.data)
    AppState.TowerEvent.unshift(newEvent)
}
}

export const eventsService = new EventsService