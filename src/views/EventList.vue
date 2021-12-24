<template>
  <div>
    <h1>Events list</h1>
    <div v-if="events" class="events">
      <EventCard v-for="event in events" :key="event.id" :event="event" />
    </div>
    <div v-else>
      <p>Loading...</p>
    </div>
    <div class="pagination">
      <router-link
        id="prev-link"
        v-if="page > 1"
        :to="{ name: 'EventList', query: { page: page - 1 } }"
        rel="prev"
      >
        &#60; Previous
      </router-link>
      <router-link
        id="next-link"
        v-if="hasNextPage"
        :to="{ name: 'EventList', query: { page: page + 1 } }"
        rel="next"
      >
        Next &#62;
      </router-link>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import EventCard from "@/components/EventCard.vue";
import EventService from "@/services/EventService.js";
import { watchEffect } from "vue";

export default {
  name: "EventList",
  props: ["page"],
  components: {
    EventCard,
  },
  data() {
    return {
      events: null,
      totalEvent: 0,
    };
  },
  created() {
    watchEffect(() => {
      this.events = null;
      EventService.getEventList(this.page)
        .then((response) => {
          this.events = response.data;
          this.totalEvent = response.headers["x-total-count"];
          console.log(this.totalEvent);
        })
        .catch((error) => {
          console.log("error", error);
        });
    });
  },
  computed: {
    hasNextPage() {
      const totalPage = Math.ceil(this.totalEvent / 2);
      return this.page < totalPage;
    },
  },
};
</script>

<style scoped>
.events {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pagination {
  display: flex;
  text-align: center;
}
.pagination a {
  flex: 1;
}
#prev-link {
  float: left;
}
#next-link {
  float: right;
}
</style>
