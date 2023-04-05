export default function useLoadAdditionalFilmInfo() {

  const loadAdditionalFilmInfo = async film => {
    film.filmKp.additionalInfo = 'loading...'

    const response = await fetch('https://api.kinopoisk.dev/movie?token=XKCN24R-WN9MQZW-JASGCYV-SV83GQN&field=id&search=' + film.filmKp.kinopoiskId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })

    if (response.status === 404) {
      film.filmKp.additionalInfo = '404'
    } else {
      film.filmKp.additionalInfo = await response.json()
    }

  }

  return {
    loadAdditionalFilmInfo
  }
}
