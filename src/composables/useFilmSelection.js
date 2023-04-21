import {ref} from "vue";
import {useRouter} from "vue-router/dist/vue-router";

export default function useFilmSelection() {
  const router = useRouter()

  const selectedFilm = ref(undefined)

  const setSelectedFilm = (film) => {
    selectedFilm.value = film
    router.push({query: {film: film.filmKp.kinopoiskId}})
  }

  return {
    selectedFilm,
    setSelectedFilm
  }
}
