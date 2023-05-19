const removeNotification = (state, notificationId) => {
  const removingNotification = state.notifications.find(notification => notification.id === notificationId)

  if (removingNotification.state !== 'adding') {
    removingNotification.state = 'removing'

    setTimeout(() => {
      clearTimeout(removingNotification.timeoutId)
      state.notifications = state.notifications.filter(notification => notification.id !== notificationId)
    }, 300)
  }
}

const setFading = (state, notification) => {
  if (!state.isFadingStopped && notification.autoClose && notification.state !== 'removing') {
    notification.state = 'fading'
    notification.timeoutId = setTimeout(() => {
      removeNotification(state, notification.id)
    }, 5000)
  }
}

export const notificationModule = {
  state: () => ({
    notifications: [],
    isFadingStopped: false
  }),
  getters: {
    isMoreThenTwoClosable(state) {
      const closableNotification = state.notifications.filter(notification => notification.closable && notification.state !== 'removing')
      return closableNotification.length > 1
    }
  },
  mutations: {
    stopFading(state) {
      state.isFadingStopped = true
      state.notifications.forEach(notification => {
        notification.state = 'stopFading'
        clearTimeout(notification.timeoutId)
      })
    },

    startFading(state) {
      state.isFadingStopped = false
      state.notifications.forEach(notification => {
        if (notification.state !== 'adding') {
          setFading(state, notification)
        }
      })
    },

    addNotification(state, notification) {
      notification.id = notification.id ?? Date.now()
      notification.text = notification.text ?? '[empty]'
      notification.closable = notification.closable ?? true
      notification.autoClose = notification.autoClose ?? true
      notification.state = 'adding'

      state.notifications.push(notification)

      let addedNotification = state.notifications.find(item => item.id === notification.id)

      setTimeout(() => {
        if (state.isFadingStopped) {
          addedNotification.state = 'stopFading'
        } else {
          setFading(state, addedNotification)
        }
      }, 500)
    },

    removeNotification(state, notificationId) {
      removeNotification(state, notificationId)
    },

    removeAll(state) {
      state.notifications.forEach(notification => {
        removeNotification(state, notification.id)
      })
    }
  },
  actions: {},
  namespaced: true
}
