<template>
    <div class="container-fluid">


    </div>
</template>


<script>
import { useRouter } from 'vue-router';
import { AppState } from '../AppState';
import { computed, reactive, onMounted, ref } from 'vue';
import {eventsService} from '../services/EventsService.js'
import Pop from '../utils/Pop.js';
export default {
    setup(){

const eventData = ref({})
const router = useRouter()
function resetForm(){
    eventData.value = {category:''}
}

    return { 
        eventData,
        async createEvent(){
            // remember to try-catch these
            try {
                 let newEvent = await eventsService.createEvent(eventData.value)
            Pop.toast('Event created', 'Well done!')
            resetForm()

            } catch (error) {
                Pop.error(error.message)
            }
           
        }
     }
    }
};
</script>


<style lang="scss" scoped>

</style>