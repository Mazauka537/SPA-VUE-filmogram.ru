import useRequestMaker from "@/composables/useRequestMaker";
import useSearchedItemsLoader from "@/composables/useSearchedItemsLoader";
import useSearchStringWatcherCallback from "@/composables/useSearchStringWatcherCallback";

export default function useSearchedCollectionsLoader() {
  const requestMaker = useRequestMaker()

  const loadSearchedCollectionsRequest = async () => {
    const response = await requestMaker.fetch('search/collections', 'GET', {
      keyword: itemsLoader.keyword,
      page: itemsLoader.page
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()

        handleSuccessfulResponse(responseData)
        break;
    }
  }

  const {itemsLoader, handleSuccessfulResponse} = useSearchedItemsLoader(loadSearchedCollectionsRequest)
  const {callback} = useSearchStringWatcherCallback(itemsLoader)

  return {searchedCollectionsLoader: itemsLoader, callback}
}
