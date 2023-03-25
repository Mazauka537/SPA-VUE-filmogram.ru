import {ref} from "vue";

export default function useFilmSelection() {
  const selectedFilm = ref(undefined)

  const setSelectedFilm = (film) => {
    selectedFilm.value = film
  }

  return {
    selectedFilm,
    setSelectedFilm
  }
}
