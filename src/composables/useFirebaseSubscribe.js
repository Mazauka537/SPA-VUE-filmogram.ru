import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";

export default function () {
  const requestMaker = useRequestMaker()
  const store = useStore()

  if (!firebase.apps.length) {
    firebase.initializeApp({
      messagingSenderId: process.env.VUE_APP_NOTIFICATIONS_SENDER_ID
    })
  }

  const messaging = firebase.messaging()

  messaging.onMessage(payload => {
    store.commit('notifications/addNotification', {
      text: payload.notification.body
    })
  })

  const subscribe = () => {
    messaging.requestPermission()
      .then(() => {
        messaging.getToken()
          .then(currentToken => {
            console.log(currentToken)

            if (currentToken) {
              sendTokenToServer(currentToken)
            } else {
              console.warn('Не удалось получить токен.')
              setTokenSentToServer(false)
            }
          })
          .catch(err => {
            console.warn('При получении токена произошла ошибка.', err)
            setTokenSentToServer(false)
          });
      })
      .catch(err => {
        console.warn('Не удалось получить разрешение на показ уведомлений.', err)
      });
  }

  const sendTokenToServer = (currentToken) => {
    if (!isTokenSentToServer(currentToken)) {
      requestMaker.fetch('add/notification/token', 'POST', {
        token: currentToken
      }, [200])

      setTokenSentToServer(currentToken)
    }
  }

  const isTokenSentToServer = (currentToken) => {
    return window.localStorage.getItem('sentFirebaseMessagingToken') == currentToken
  }

  const setTokenSentToServer = (currentToken) => {
    window.localStorage.setItem('sentFirebaseMessagingToken', currentToken ? currentToken : '')
  }

  return {
    subscribe
  }
}
