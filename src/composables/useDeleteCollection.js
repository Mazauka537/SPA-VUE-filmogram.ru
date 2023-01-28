import useRequestMaker from "@/composables/useRequestMaker";
import {useRouter} from "vue-router/dist/vue-router";

export default function useDeleteCollection(collection) {
  const requestMaker = useRequestMaker()
  const router = useRouter()

  const deleteCollection = () => {
    const response = requestMaker.fetch('delete/collection', 'DELETE', {
      collection_id: collection.value.id,
    }, [200, 401, 403, 422])

    router.replace('/user/' + collection.value.user_id)
  }

  return {
    deleteCollection
  }
}
