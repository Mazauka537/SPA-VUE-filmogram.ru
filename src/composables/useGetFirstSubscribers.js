import {ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetFirstSubscribers() {
  const requestMaker = useRequestMaker()

  const subscribers = ref([])

  const getSubscribers = async (userId) => {
    const response = await requestMaker.fetch('get/subscribers', 'GET', {
      user_id: userId,
      page: 1
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()
        subscribers.value = responseData.items
        break;
    }
  }

  return {
    subscribers,
    getSubscribers
  }
}
