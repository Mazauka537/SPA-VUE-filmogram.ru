import {computed} from "vue";

export default function useFilmComputeds(props) {

  const genres = computed(() => {
    let genresStr = ''
    props.film.filmKp.genres.forEach(genre => {
      genresStr += genre.genre + ', '
    })
    return genresStr.slice(0, -2)
  })

  const genresList = computed(() => {
    return genres.value.replaceAll(', ', '<br>')
  })

  const countries = computed(() => {
    let countriesStr = ''
    props.film.filmKp.countries.forEach(country => {
      countriesStr += country.country + ', '
    })
    return countriesStr.slice(0, -2)
  })

  const type = computed(() => {
    switch (props.film.filmKp.type) {
      case 'FILM':
        return 'Фильм'
      case 'TV_SERIES':
        return 'Сериал'
      case 'MINI_SERIES':
        return 'Мини-сериал'
      case 'TV_SHOW':
        return 'ТВ шоу'
    }
  })

  const rateColor = rate => {
    if (rate >= 7) {
      return  'green'
    } else if (rate >= 5) {
      return  'yellow'
    } else if (rate >= 3) {
      return  'orange'
    } else {
      return  'red'
    }
  }

  const rateColorKp = computed(() => {
    return rateColor(props.film.filmKp.ratingKinopoisk)
  })

  const rateColorImdb = computed(() => {
    return rateColor(props.film.filmKp.ratingImdb)
  })

  return {
    genres,
    genresList,
    countries,
    type,
    rateColorKp,
    rateColorImdb,
  }
}
