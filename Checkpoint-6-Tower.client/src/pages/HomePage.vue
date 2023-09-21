<template>
  <section class="container">

    <!-- <div class="home flex-grow-1 d-flex flex-column align-items-center justify-content-center">
      <div class="home-card p-5 bg-white rounded elevation-3">
      <img src="https://bcw.blob.core.windows.net/public/img/8600856373152463" alt="CodeWorks Logo"
      class="rounded-circle">
      <h1 class="my-5 bg-dark text-white p-3 rounded text-center">
        Vue 3 Starter
      </h1>
    </div>
  </div> -->
<EventForm />
  <section class="row">
    Yo, new row!
    <div class="rounded my-2">

      <img src="https://images.unsplash.com/photo-1582091652153-eb8f55ff7cd9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" class="rounded cover-img elevation-2">
    </div>
  </section>

  <nav class="row justify-content-around my-3">
        <button class="frosted-card btn col-2 btn-outline-light" @click="filterBy = ''">All</button>
<span style="display: inline-block; width:0px; height:100%; background:rgb(205, 205, 205); margin:0 2px"></span>        
        <button class="frosted-card btn col-2 btn-outline-light" @click="filterBy = 'concert'">Concerts</button>
        <button class="frosted-card btn col-2 btn-outline-light" @click="filterBy = 'convention'">Conventions</button>
        <button class="frosted-card btn col-2 btn-outline-light" @click="filterBy= 'sport'">Sports</button>
        <button class="frosted-card btn col-2 btn-outline-light" @click="filterBy = 'digital'">Digital</button>
        <!-- <button class="btn col-2 btn-outline-light" @click="filterBy = 'misc'">Misc</button> -->
  </nav>
  
  <section class="row">
    <div v-for="event in events" :key="event.id" class="col-6 col-md-3">
      {{ event.name }}
      <EventCard :event="event" />
    </div>
  </section>
</section>
</template>

<script>
import { computed, onMounted } from 'vue';
// import { EventCard } from '../components/EventCard.vue';
import { eventsService } from '../services/EventsService.js';
import Pop from '../utils/Pop.js';
import {AppState} from '../AppState.js'
import EventCard from '../components/EventCard.vue';
import { logger } from '../utils/Logger.js';



export default {
    setup() {
      onMounted(()=> {
        getEvents();
      })

async function getEvents(){
  // REMEMBER THE TRY-CATCH
  try {
    await eventsService.getEvents()
    logger.log('did events come back?')
  } catch (error) {
    Pop.error(error)
  }
}

        return {
events: computed(()=> AppState.towerEvents)

        };
    },
    components: { EventCard }
}
</script>

<style scoped lang="scss">
.home {
  display: grid;
  height: 80vh;
  place-content: center;
  text-align: center;
  user-select: none;

  .home-card {
    width: 50vw;

    >img {
      height: 200px;
      max-width: 200px;
      width: 100%;
      object-fit: contain;
      object-position: center;
    }
  }
}
.cover-img{
  height: 18vh;
  width: 100%;
  object-fit: cover;
  object-position: center;
// elevation-2 settings
  box-shadow: 0 3px 3px -1px rgba(205, 205, 205, 0.2), 
  0 5px 6px 0 rgba(205, 205, 205, 0.14), 
  0 1px 8px 0 rgba(205, 205, 205, 0.12);
}

.frosted-card{
  backdrop-filter: blur(3px);
    background-color: rgba(145, 147, 150, 0.455);
}
.frosted-card:hover{
  backdrop-filter: blur(3px);
    background-color: rgba(218, 218, 218, 0.925);
    border: 0;
    box-shadow: 0 0 10px 2px rgb(218, 218, 218);
    transition: .35s ease;
}
</style>
