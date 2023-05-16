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
    name: 'profile',
    path: '/user/:id(\\d+)/',
    component: () => import('@/components/views/ViewProfile'),
  },
  {
    name: 'search',
    path: '/search',
    component: () => import('@/components/views/ViewSearch')
  },
  {
    name: 'collection',
    path: '/collection/:id',
    component: () => import('@/components/views/ViewCollection'),
  },
  // {
  //   name: 'default-collection',
  //   path: '/default/collection/:id',
  //   component: () => import('@/components/views/ViewDefaultCollectionSuspense')
  // },
  {
    name: 'collections',
    path: '/user/:id(\\d+)/collections',
    component: () => import('@/components/views/ViewCollections')
  },
  {
    name: 'saves',
    path: '/user/:id(\\d+)/saves',
    component: () => import('@/components/views/ViewSaves')
  },
  {
    name: 'subscribers',
    path: '/user/:id(\\d+)/subscribers',
    component: () => import('@/components/views/ViewSubscribers')
  },
  {
    name: 'subscriptions',
    path: '/user/:id(\\d+)/subscriptions',
    component: () => import('@/components/views/ViewSubscriptions')
  },
  {
    name: 'settings',
    path: '/settings',
    component: () => import('@/components/views/ViewSettings'),
  },
  {
    name: 'tests',
    path: '/tests',
    component: () => import('@/components/views/ViewTests')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
