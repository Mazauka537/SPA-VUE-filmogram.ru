import {ref} from "vue";

export default function useLoadFilmFromKp() {

  const filmFromKp = ref(undefined)

  const loadFilmFromKp = async filmKpId => {
    filmFromKp.value = 'loading'

    const response = await fetch(process.env.VUE_APP_KINOPOISK_API_URL + 'movie/' + filmKpId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': process.env.VUE_APP_KINOPOISK_API_TOKEN
      }
    })

    if (response.status === 404) {
      filmFromKp.value = '404'
    } else {
      filmFromKp.value = await response.json()
    }
  }

  return {
    filmFromKp,
    loadFilmFromKp
  }
}
