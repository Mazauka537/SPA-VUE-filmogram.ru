<template>
  <form class="form-restore">
    <div class="form-restore__header">
      <MainLogo style="font-size: 60px"/>
      <div class="form-restore__desc">
        Введите email адрес на который был зарегестрирован аккаунт
      </div>
    </div>

    <MyInputIconic type="email" placeholder="Email" icon-class="icon-mail" v-model="form.email"
             style="margin-top: 33px"/>

    <MyButton text="Sign In"
              @click.prevent="form.submit"
              :load="form.isSending"
              style="margin-top: 35px; width: 100%;"
              :white="true">
      Отпраить
    </MyButton>

    <div class="form-restore__login">
      Вспомнили пароль?
      <a class="form-restore__login-link" @click.prevent="$emit('switchForm', 'login')">Войти</a>
    </div>
  </form>
</template>

<script>
import MyButton from '@/components/UI/MyButton'
import MainLogo from "@/components/MainLogo";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";
import {useStore} from "vuex";
import MyInputIconic from "@/components/UI/MyInputIconic";

export default {
  components: {
    MyInputIconic,
    MainLogo,
    MyButton,
  },
  setup(_, {emit}) {
    const store = useStore()
    const requestMaker = useRequestMaker()

    const sendMailRequest = async () => {

      let response = await requestMaker.fetch('restore/password', 'POST', {
        email: form.email,
      })

      switch (response.status) {
        case 200:
          emit('switchForm', 'confirmation')
          break;
        case 404:
          store.commit('notifications/addNotification', {
            text: 'Пользователь с таким email не найден'
          })
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введён не корректный email адрес'
          })
          break;
      }
    }

    const form = useForm({
      email: '',
    }, sendMailRequest)

    return {
      form
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/vars";

.form-restore {
  width: 100%;

  &__header {
    text-align: center;
  }

  &__desc {
    font-size: 14px;
    letter-spacing: 0.1px;
    padding: 15px 30px 0;
  }

  &__login {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 60px;
  }

  &__login-link {
    color: $color-text-light;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
