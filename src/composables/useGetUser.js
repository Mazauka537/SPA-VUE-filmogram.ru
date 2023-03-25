import useRequestMaker from "@/composables/useRequestMaker";
import {ref} from "vue";

export default function useGetUser() {
  const requestMaker = useRequestMaker()

  const user = ref(undefined)
  const isUserLoading = ref(false)

  const getUser = async (userId) => {
    isUserLoading.value = true

    const response = await requestMaker.fetch('get/user', 'GET', {id: userId}, [200, 422, 404])

    if (response.status === 200) {
      const responseData = await response.json()
      user.value = responseData.user
    }

    isUserLoading.value = false
  }

  return {
    user,
    isUserLoading,
    getUser
  }
}
