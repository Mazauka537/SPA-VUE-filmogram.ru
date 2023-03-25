import {ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetFirstSaves() {
  const requestMaker = useRequestMaker()

  const savedCollections = ref([])

  const getSavedCollections = async (userId) => {
    const response = await requestMaker.fetch('get/saves', 'GET', {
      user_id: userId,
      page: 1
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()
        savedCollections.value = responseData.items
        break;
    }
  }

  return {
    savedCollections,
    getSavedCollections
  }
}
