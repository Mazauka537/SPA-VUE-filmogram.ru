import useItemsLoader from "@/composables/useItemsLoader";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router/dist/vue-router";

export default function useCollectionsLoader() {
  const requestMaker = useRequestMaker()
  const route = useRoute()

  const loadCollectionsRequest = async () => {
    const response = await requestMaker.fetch('get/collections', 'GET', {
      user_id: route.params.id,
      page: itemsLoader.page
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        const responseData = await response.json()

        handleSuccessfulResponse(responseData)
        break;
    }
  }

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadCollectionsRequest)

  return {collectionsLoader: itemsLoader}
}
