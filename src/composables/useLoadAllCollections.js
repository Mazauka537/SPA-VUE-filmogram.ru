import useRequestMaker from "@/composables/useRequestMaker";
import {ref} from "vue";

export default function useLoadAllCollections() {
  const requestMaker = useRequestMaker()

  const loadCollections = async (userId, filmKpId) => {
    const response = await requestMaker.fetch('get/all/collections', 'GET', {
      user_id: userId,
      film_id: filmKpId
    }, [200])

    isCollectionsLoading.value = false
    collections.value = await response.json()
  }

  const collections = ref([])
  const isCollectionsLoading = ref(true)

  return {
    collections,
    isCollectionsLoading,
    loadCollections
  }
}
