
export default function useSearchStringWatcherCallback(searchedItemsLoader) {
  let searchInputDelay = 0

  const callback = (searchString) => {
    searchInputDelay++
    setTimeout(() => {
      searchInputDelay--
      if (searchInputDelay === 0) {
        searchedItemsLoader.setKeyword(searchString)
        searchedItemsLoader.reset()
      }
    }, 500)
  }

  return {
    callback
  }
}
