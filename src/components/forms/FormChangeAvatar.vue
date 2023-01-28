<template>
  <form class="form-change-avatar">
    <div class="form-change-avatar__title">Выберите новую фотографию профиля</div>

    <MyImageInput v-model="form.image" style="margin-top: 35px"/>

    <MyButton @click="form.submit"
              :load="form.isSending"
              style="margin-top: 30px; margin-bottom: 15px">
      Сменить фото
    </MyButton>

  </form>
</template>

<script>
import MyImageInput from "@/components/UI/MyImageInput";
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";

export default {
  components: {MyButton, MyImageInput},
  setup(_, {emit}) {
    const changeAvatarRequest = async () => {
      const response = await requestMaker.fetch('change/user/avatar', 'POST', {
        user_id: store.state.auth.user.id,
        image: form.image
      }, [200, 422, 401, 403])

      const avatarName = await response.json()

      if (response.status === 200) {
        store.commit('auth/setAvatar', avatarName)
      }

      emit('avatarChanged', {status: response.status, avatarName})
    }

    const store = useStore()
    const requestMaker = useRequestMaker()
    const form = useForm({'image': undefined}, changeAvatarRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">

.form-change-avatar {

  &__title {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    padding-top: 10px;
  }
}

</style>
