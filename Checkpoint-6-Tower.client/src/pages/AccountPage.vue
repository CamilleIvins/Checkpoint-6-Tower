<template>
  <div class="about text-center">
    <h1>Welcome {{ account.name }}</h1>
    <img class="rounded" :src="account.picture" alt="" />
    <p>{{ account.email }}</p>
  </div>

  <div>
    <!-- TODO place our tickets here ... so maybe tickets should go in a component?? OR call this through the events -->
  </div>
</template>

<script>
import { computed } from 'vue';
import { AppState } from '../AppState';
export default {
  setup() {
    return {
      account: computed(() => AppState.account)
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
