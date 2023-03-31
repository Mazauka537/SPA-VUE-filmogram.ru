import useItemsLoader from "@/composables/useItemsLoader";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router/dist/vue-router";
import useSearchInput from "@/composables/useSearchInput";
import {ref} from "vue";

export default function useGeneralLoader() {
  const requestMaker = useRequestMaker()

  const searchType = ref('all')

  const loadGeneralRequest = async () => {
    itemsLoader.isLoading = true
    const response = await requestMaker.fetch('search/general', 'GET', {
      keyword: searchString.value,
      page: itemsLoader.page,
      type: searchType.value,
      filter: '',
    }, [200])

    const responseData = await response.json()

    handleSuccessfulResponse(responseData)
  }

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadGeneralRequest)
  const {searchString} = useSearchInput(itemsLoader.reset)

  return {generalLoader: itemsLoader, searchString, searchType}
}
