<template>
    <div class="component">
<div class="event-teaser">
    <img :src="event.coverImg" alt="">
</div>
<div class="frosted-card">
    <p>{{ event.name }}</p>
    <p>{{ event.location }}</p>
    <p>{{ event.startDate }}</p>
    <p class="text-end">{{ event.capacity }}</p>
    <p v-if="event.isCanceled == true" class="bg-danger">Event Cancelled</p>
</div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
import { Event } from '../models/Event.js';

export default {
props: {event: {type: Event || Object, required: true}},

    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>
.event-teaser{
    img{

        height: 30vh;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }
}
</style>