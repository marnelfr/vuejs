import { createRouter, createWebHistory } from "vue-router";
import EventList from "@/views/EventList.vue";

const routes = [
  {
    path: "/",
    name: "EventList",
    component: EventList,
    props: (router) => ({ page: Number.parseInt(router.query.page) || 1 }),
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "@/views/About.vue"),
  },
  {
    path: "/event/:id",
    name: "EventDetails",
    component: () =>
      import(/* webpackChunkName: "details" */ "@/views/EventDetails.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
