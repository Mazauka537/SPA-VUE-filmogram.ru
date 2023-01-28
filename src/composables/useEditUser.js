import useRequestMaker from "@/composables/useRequestMaker";

export default function useEditUser(user) {
  const requestMaker = useRequestMaker()

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
    changeAvatar,
    changeUserName
  }
}
