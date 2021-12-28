import { createRouter, createWebHistory } from 'vue-router'
import EventList from '@/views/EventList.vue'

const routes = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (router) => ({ page: Number.parseInt(router.query.page) || 1 }),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/About.vue'),
  },
  {
    path: '/event/:id',
    name: 'EventLayout',
    component: () =>
      import(/* webpackChunkName: "details" */ '@/views/event/Layout.vue'),
    props: true,
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: () =>
          import(/* webpackChunkName: "details" */ '@/views/event/Details.vue'),
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: () =>
          import(
            /* webpackChunkName: "details" */ '@/views/event/Register.vue'
          ),
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: () =>
          import(/* webpackChunkName: "details" */ '@/views/event/Edit.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
