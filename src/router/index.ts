import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import PeoplesView from '../views/PeoplesView.vue'
import PeopleView from '../views/PeopleView.vue'
import FavoritesView from '../views/FavoritesView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/favorites',
    name: 'favorites',
    component: FavoritesView
  },
  {
    path: '/peoples',
    name: 'peoples',
    component: PeoplesView,

    children: [
      {
        path: '/peoples/:id',
        component: PeopleView
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
