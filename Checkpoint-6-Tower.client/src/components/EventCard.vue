<template>
    <div class="component">
<div class="towerEvent-teaser">
    <img :src="towerEvent.coverImg" alt="">
</div>
<div class="frosted-card">
    <p>{{ towerEvent.name }}</p>
    <p>{{ towerEvent.location }}</p>
    <p>{{ towerEvent.startDate }}</p>
    <p class="text-end">{{ towerEvent.capacity }}</p>
    <p v-if="towerEvent.isCanceled == true" class="bg-danger">Event Cancelled</p>
</div>

    </div>
</template>


<script>
import { AppState } from '../AppState';
import { computed, reactive, onMounted } from 'vue';
export default {
    setup(){
    return {  }
    }
};
</script>


<style lang="scss" scoped>

</style>