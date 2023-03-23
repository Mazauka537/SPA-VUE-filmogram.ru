import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";

export default function useToggleFavorite() {
  const store = useStore()
  const requestMaker = useRequestMaker()

  const toggleFavorite = async (film) => {
    film.isInFavorite = !film.isInFavorite

    const response = await requestMaker.fetch('toggle/favorite', 'POST', {
      film_id: film.filmKp ? film.filmKp.kinopoiskId : film.kinopoiskId
    }, [201, 200, 404, 422, 401])

    if (response.status !== 200 && response.status !== 201) {
      film.isInFavorite = !film.isInFavorite
    }

    if (response.status === 401) {
      store.commit('notifications/addNotification', {
        text: 'Чтобы сохранять фильмы, необходимо авторизоваться'
      })
    }
  }


  return {
    toggleFavorite
  }
}
