<template>
  <PopUp title="Изменение пароля">
    <form class="form-new-password">

      <MyInput class="form-new-password__input" type="password" placeholder="Старый пароль" v-model="form.oldPassword"/>
      <MyInput class="form-new-password__input" type="password" placeholder="Новый пароль" v-model="form.newPassword"/>
      <MyInput class="form-new-password__input" type="password" placeholder="Введите новый пароль ещё раз" v-model="form.newPasswordConfirmation"/>

      <div class="form-new-password__btn">
        <MyButton @click="form.submit"
                  :load="form.isSending"
                  :white="true">
          Сохранить
        </MyButton>
      </div>

    </form>
  </PopUp>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import useRequestMaker from "@/composables/useRequestMaker";
import MyInput from "@/components/UI/MyInput";
import PopUp from "@/components/popUps/PopUp";
import {useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";

export default {
  components: {PopUp, MyInput, MyButton},
  setup(_, {emit}) {
    const router = useRouter()
    const store = useStore()

    const changeUserPasswordRequest = async () => {
      const response = await requestMaker.fetch('change/user/password', 'POST', {
        old_password: form.oldPassword,
        new_password: form.newPassword,
        new_password_confirmation: form.newPasswordConfirmation
      }, [200, 422, 401, 400])

      switch (response.status) {
        case 200:
          store.commit('notifications/addNotification', {
            text: 'Пароль успешно изменен'
          })
          router.back()
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные, убедитесь что все поля заполнены правильно'
          })
          break;
        case 401:
          store.commit('notifications/addNotification', {
            text: 'Для изменения пароля необходимо авторизоваться'
          })
          break;
        case 400:
          store.commit('notifications/addNotification', {
            text: 'Введен неверный пароль'
          })
          break;
      }
    }

    const requestMaker = useRequestMaker()
    const form = useForm({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }, changeUserPasswordRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">

.form-new-password {
  text-align: right;
  max-width: 350px;

  &__input {
    margin-top: 20px;
  }

  &__btn {
    margin-top: 30px;
  }
}

@media screen and (max-width: 560px) {
  .form-new-password {
    text-align: center;
    margin-top: 30px;
    max-width: 100%;

    &__input {
      margin-top: 30px;
    }

    &__btn {
      margin-top: 70px;
    }
  }
}

</style>
