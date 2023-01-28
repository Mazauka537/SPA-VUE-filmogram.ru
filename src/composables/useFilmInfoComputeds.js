import {computed} from "vue";

export default function useFilmInfoComputeds(props) {

  const _splitCash = (value) => {
    if (!value) return undefined

    let cashArr = value.toString().split('')
    for (let i = cashArr.length - 4; i >= 0; i -= 3) {
      cashArr[i] += ' '
    }

    return cashArr.join('')
  }

  const _personsFilter = profession => props.filmKp.additionalInfo.persons.filter(person => person.enProfession === profession).slice(0, 7)

  const _computedTime = timeInMinutes => {
    if (!timeInMinutes) {
      return NaN
    }
    const hours = Math.floor(timeInMinutes / 60)
    const minutes = timeInMinutes - hours * 60
    return hours > 0 ? hours + 'ч. ' + minutes + 'мин.' : minutes + 'мин.'
  }

  const trailerUrl = computed(() => {
    let trailer = props.filmKp.additionalInfo.videos.trailers.find(trailer => {
      return trailer.type === 'TRAILER' && trailer.site === 'youtube'
    })

    return trailer?.url
  })

  const episodesCount = computed(() => {
    if (props.filmKp.additionalInfo.seasonsInfo.length === 0)
      return NaN

    let count = 0
    props.filmKp.additionalInfo.seasonsInfo.forEach(seasonInfo => {
      count += seasonInfo.episodesCount
    })
    return count
  })

  const seasonsCount = computed(() => {
    return props.filmKp.additionalInfo.seasonsInfo.length !== 0 ? props.filmKp.additionalInfo.seasonsInfo.length : NaN
  })

  const length = computed(() => {
    return _computedTime(props.filmKp.filmLength)
  })

  const additionalLength = computed(() => {
    return _computedTime(props.filmKp.additionalInfo.movieLength)
  })

  const budget = computed(() => {
    return _splitCash(props.filmKp.additionalInfo.budget.value) + props.filmKp.additionalInfo.budget?.currency
  })

  const fees = computed(() => {
    return _splitCash(props.filmKp.additionalInfo.fees.world.value) + props.filmKp.additionalInfo.fees.world?.currency
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

  return {
    length,
    budget,
    fees,
    actors,
    producers,
    writers,
    trailerUrl,
    episodesCount,
    seasonsCount,
    additionalLength,
  }
}
