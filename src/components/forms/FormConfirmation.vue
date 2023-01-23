<template>
  <form class="form-confirmation">
    <div class="form-confirmation__header">
      <MainLogo style="font-size: 60px"/>
      <div class="form-confirmation__desc">
        Мы отправили письмо на ваш email, введите код из этого письма для восстановления пароля
      </div>
    </div>

    <MyInput type="text" placeholder="Код из письма" icon-class="icon-mail" v-model="form.code"
              style="margin-top: 33px"/>
    <MyInput type="password" placeholder="Новый пароль" icon-class="icon-lock" v-model="form.password"
              style="margin-top: 33px"/>

    <MyButton text="Sign In"
              @click.prevent="form.submit"
              :load="form.isSending"
              :disabled="form.code.length === 0 || form.password.length === 0"
              style="margin: 35px 0" >
      Сменить пароль
    </MyButton>

    <div class="form-confirmation__back">
      <a class="form-restore__login-link" @click.prevent="$emit('switchForm', 'restore')">Вернуться назад</a>
    </div>

  </form>
</template>

<script>
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import MainLogo from "@/components/MainLogo";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";
import {useStore} from "vuex";

export default {
  components: {
    MainLogo,
    MyInput,
    MyButton,
  },
  setup(_, {emit}) {
    const store = useStore()
    const requestMaker = useRequestMaker()

    const setNewPasswordRequest = async () => {
      let response = await requestMaker.fetch('set/new/password', 'POST', {
        code: form.code,
        password: form.password,
      })

      switch (response.status) {
        case 200:
          emit('switchForm', 'login')
          store.commit('notifications/addNotification', {
            text: 'Пароль успшно изменён. Теперь вы можете войти в аккаунт используя новый пароль'
          })
          break;
        case 404:
          store.commit('notifications/addNotification', {
            text: 'Введён не валидный код'
          })
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Пароль должен состоять из 6-16 символов'
          })
          break;
        case 405:
          const responseData = await response.json()
          console.log(responseData)
          store.commit('notifications/addNotification', {
            text: responseData
          })
          break;
      }
    }

    const form = useForm({
      code: '',
      password: '',
    }, setNewPasswordRequest)

    return {
      form
    }
  }
}
</script>

<style lang="scss">

.form-confirmation {
  width: 100%;

  &__header {
    text-align: center;
  }

  &__desc {
    letter-spacing: 0.1px;
    padding: 15px 30px 0;
  }

  &__back {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 60px;
  }
}
</style>
