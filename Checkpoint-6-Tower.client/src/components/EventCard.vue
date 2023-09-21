<template>
    <div class="component">
<div class="event-teaser">
    <img :src="event.coverImg" alt="">
    <div class="frosted-card">
            <p>{{ event.name }}</p>
            <p>{{ event.location }}</p>
            <p>{{ event.startDate }}</p>
            <p class="text-end pe-2">{{ event.capacity }}</p>
            <p v-if="event.isCanceled == true" class="bg-danger">Event Cancelled</p>
    </div>
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
border-radius: 15px;
        height: 30vh;
        width: 100%;
        object-fit: cover;
        object-position: center;
    }
}

.frosted-card{
  backdrop-filter: blur(3px);
    background-color: rgba(145, 147, 150, 0.455);
    border-bottom-left-radius: 15px;
    border-bottom-right-radius: 15px;
    bottom: 0;
}
p {
    margin: 0;
}
</style>