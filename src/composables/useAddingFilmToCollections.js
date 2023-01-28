import {ref} from "vue";
import usePopUp from "@/composables/usePopUp";

export default function useAddingFilmToCollections(filmsLoader) {
  const currentCollectionChanged = () => {
    popUpAddToCollections.onHide = () => {
      filmsLoader.reset()
      popUpAddToCollections.onHide = undefined
    }
  }
  const addingToCollectionFilmId = ref(undefined)
  const popUpAddToCollections = usePopUp()

  return {
    currentCollectionChanged,
    addingToCollectionFilmId,
    popUpAddToCollections
  }
}
