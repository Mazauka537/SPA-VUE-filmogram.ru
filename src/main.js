import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import VIntersection from "@/directives/VIntersection";

const app = createApp(App)

app.directive('intersection', VIntersection)

app.use(store).use(router)

store.dispatch('auth/checkAuth').then(() => {
  app.mount('#app')
})
