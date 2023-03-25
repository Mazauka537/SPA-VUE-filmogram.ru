import useToggleFilm from "@/composables/useToggleFilm";

export default function useDeleteFilmFromCollection(collection, collectedFilmsLoader, elemsFilmBlocks, setSelectedFilm) {
  const {toggleFilm} = useToggleFilm()

  const deleteFilm = async (film) => {
    toggleFilm(collection.value.id, film)

    const elemDeletingFilmBlock = elemsFilmBlocks.value.find(filmBlock => {
      return filmBlock.dataset.filmId === film.id.toString()
    })

    elemDeletingFilmBlock.style.height = (elemDeletingFilmBlock.offsetHeight + 10) + 'px'
    elemDeletingFilmBlock.style.transition = 'all 0.2s'
    elemDeletingFilmBlock.style.overflow = 'hidden'

    setTimeout(() => {
      elemDeletingFilmBlock.style.height = 0
    }, 300)

    elemDeletingFilmBlock.ontransitionend = () => {
      collection.value.films_count = collection.value.films_count - 1
      collectedFilmsLoader.items.splice(collectedFilmsLoader.items.indexOf(film), 1)
      setSelectedFilm(undefined)
    }
  }

  return {
    deleteFilm
  }
}
