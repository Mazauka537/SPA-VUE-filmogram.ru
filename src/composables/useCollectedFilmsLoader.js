import useItemsLoader from "@/composables/useItemsLoader";
import useRequestMaker from "@/composables/useRequestMaker";

export default function useCollectedFilmsLoader(collection) {
  const requestMaker = useRequestMaker()

  const loadFilmsRequest = async () => {
    itemsLoader.isLoading = true
    const response = await requestMaker.fetch('get/films', 'GET', {
      collection_id: collection.value.id,
      page: itemsLoader.page
    }, [200])

    const responseData = await response.json()

    handleSuccessfulResponse(responseData)

    collection.value.films_count = responseData.totalCount
  }

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadFilmsRequest)

  return {collectedFilmsLoader: itemsLoader}
}
