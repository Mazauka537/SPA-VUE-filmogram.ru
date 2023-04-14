import useRequestMaker from "@/composables/useRequestMaker";
import {reactive, ref} from "vue";

export default function useSearchAllLoader() {
  const requestMaker = useRequestMaker()

  const searchedItems = ref({
    films: [],
    collections: [],
    users: []
  })

  const loadSearchedItems = async (searchString) => {
    const response = await requestMaker.fetch('search/all', 'GET', {
      keyword: searchString,
    }, [200])

    searchedItems.value = await response.json()
  }

  return {
    loadSearchedItems,
    searchedItems,
  }
}
