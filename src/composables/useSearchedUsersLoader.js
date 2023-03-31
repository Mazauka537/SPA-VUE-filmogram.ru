import useRequestMaker from "@/composables/useRequestMaker";
import useSearchedItemsLoader from "@/composables/useSearchedItemsLoader";
import useSearchStringWatcherCallback from "@/composables/useSearchStringWatcherCallback";

export default function useSearchedUsersLoader() {
  const requestMaker = useRequestMaker()

  const loadSearchedUsersRequest = async () => {
    const response = await requestMaker.fetch('search/users', 'GET', {
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

  const {itemsLoader, handleSuccessfulResponse} = useSearchedItemsLoader(loadSearchedUsersRequest)
  const {callback} = useSearchStringWatcherCallback(itemsLoader)

  return {searchedUsersLoader: itemsLoader, callback}
}
