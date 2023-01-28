import {ref, watch} from 'vue'

export default function useSearchInput(onSearchStringChange) {
  const searchString = ref('')
  let searchInputDelay = 0

  watch(searchString, () => {
    searchInputDelay++
    setTimeout(() => {
      searchInputDelay--
      if (searchInputDelay === 0) {
        onSearchStringChange()
      }
    }, 500)
  })

  return {
    searchString
  }
}
