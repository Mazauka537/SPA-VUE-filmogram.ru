import {ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetFirstCollections() {
  const requestMaker = useRequestMaker()

  const collections = ref([])
  const isCollectionsLoading = ref(false)

  const getCollections = async (userId) => {
    isCollectionsLoading.value = true

    const response = await requestMaker.fetch('get/collections', 'GET', {
      user_id: userId,
      page: 1,
      limit: 11
    }, [200, 422, 404])

    isCollectionsLoading.value = false

    switch (response.status) {
      case 200:
        const responseData = await response.json()
        collections.value = responseData.items
        break;
    }
  }

  return {
    collections,
    isCollectionsLoading,
    getCollections
  }
}
