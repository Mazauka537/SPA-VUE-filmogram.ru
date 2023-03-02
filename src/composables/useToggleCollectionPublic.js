import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";

export default function useToggleCollectionPublic() {
  const store = useStore()
  const requestMaker = useRequestMaker()

  const toggleCollectionPublic = async (collection) => {
    collection.public = !collection.public

    const response = await requestMaker.fetch('toggle/collection/public', 'POST', {
      collection_id: collection.id
    }, [201, 200, 404, 422, 401, 403])

    if (response.status === 401) {
      collection.public = !collection.public

      store.commit('notifications/addNotification', {
        text: 'Изменять приватность коллекции может только авторизированный автор этой коллекции'
      })
    }
    if (response.status === 404) {
      collection.public = !collection.public

      store.commit('notifications/addNotification', {
        text: 'Коллекция с данным id не пренадлежит вам!'
      })
    }
  }

  return {
    toggleCollectionPublic
  }
}
