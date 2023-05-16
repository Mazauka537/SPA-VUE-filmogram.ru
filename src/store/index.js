import { createStore } from 'vuex'
import {authModule} from "@/store/authModule";
import {notificationModule} from "@/store/notificationModule";
import {collectionsModule} from "@/store/collectionsModule";

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
    notifications: notificationModule,
    collections: collectionsModule
  }
})
