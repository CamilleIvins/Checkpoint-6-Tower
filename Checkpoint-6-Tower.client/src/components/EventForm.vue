<template>
    <div class="container-fluid">
<button @click.prevent="createEvent">
    Press to test
</button>

<form @submit.prevent="createEvent" class="row">

    <div class="mb-1 col-6">
          <label class="text-light" for="event-name">Event Title</label>
          <input v-model="eventData.name" id="event-name" class="form-control" type="text" minlength="5" maxlength="55" placeholder="Event Title" required>
        </div>

        <div class="mb-1 col-6">
            <label class="text-light" for="event-type">Event Category</label>
            <select v-model="eventData.type" id="event-type" class="form-control" placeholder="Event Category">
            <option disabled selected value="">Please select a category</option>

            <option value="concert">Concert</option>
            <option value="convention">Convention</option>
            <option value="sport">Sport</option>
            <option value="digital">Digital</option>
            </select>
        </div>
        <div class="mb-1 col-12">
            <label class="text-light" for="event-cover">Cover Image</label>
            <input v-model="eventData.coverImg" type="url" id="event-cover" class="form-control" minlength="5" maxlength="250" placeholder="Event Cover URL">
        </div>
        <div class="mb-1 col-12">
            <img :src="eventData.coverImg" alt="" class="img-fluid preview-img">
        </div>
        <div class="mb-1 col-2">
            <label for="event-startDate" class="text-light">Event Date</label>
            <input v-model="eventData.startDate" type="date" id="event-startDate" class="form-control" placeholder="Event Date">

        </div>
        <div class="mb-1 col-2">
            <label for="event-capacity" class="text-light">Capacity</label>
            <input v-model="eventData.capacity" type="number" id="event-capacity" class="form-control" maxlength="5" placeholder="Attendee Limit">

        </div>
        <div class="mb-1 col-4">
            <label for="event-location" class="text-light">Location</label>
            <input v-model="eventData.location" type="text" id="event-location" class="form-control" maxlength="100" placeholder="Location">

        </div>
        <div class="mb-1 col-12">
            <label for="event-description" class="text-light">Event Description</label>
            <textarea v-model="eventData.description" type="number" id="event-description" class="form-control" maxlength="1000" cols="30" rows="10" placeholder="Event Description"></textarea>

        </div>
        <div class="col-12 text-end">
            <button class="btn text-light">SUBMIT</button>
        </div>

</form>

    </div>
</template>


<script>
import { useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import {eventsService} from '../services/EventsService.js'
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
import { Modal } from 'bootstrap';
export default {
    setup(){
        const eventData = ref({})
        const router = useRouter()
        function resetForm(){
        eventData.value = {category:''}
}
        onMounted(()=>{
            resetForm()
        })

    return { 
        eventData,
        async createEvent(){
            // remember to try-catch these
            try {
                logger.log("create button pushed")
                 let newEvent = await eventsService.createEvent(eventData.value)
            Pop.toast('Event created', 'Well done!')
            resetForm()
            // Modal.getOrCreateInstance('#create-event').hide()
            // router.push({name: 'Event Details', params:{eventId: newEvent.id}})

            } catch (error) {
                Pop.error(error.message)
            }
           
        }
     }
    }
};
</script>


<style lang="scss" scoped>
.preview-image{
  max-height: 15vh;
  object-fit: contain;
}
</style>