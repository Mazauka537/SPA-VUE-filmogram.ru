<template>
  <form class="form-edit-user-data">

    <div class="form-edit-user-data__inputs">

      <div class="form-edit-user-data__avatar">
        <MyImageInput v-model="form.image"
                      :starting-image-src="$store.state.auth.user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + $store.state.auth.user.avatar : undefined"/>
      </div>

      <div class="form-edit-user-data__info">

        <MyInput type="text" placeholder="Имя" v-model="form.name"/>

        <MyButton @click="form.submit"
                  :load="form.isSending"
                  style="margin-top: 30px;">
          Сохранить
        </MyButton>

      </div>

    </div>

  </form>
</template>

<script>
import MyImageInput from "@/components/UI/MyImageInput";
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, MyButton, MyImageInput},
  setup(_, {emit}) {
    const editUserDataRequest = async () => {
      const response = await requestMaker.fetch('edit/user/data', 'POST', {
        user_id: store.state.auth.user.id,
        image: form.image,
        name: form.name
      }, [200, 422, 401, 403])

      switch (response.status) {
        case 200:

          break;
        case 422:

          break;
        case 401:

          break;
        case 403:

          break;
      }

      const avatarName = await response.json()

      if (response.status === 200) {
        store.commit('auth/setAvatar', avatarName)
      }

      emit('avatarChanged', {status: response.status, avatarName})
    }

    const store = useStore()
    const requestMaker = useRequestMaker()
    const form = useForm({'image': undefined, 'name': ''}, editUserDataRequest)

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
