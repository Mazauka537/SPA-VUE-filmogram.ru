import {createRouter, createWebHistory} from 'vue-router'

const routes = [
  {
    name: 'auth',
    path: '/auth',
    component: () => import('@/components/views/ViewAuth'),
  },
  {
    name: 'logout',
    path: '/logout',
    component: () => import('@/components/views/ViewLogout')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
