import {reactive, ref} from 'vue'

export default function useItemsLoader(request) {
  let page = ref(1)
  let items = ref([])
  let isAllLoaded = ref(false)
  let isLoading = ref(false)

  const reset = () => {
    page.value = 1
    items.value = []
    isAllLoaded.value = false
    isLoading.value = false
  }

  const loadMore = async () => {
    let response = await request()
    page.value++
    return response
  }

  const handleSuccessfulResponse = responseData => {
    isLoading.value = false
    if (responseData.totalPages <= page.value) {
      isAllLoaded.value = true
    }

    items.value = [...items.value, ...responseData.items]
  }

  return {
    itemsLoader: reactive({
      items,
      loadMore,
      reset,
      isAllLoaded,
      isLoading,
      page
    }),
    handleSuccessfulResponse
  }
}
