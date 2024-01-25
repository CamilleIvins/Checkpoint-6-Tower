<template>
    <router-link :to="{ name: 'Event Details', params: { eventId: event.id } }">
        <!-- <router-link :to="{path: `events/${event.id}`}"> -->
        <!-- code did not like this ⬆️ -->
        <div v-if="event.isCancelled == false" class="component my-2">
            <div class="event-teaser position-relative">
                <img :src="event.coverImg" alt="">
                <div class="frosted-card text-light p-1">
                    <p class="">{{ event.name }}</p>
                    <p>{{ event.location }}</p>
                    <!-- <p>{{ event.startDate }}</p> -->
                    <p>{{ new Date(event.startDate).toLocaleDateString() }}</p>
                    <p class="text-end pe-2">Capacity: {{ event.capacity }}</p>
                    <p v-if="event.isCanceled == true" class="bg-danger">Event Cancelled</p>
                </div>
            </div>

        </div>

        <div v-else class="component my-2">
            <div class="event-cancelled position-relative">
                <img :src="event.coverImg" alt="">
                <div class="frosted-card text-light p-1">
                    <h3 class="text-danger fw-bold">CANCELLED</h3>
                    <!-- <p class="">{{ event.name }}</p>
                    <p>{{ event.location }}</p> -->
                    <!-- <p>{{ event.startDate }}</p> -->
                    <p>{{ new Date(event.startDate).toLocaleDateString() }}</p>
                    <p class="text-end pe-2">Capacity: {{ event.capacity }}</p>
                    <p v-if="event.isCanceled == true" class="bg-danger">Event Cancelled</p>
                </div>
            </div>

        </div>
    </router-link>
</template>


<script setup>
const props = defineProps({ event: Object })
// import { AppState } from '../AppState';
// import { computed, reactive, onMounted } from 'vue';
// import { Event } from '../models/Event.js';

</script>


<style lang="scss" scoped>
.event-teaser {
    img {
        border-radius: 15px;
        height: 30vh;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.event-teaser:hover {
    border-radius: 15px;
    box-shadow: 0 0 10px 2px rgb(218, 218, 218);
    transform: scale(1.03);
    transition: 0.35s ease;
}

.event-cancelled {
    img {
        border-radius: 15px;
        height: 30vh;
        width: 100%;
        object-fit: cover;
        object-position: center;
        filter: grayscale(90%)
    }
}

.event-cancelled:hover {
    border-radius: 15px;
    box-shadow: 0 0 10px 2px rgb(218, 218, 218);
    transform: scale(1.03);
    transition: 0.35s ease;
    background-color: #e8101081;

}

.frosted-card {
    backdrop-filter: blur(5px);
    background-color: rgba(145, 147, 150, 0.455);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    bottom: 0;
    position: absolute;
    width: 100%;
}

p {
    margin: 0;
}
</style>