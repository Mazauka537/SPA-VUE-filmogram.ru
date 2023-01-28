import useRequestMaker from "@/composables/useRequestMaker";

export default function useDeleteFilmFromCollection(collection, collectedFilmsLoader, filmBlocks, setSelectedFilm) {
  const requestMaker = useRequestMaker()

  const deleteFilm = async (film) => {
    const response = requestMaker.fetch('toggle/film', 'POST', {
      collection_id: collection.value.id,
      film_id: film.film_id,
    }, [201, 200, 401, 403, 422])

    const deletingFilmBlock = filmBlocks.value.find(filmBlock => {
      return filmBlock.dataset.filmId === film.id.toString()
    })

    deletingFilmBlock.style.height = deletingFilmBlock.offsetHeight + 'px'

    setTimeout(() => {
      deletingFilmBlock.style.height = 0;
    }, 20)

    deletingFilmBlock.ontransitionend = () => {
      collection.value.films_count = collection.value.films_count - 1
      collectedFilmsLoader.items.splice(collectedFilmsLoader.items.indexOf(film), 1)
      setSelectedFilm(undefined)
    }
  }

  return {
    deleteFilm
  }
}
