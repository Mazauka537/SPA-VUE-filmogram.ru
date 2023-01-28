import useItemsLoader from "@/composables/useItemsLoader";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router/dist/vue-router";
import useSearchInput from "@/composables/useSearchInput";

export default function useFilmsLoader() {
  const requestMaker = useRequestMaker()
  const route = useRoute()

  const loadFilmsRequest = async () => {
    itemsLoader.isLoading = true
    const response = await requestMaker.fetch('search/films', 'GET', {
      keyword: searchString.value,
      page: itemsLoader.page,
      collection_id: route.params.id
    }, [200])

    const responseData = await response.json()

    handleSuccessfulResponse(responseData)
  }

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadFilmsRequest)
  const {searchString} = useSearchInput(itemsLoader.reset)

  return {filmsLoader: itemsLoader, searchString}
}
