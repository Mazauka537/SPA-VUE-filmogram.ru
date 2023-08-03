import {computed} from "vue";
import useGetDeclinationIndex from "@/composables/useGetDeclinationIndex";

export default function useCollectionDataDeclination(collection) {

  const likesDeclinationArray = ['лайк', 'лайка', 'лайков']
  const filmsDeclinationArray = ['фильм', 'фильма', 'фильмов']

  const likesDeclination = computed(() => {
    let count = collection.value.saves_count

    return likesDeclinationArray[getDeclinationIndex(count)]
  })

  const filmsDeclination = computed(() => {
    let count = collection.value.films_count

    return filmsDeclinationArray[getDeclinationIndex(count)]
  })

  const {getDeclinationIndex} = useGetDeclinationIndex()

  return {
    likesDeclination,
    filmsDeclination
  }
}
