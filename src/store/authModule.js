import useRequestMaker from "@/composables/useRequestMaker";

const requestMaker = useRequestMaker()

export const authModule = {
  state: () => ({
    user: undefined
  }),
  getters: {
    isOwner: state => userId => {
      return state.user?.id === +userId
    }
  },
  mutations: {
    setUser(state, user) {
      state.user = user
    },
    setAvatar(state, avatarName) {
      state.user.avatar = ''
      setTimeout(() => {
        state.user.avatar = avatarName
      })
    },
    toggleSubscribeNotifications(state) {
      state.user.is_notification_subscribe_enabled = !state.user.is_notification_subscribe_enabled
    },
    toggleLikeNotifications(state) {
      state.user.is_notification_like_enabled = !state.user.is_notification_like_enabled
    }
  },
  actions: {
    async checkAuth({commit}) {
      const response = await requestMaker.fetch('auth', 'GET', {}, [200, 401])
      if (response.status === 200) {
        const responseData = await response.json()
        commit('setUser', responseData.user)
      } else {
        localStorage.removeItem('token')
        commit('setUser', undefined)
      }
    }
  },
  namespaced: true
}
