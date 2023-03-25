import usePopUp from "@/composables/usePopUp";

export default function useEditCollection(collection) {
  const popUpEditCollection = usePopUp()

  const collectionEdited = (newCollection) => {
    collection.value = newCollection
    popUpEditCollection.hide()
  }

  return {
    popUpEditCollection,
    collectionEdited
  }
}
