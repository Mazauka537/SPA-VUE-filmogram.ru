import { createStore } from 'vuex'
import {authModule} from "@/store/authModule";
import {notificationModule} from "@/store/notificationModule";

export default createStore({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    auth: authModule,
    notifications: notificationModule
  }
})
