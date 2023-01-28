import useLoadMoreFilmInfoTest from "@/composables/useLoadMoreFilmInfo";

export default function useLoadMoreFilmInfoMyDB(collectedFilmsLoader) {
  const {loadAdditionalInfo} = useLoadMoreFilmInfoTest()

  const getLoadingFilm = (collectedFilmsLoader, film_id) => {
    const foundFilm = collectedFilmsLoader.items.find(film => film.film_id === film_id)
    return foundFilm
  }


  const loadMoreFilmInfo = async film_id => {
    const foundFilm = getLoadingFilm(collectedFilmsLoader, film_id)

    await loadAdditionalInfo(foundFilm.filmKp)
  }

  return {
    loadMoreFilmInfo
  }
}
