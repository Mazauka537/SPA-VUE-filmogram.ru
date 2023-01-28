import useRequestMaker from "@/composables/useRequestMaker";
import {getCurrentInstance} from "vue";

export default function useToggleSave() {
  const currentInstance = getCurrentInstance()
  const requestMaker = useRequestMaker()

  const toggleSave = async (collections, collectionId) => {
    const toggledCollection = collections.find(collection => collection.id === collectionId)
    toggledCollection.isInSaves = !toggledCollection.isInSaves

    const response = await requestMaker.fetch('toggle/save', 'POST', {
      collection_id: collectionId
    }, [201, 200, 404, 422, 401])

    if (response.status === 401) {
      toggledCollection.isInSaves = !toggledCollection.isInSaves

      currentInstance.root.ctx.addNotice('Чтобы сохранять коллекции, необходимо авторизоваться')
    }
  }


  return {
    toggleSave
  }
}
