import useRequestMaker from "@/composables/useRequestMaker";

const requestMaker = useRequestMaker()

export const collectionsModule = {
  state: () => ({
    collections: [],
    isLoading: false,
  }),
  getters: {},
  mutations: {
    startLoad(state) {
      state.isLoading = true
    },
    finishLoad(state) {
      state.isLoading = false
    },
    setCollections(state, collections) {
      state.collections = collections
    }
  },
  actions: {
    async loadCollections({commit}) {
      commit('startLoad')
      commit('setCollections', [])

      const response = await requestMaker.fetch('get/nav/collections', 'GET', {}, [200, 401])

      if (response.status === 200) {
        commit('setCollections', await response.json())
      }

      commit('finishLoad')
    }
  },
  namespaced: true
}
