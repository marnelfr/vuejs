<template>
  <div v-if="event">
    <h1>{{ event.title }}</h1>

    <div class="nav">
      <router-link :to="{ name: 'EventDetails', params: { id } }"
        >Details</router-link
      >
      <router-link :to="{ name: 'EventRegister', params: { id } }"
        >Register</router-link
      >
      <router-link :to="{ name: 'EventEdit', params: { id } }"
        >Edit</router-link
      >
    </div>

    <p>Register for event here</p>
  </div>
  <div v-else>
    <p>Loading...</p>
  </div>
</template>
<script>
import EventService from '@/services/EventService'

export default {
  name: 'EventDetails',
  props: ['id'],
  data() {
    return {
      event: null,
    }
  },
  created() {
    EventService.getEvent(this.id)
      .then((response) => (this.event = response.data))
      .catch((error) => console.log(error))
  },
}
</script>
<style scoped>
.nav a {
  flex: 1;
  text-decoration: none;
  color: black;
  margin: 15px;
}
</style>
