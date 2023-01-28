export default function useLoadMoreFilmInfo() {

  const loadAdditionalInfo = async filmKp => {
    filmKp.additionalInfo = 'loading...'

    const response = await fetch('https://api.kinopoisk.dev/movie?token=XKCN24R-WN9MQZW-JASGCYV-SV83GQN&field=id&search=' + filmKp.kinopoiskId, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      }
    })

    if (response.status === 404) {
      filmKp.additionalInfo = '404'
    } else {
      filmKp.additionalInfo = await response.json()
    }

  }

  return {
    loadAdditionalInfo
  }
}
