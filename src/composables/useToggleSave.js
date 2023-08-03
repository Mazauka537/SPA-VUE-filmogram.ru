import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";

export default function useToggleSave() {
  const store = useStore()
  const requestMaker = useRequestMaker()

  const toggleSave = async (collection) => {
    collection.isInSaves = !collection.isInSaves
    collection.isInSaves ? ++collection.saves_count : --collection.saves_count;

    const response = await requestMaker.fetch('toggle/save', 'POST', {
      collection_id: collection.id
    }, [201, 200, 404, 422, 401])

    if (response.status !== 200 && response.status !== 201) {
      collection.isInSaves = !collection.isInSaves
    }

    if (response.status === 401) {
      store.commit('notifications/addNotification', {
        text: 'Чтобы сохранять коллекции, необходимо авторизоваться'
      })
    }
  }


  return {
    toggleSave
  }
}
