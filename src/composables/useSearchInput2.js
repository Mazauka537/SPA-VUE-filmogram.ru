export default function useSearchInput2() {
  let searchInputDelay = 0

  const goSearch = (callback) => {
    searchInputDelay++

    setTimeout(() => {
      searchInputDelay--

      if (searchInputDelay === 0) {
        callback()
      }
    }, 500)
  }

  return {
    goSearch
  }
}
