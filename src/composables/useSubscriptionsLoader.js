import useItemsLoader from "@/composables/useItemsLoader";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router/dist/vue-router";

export default function useSubscriptionsLoader() {
  const requestMaker = useRequestMaker()
  const route = useRoute()

  const loadSubscribersRequest = async () => {
    const response = await requestMaker.fetch('get/subscriptions', 'GET', {
      user_id: route.params.id,
      page: itemsLoader.page
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        let responseData = await response.json()

        handleSuccessfulResponse(responseData)
        break;
    }
  }

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadSubscribersRequest)

  return {subscriptionsLoader: itemsLoader}
}
