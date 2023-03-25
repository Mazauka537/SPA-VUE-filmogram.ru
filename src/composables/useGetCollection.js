import useRequestMaker from "@/composables/useRequestMaker";
import {ref} from "vue";
import useCollectedFilmsLoader from "@/composables/useCollectedFilmsLoader";

export default function useGetCollection() {
  const requestMaker = useRequestMaker()

  const collection = ref(undefined)
  const {collectedFilmsLoader} = useCollectedFilmsLoader(collection)

  const getCollection = async (collectionId) => {
    const response = await requestMaker.fetch('get/collection', 'GET', {
      id: collectionId
    }, [200, 422, 404])

    switch (response.status) {
      case 200:
        collection.value = await response.json()
        collectedFilmsLoader.reset()
        break;
      case 404:

        break;
    }
  }

  return {
    collection,
    collectedFilmsLoader,
    getCollection
  }
}
