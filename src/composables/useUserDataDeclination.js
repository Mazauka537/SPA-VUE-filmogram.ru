import {computed} from "vue";
import useGetDeclinationIndex from "@/composables/useGetDeclinationIndex";

export default function useUserDataDeclination(user) {

  const subscribersDeclinationArray = ['подписчик', 'подписчика', 'подписчиков']
  const subscriptionsDeclinationArray = ['подписка', 'подписки', 'подписок']

  const subscribersDeclination = computed(() => {
    let count = user.value.subscribers

    return subscribersDeclinationArray[getDeclinationIndex(count)]
  })

  const subscriptionsDeclination = computed(() => {
    let count = user.value.subscriptions

    return subscriptionsDeclinationArray[getDeclinationIndex(count)]
  })

  const {getDeclinationIndex} = useGetDeclinationIndex()

  return {
    subscribersDeclination,
    subscriptionsDeclination
  }
}
