import useRequestMaker from "@/composables/useRequestMaker";

export default function useGetCollectionData() {
  const requestMaker = useRequestMaker()

  const getCollectionData = async (collectionId) => {
    const response = await requestMaker.fetch('get/default/collection', 'GET', {
      id: collectionId
    })

    return await response.json()
  }

  return {
    getCollectionData
  }
}
