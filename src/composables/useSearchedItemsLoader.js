import useItemsLoader from "@/composables/useItemsLoader";
import {ref} from "vue";

export default function useSearchedItemsLoader(loadSearchedItemsRequest) {

  const {itemsLoader, handleSuccessfulResponse} = useItemsLoader(loadSearchedItemsRequest)

  itemsLoader.keyword = ref('')

  itemsLoader.setKeyword = (newKeyword) => {
    itemsLoader.keyword = newKeyword
  }

  return {
    itemsLoader,
    handleSuccessfulResponse,
  }
}
