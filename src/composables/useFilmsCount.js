import {computed} from "vue";

export default function useFilmsCount(props) {

  const filmsCount = computed(() => {
    const lastNumber = +props.collection.films_count.toString().slice(-1)
    let textFilms = ' фильм'
    if (lastNumber >= 2 && lastNumber <= 4) {
      textFilms += 'а'
    } else if ((lastNumber >= 5 && lastNumber <= 9) || lastNumber === 0) {
      textFilms += 'ов'
    }

    return props.collection.films_count + textFilms
  })

  return {
    filmsCount
  }
}
