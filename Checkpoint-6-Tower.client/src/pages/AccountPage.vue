<template>
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
    <div class="row">
      <div v-for="ticket in tickets" :key="ticket.id">
        <div v-if="ticket.creatorId == account.id">
         {{ ticket.eventId.coverImg }}
{{ ticket.eventId.title }}
{{ ticket.eventId.startDate }} 
<div v-for="event in events" :key="event.id" class="col-6 col-md-3">
      <!-- {{ event.name }} -->
      <EventCard :event="event" />
    </div>
        </div>

      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account),
      tickets: computed(()=> AppState.activeEventTickets),
      // TODO computed to get MY TICKETS look at the server for 'account/tickets'
    }
  }
}
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
