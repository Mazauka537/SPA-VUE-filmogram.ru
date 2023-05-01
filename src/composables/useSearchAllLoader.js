import useRequestMaker from "@/composables/useRequestMaker";
import {reactive, ref} from "vue";

export default function useSearchAllLoader() {
  const requestMaker = useRequestMaker()

  const searchedItems = ref({
    films: [],
    collections: [],
    users: []
  })

  const isItemsLoading = ref(false)

  const loadSearchedItems = async (searchString) => {
    isItemsLoading.value = true

    const response = await requestMaker.fetch('search/all', 'GET', {
      keyword: searchString,
    }, [200])

    searchedItems.value = await response.json()

    isItemsLoading.value = false
  }

  return {
    loadSearchedItems,
    searchedItems,
    isItemsLoading
  }
}
