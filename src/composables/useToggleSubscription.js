import useRequestMaker from "@/composables/useRequestMaker";
import {getCurrentInstance} from "vue";

export default function useToggleSubscription() {
  const currentInstance = getCurrentInstance()
  const requestMaker = useRequestMaker()

  const toggleSubscription = async (user) => {
    user.isSubscribed = !user.isSubscribed
    user.subscribers = user.isSubscribed ? user.subscribers + 1 : user.subscribers - 1

    const response = await requestMaker.fetch('toggle/subscription', 'POST', {
      user_id: user.id
    }, [201, 200, 401, 404, 422])

    if (response.status === 401) {
      user.isSubscribed = !user.isSubscribed
      user.subscribers = user.isSubscribed ? user.subscribers + 1 : user.subscribers - 1

      currentInstance.root.ctx.addNotice('Чтобы иметь возможность подписаться на другого пользователя, необходимо авторизоваться')
    }
  }

  return {
    toggleSubscription
  }
}
