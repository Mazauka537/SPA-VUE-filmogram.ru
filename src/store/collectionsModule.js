import useRequestMaker from "@/composables/useRequestMaker";

const requestMaker = useRequestMaker()

export const collectionsModule = {
  state: () => ({
    collections: [],
    isLoading: false,
  }),
  mutations: {
    startLoad(state) {
      state.isLoading = true
    },
    finishLoad(state) {
      state.isLoading = false
    },
    setCollections(state, collections) {
      state.collections = collections
    },
    addCollection(state, collection) {
      const favCollection = state.collections.shift()
      state.collections.unshift(collection)
      state.collections.unshift(favCollection)
    },
    replaceCollection(state, collection) {
      const index = state.collections.findIndex(value => value.id === collection.id)
      state.collections[index] = collection
    },
    removeCollection(state, collectionId) {
      const index = state.collections.findIndex(value => value.id === collectionId)
      state.collections.splice(index, 1)
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
