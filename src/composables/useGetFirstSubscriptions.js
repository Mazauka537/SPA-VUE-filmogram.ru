import {ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetFirstSubscriptions() {
  const requestMaker = useRequestMaker()

  const subscriptions = ref([])

  const getSubscriptions = async (userId) => {
    const response = await requestMaker.fetch('get/subscriptions', 'GET', {
      user_id: userId,
      page: 1
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()
        subscriptions.value = responseData.items
        break;
    }
  }

  return {
    subscriptions,
    getSubscriptions
  }
}
