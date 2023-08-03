import {ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetFirstSaves() {
  const requestMaker = useRequestMaker()

  const savedCollections = ref([])
  const isSavedCollectionsLoading = ref(false)

  const getSavedCollections = async (userId) => {
    isSavedCollectionsLoading.value = true

    const response = await requestMaker.fetch('get/saves', 'GET', {
      user_id: userId,
      page: 1
    }, [200, 422, 404])

    isSavedCollectionsLoading.value = false

    switch (response.status) {
      case 200:
        const responseData = await response.json()
        savedCollections.value = responseData.items
        break;
    }
  }

  return {
    savedCollections,
    isSavedCollectionsLoading,
    getSavedCollections
  }
}
