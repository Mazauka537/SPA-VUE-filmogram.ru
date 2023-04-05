import useRequestMaker from "@/composables/useRequestMaker";
import useSearchedItemsLoader from "@/composables/useSearchedItemsLoader";
import useSearchStringWatcherCallback from "@/composables/useSearchStringWatcherCallback";

export default function useSearchedFilmsLoader(filmsFilter) {
  const requestMaker = useRequestMaker()

  const loadSearchedFilmsRequest = async () => {
    const response = await requestMaker.fetch('search/films', 'GET', {
      keyword: itemsLoader.keyword,
      page: itemsLoader.page,
      order: filmsFilter.value?.order,
      type: filmsFilter.value?.type,
      genre: filmsFilter.value?.genre,
      year_from: filmsFilter.value?.year_from,
      year_to: filmsFilter.value?.year_to,
      rating_from: filmsFilter.value?.rating_from,
      rating_to: filmsFilter.value?.rating_to,
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()

        handleSuccessfulResponse(responseData)
        break;
    }
  }

  const {itemsLoader, handleSuccessfulResponse} = useSearchedItemsLoader(loadSearchedFilmsRequest)
  const {callback} = useSearchStringWatcherCallback(itemsLoader)

  return {searchedFilmsLoader: itemsLoader, callback}
}
