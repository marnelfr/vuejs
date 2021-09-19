import { createRouter, createWebHistory } from "vue-router";
import EventList from "../views/EventList.vue";

const routes = [
  {
    path: "/",
    name: "event-list",
    component: EventList,
  },
  {
    path: "/show",
    name: "event-show",
    component: () => import(/* webpackChunkName: "event-show" */ "../views/EventShow.vue"),
  },
  {
    path: '/show-it',
    redirect: {name: 'event-show'}
  },
  {
    path: "/create",
    name: "event-create",
    component: () => import(/* webpackChunkName: "event-create" */ "../views/EventCreate")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
