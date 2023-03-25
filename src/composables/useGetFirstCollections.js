import {ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetFirstCollections() {
  const requestMaker = useRequestMaker()

  const collections = ref([])

  const getCollections = async (userId) => {
    const response = await requestMaker.fetch('get/collections', 'GET', {
      user_id: userId,
      page: 1
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()
        collections.value = responseData.items
        if (collections.value.length > 0)
          collections.value.unshift(collections.value.pop())
        break;
    }
  }

  return {
    collections,
    getCollections
  }
}
