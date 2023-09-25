<template>
  <div class="container">
  <div class="about text-center text-light">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div class="text-light">
    <h5>
      Here are the events you have plans to attend:
    </h5>
    <!-- TODO place our tickets here ... so maybe tickets should go in a component?? OR call this through the events -->
    <div v-for="ticket in tickets" :key="ticket.id">
<!-- 
        <div class="d-flex justify-content-between">
          <router-link :to="{ name: 'Event', params: { eventId: ticket.event.id }}">
            <img class="py-1" :src="ticket.event.coverImg" alt="">
    </router-link>
    <span class=" d-flex align-items-center">
      {{ ticket.event.name }}
    </span> -->

        <div v-if="ticket.creatorId == account.id">
         {{ ticket.eventId.coverImg }}
{{ ticket.eventId.name }}
{{ ticket.eventId.startDate }} 

        </div>

      </div> 
  </div>
    <div class="row">
    <h5>
      Here are the events made:
    </h5>
    <!-- TODO place our tickets here ... so maybe tickets should go in a component?? OR call this through the events -->
    <div class="row">
      <div v-for="event in events" :key="event.id" class="col-6 col-md-3">
      <!-- {{ event.name }} -->
      <EventCard :event="event" />
    </div>
    
      </div>
    </div>
  </div>
</template>

<script>
import { computed, onMounted,} from 'vue';
import { AppState } from '../AppState';
import EventCard from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import { ticketsService } from '../services/TicketsService.js';
import { logger } from '../utils/Logger.js';
import Pop from '../utils/Pop.js';
import { useRoute } from 'vue-router';



export default {
  setup() {
    const route = useRoute()

    onMounted(()=> {
        getEvents();
        getTicketsByAccount()
      });

async function getEvents(){
  // REMEMBER THE TRY-CATCH
  try {
    await eventsService.getEvents()
    logger.log('did events come back?')
  } catch (error) {
    Pop.error(error)
  }
}

async function getTicketsByAccount(){
            try {
              const accountId = AppState.account.id
                await ticketsService.getTicketsByAccount(accountId)
            } catch (error) {
                Pop.error(error)
            }
        }
    return {
      account: computed(() => AppState.account),
      events: computed(() => AppState.towerEvents.filter(tower => tower.creatorId == AppState.account.id)),
      tickets: computed(()=> AppState.activeEventTickets),
      // these all show up as your events
      // OwnEvents: computed(() => AppState.towerEvents.filter(e => e.creatorId == AppState.account.id)),
      // toAttend: computed(() => AppState.myTickets)
      // TODO computed to get MY TICKETS look at the server for 'account/tickets'
    }
  },
  components: {EventCard }

}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
