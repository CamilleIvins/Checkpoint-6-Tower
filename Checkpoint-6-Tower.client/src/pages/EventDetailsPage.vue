<template>
    <div class="container">
        <div class="text-light">
            Welcome!
            <p class="m-0">
                Here are some details on {{ event.name }}
            </p>
        </div>
        <!-- event card (w/ attend confirm) -->
        <section v-if="event" class="row">
            <div class="col-12 frosted-card">

                <!-- event photo -->
                <div class="col-5">
                    <img class="cover-img" :src="event.coverImg" :alt="event.name + 'cover image'">
                </div>
                <!-- event details, 3 rows: title, time / description/ spots left & attend button -->
                <div class="col-7">
</div>
    <!-- 2 div: name, p: place/ date/time -->
    <div class="row justify-content-between">
<div>
    <!-- h3? title -->
    <!-- location -->
    <p>

    </p>
</div>
<div>

</div>
    </div>

</div>
        </section>


        <!-- attendees section -->
        <section class="row">

        </section>

        <!-- comments section -->
    <!-- look at hackathons -->
        <section class="row">


        </section>
    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import { logger } from '../utils/Logger.js';
export default {
// PAGES DON'T TAKE IN PROPS

    setup(){
        // don't forget ()
        const route = useRoute()
        watchEffect(()=> {
            getEventById()
            getCommentsInEvent()
        })
        async function getEventById(){
            try {
                // const eventId = route.params.eventId
                await eventsService.getEventById(route.params.eventId)
                
            } catch (error) {
                logger.log(error)
                Pop.error(error)
                
            }
        }
      
        async function getCommentsInEvent(){
            try {
                const eventId = route.params.eventId
                logger.log(route.params.eventId)
                await eventsService.getCommentsInEvent(eventId)
                
            } catch (error) {
                Pop.error("Wherefore dost thou err, oh wordless quip?",error)
                
            }
        }
       
    return { 
event : computed(()=> AppState.activeEvent),
user: computed(()=> AppState.user)

     }
    }
};
</script>


<style lang="scss" scoped>

.cover-img{
    padding: 1em;
  height: 20vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
// elevation-2 settings
  box-shadow: 0 3px 3px -1px rgba(205, 205, 205, 0.2), 
  0 5px 6px 0 rgba(205, 205, 205, 0.14), 
  0 1px 8px 0 rgba(205, 205, 205, 0.12);
}

.frosted-card{
//   backdrop-filter: blur(7px);
    background-color: rgba(145, 147, 150, 0.455);
}
</style>