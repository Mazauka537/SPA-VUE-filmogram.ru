import {ref} from "vue";
import usePopUp from "@/composables/usePopUp";

export default function useAddingFilmToCollections(collectedFilmsLoader, toggleFavorite) {
  const addingToCollectionFilm = ref(undefined)
  const popUpAddToCollections = usePopUp()

  const currentCollectionChanged = () => {
    popUpAddToCollections.onHide = () => {
      collectedFilmsLoader.reset()
      popUpAddToCollections.onHide = undefined
    }
  }

  const favoriteCollectionChanged = (film) => {
    toggleFavorite(film)
  }

  return {
    addingToCollectionFilm,
    popUpAddToCollections,
    currentCollectionChanged,
    favoriteCollectionChanged
  }
}
