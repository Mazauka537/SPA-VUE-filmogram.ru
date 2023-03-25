import useRequestMaker from "@/composables/useRequestMaker";

export default function useToggleFilm() {
  const requestMaker = useRequestMaker()

  const toggleFilm = (collectionId, film) => {
    film.isInCollection = !film.isInCollection

    const response = requestMaker.fetch('toggle/film', 'POST', {
      collection_id: collectionId,
      film_id: film.filmKp ? film.filmKp.kinopoiskId : film.kinopoiskId,
    }, [201, 200, 401, 403, 422])
  }

  return {
    toggleFilm
  }
}
