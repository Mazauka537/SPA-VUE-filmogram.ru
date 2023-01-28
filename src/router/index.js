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
  {
    path: '/user/:id(\\d+)',
    component: () => import('@/components/views/ViewProfile'),
    children: [
      {
        name: 'profile',
        path: '',
        component: () => import('@/components/views/ViewCollections')
      },
      {
        name: 'saves',
        path: 'saves',
        component: () => import('@/components/views/ViewSaves')
      },
      {
        name: 'subscribers',
        path: 'subscribers',
        component: () => import('@/components/views/ViewProfile')
      },
      {
        name: 'subscriptions',
        path: 'subscriptions',
        component: () => import('@/components/views/ViewProfile')
      }
    ]
  },
  {
    name: 'collection',
    path: '/collection/:id',
    component: () => import('@/components/views/ViewCollection')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
