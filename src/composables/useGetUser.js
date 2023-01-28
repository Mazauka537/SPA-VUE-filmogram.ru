import useRequestMaker from "@/composables/useRequestMaker";
import {ref} from "vue";
import {useRoute} from "vue-router/dist/vue-router";

export default function useGetUser() {
  const route = useRoute()
  const requestMaker = useRequestMaker()

  const user = ref(undefined)
  const isUserLoading = ref(false)

  const getUser = async () => {
    isUserLoading.value = true

    const response = await requestMaker.fetch('get/user', 'GET', {id: route.params.id}, [200, 422, 404])

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
