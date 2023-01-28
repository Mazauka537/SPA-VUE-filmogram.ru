import useItemsLoader from "@/composables/useItemsLoader";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router/dist/vue-router";

export default function useSavesLoader() {
  const requestMaker = useRequestMaker()
  const route = useRoute()

  const loadSavesRequest = async () => {
    const response = await requestMaker.fetch('get/saves', 'GET', {
      user_id: route.params.id,
      page: itemsLoader.page
    }, [200, 422, 404, 403])

    switch (response.status) {
      case 200:
        const responseData = await response.json()

        handleSuccessfulResponse(responseData)
        break;
    }
  }

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadSavesRequest)

  return {savesLoader: itemsLoader}
}
