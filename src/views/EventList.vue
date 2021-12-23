<template>
  <div>
    <h1>Events list</h1>
    <div v-if="events !== null" class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import EventCard from '@/components/EventCard.vue'
import EventService from '@/services/EventService.js'

export default {
  name: 'EventList',
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
    }
  },
  created() {
    EventService.getEventList()
      .then((response) => {
        this.events = response.data
      })
      .catch((error) => {
        console.log('error', error)
      })
  },
}
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
