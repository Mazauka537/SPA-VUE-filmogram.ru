import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";

export default function useToggleSubscription() {
  const requestMaker = useRequestMaker()
  const store = useStore()

  const toggleSubscription = async (user) => {
    user.isSubscribed = !user.isSubscribed
    user.subscribers = user.isSubscribed ? user.subscribers + 1 : user.subscribers - 1

    const response = await requestMaker.fetch('toggle/subscription', 'POST', {
      user_id: user.id
    }, [201, 200, 401, 404, 422])

    if (response.status !== 200 && response.status !== 201) {
      user.isSubscribed = !user.isSubscribed
      user.subscribers = user.isSubscribed ? user.subscribers + 1 : user.subscribers - 1
    }

    if (response.status === 401) {
      store.commit('notifications/addNotification', {
        text: 'Чтобы иметь возможность подписаться на другого пользователя, необходимо авторизоваться'
      })
    }
  }

  return {
    toggleSubscription
  }
}
