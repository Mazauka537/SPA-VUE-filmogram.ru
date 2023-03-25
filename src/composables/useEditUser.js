import useRequestMaker from "@/composables/useRequestMaker";
import usePopUp from "@/composables/usePopUp";

export default function useEditUser(user) {
  const requestMaker = useRequestMaker()

  const popUpEditUserData = usePopUp()

  const changeUserName = async userName => {
    user.value.name = userName

    const response = await requestMaker.fetch('change/user/name', 'POST', {
      name: userName
    }, [200, 422, 404, 403, 401])
  }

  const changeAvatar = response => {
    if (response.status === 200) {
      user.value.avatar = ''
      setTimeout(() => {
        user.value.avatar = response.avatarName
      })
    }
  }

  return {
    popUpEditUserData,
    changeAvatar,
    changeUserName
  }
}
