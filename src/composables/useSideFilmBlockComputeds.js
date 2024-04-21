import {computed} from "vue";

export default function useSideFilmBlockComputeds(filmFromKp) {

  const _splitCash = (value) => {
    if (!value) return undefined

    let cashArr = value.toString().split('')
    for (let i = cashArr.length - 4; i >= 0; i -= 3) {
      cashArr[i] += ' '
    }

    return cashArr.join('')
  }

  const _personsFilter = profession => filmFromKp.value.persons.filter(person => person.enProfession === profession).slice(0, 7)

  const _computedTime = timeInMinutes => {
    if (!timeInMinutes) {
      return NaN
    }
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes - hours * 60
    return hours > 0 ? hours + 'ч. ' + minutes + 'мин.' : minutes + 'мин.'
  }

  const trailerUrl = computed(() => {
    let trailer = filmFromKp.value.videos?.trailers.find(trailer => {
      return trailer.type === 'TRAILER' && trailer.site === 'youtube'
    })

    return trailer?.url
  })

  const episodesCount = computed(() => {
    if (filmFromKp.value.seasonsInfo.length === 0)
      return NaN

    let count = 0
    filmFromKp.value.seasonsInfo.forEach(seasonInfo => {
      count += seasonInfo.episodesCount
    })
    return count
  })

  const seasonsCount = computed(() => {
    return filmFromKp.value.seasonsInfo?.length !== 0 ? filmFromKp.value.seasonsInfo?.length : NaN
  })

  const length = computed(() => {
    return _computedTime(filmFromKp.value.movieLength)
  })

  const budget = computed(() => {
    return _splitCash(filmFromKp.value.budget?.value) + filmFromKp.value.budget?.currency
  })

  const fees = computed(() => {
    return _splitCash(filmFromKp.value.fees?.world?.value) + filmFromKp.value.fees?.world?.currency
  })

  const actors = computed(() => {
    return _personsFilter('actor')
  })

  const producers = computed(() => {
    return _personsFilter('producer')
  })

  const writers = computed(() => {
    return _personsFilter('writer')
  })

  //duplicated code

  const genres = computed(() => {
    let genresStr = ''
    filmFromKp.value.genres.forEach(genre => {
      genresStr += genre.name + ', '
    })
    return genresStr.slice(0, -2)
  })

  const genresList = computed(() => {
    return genres.value.replaceAll(', ', '<br>')
  })

  const countries = computed(() => {
    let countriesStr = ''
    filmFromKp.value.countries.forEach(country => {
      countriesStr += country.name + ', '
    })
    return countriesStr.slice(0, -2)
  })

  const type = computed(() => {
    switch (filmFromKp.value.type) {
      case 'movie':
        return 'Фильм'
      case 'tv-series':
        return 'Сериал'
      case 'cartoon':
        return 'Мультфильм'
      case 'anime':
        return 'Аниме'
      case 'animated-series':
        return 'Аниме сериал'
      case 'tv-show':
        return 'ТВ шоу'
    }
  })


  return {
    budget,
    fees,
    actors,
    producers,
    writers,
    trailerUrl,
    episodesCount,
    seasonsCount,
    length,

    genresList, countries, type
  }
}
