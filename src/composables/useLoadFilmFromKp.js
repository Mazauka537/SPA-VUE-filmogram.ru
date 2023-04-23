import {ref} from "vue";

export default function useLoadFilmFromKp() {

  const filmFromKp = ref(undefined)

  const loadFilmFromKp = async filmKpId => {
    filmFromKp.value = 'loading'

    const response = await fetch('https://api.kinopoisk.dev/movie?token=XKCN24R-WN9MQZW-JASGCYV-SV83GQN&field=id&search=' + filmKpId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
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
