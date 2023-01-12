<template>
  <form class="form-login">
    <div class="form-login__header">
      <MainLogo style="font-size: 60px"/>
    </div>

    <MyInput type="text" placeholder="Email или Логин" icon-class="icon-person" v-model="form.login"
              style="margin-top: 33px"/>
    <MyInput type="password" placeholder="Пароль" icon-class="icon-lock" v-model="form.password"
              style="margin-top: 40px"/>

    <div class="form-login__forgot">
      <a class="form-login__forgot-link" @click.prevent="$emit('switchForm', 'restore')">Забыли пароль?</a>
    </div>

    <MyButton text="Sign In" @click.prevent="form.submit" :load="form.isSending">Войти</MyButton>

    <div class="form-login__or">
      или
    </div>

    <div class="form-login__socials">
      <SocialsList/>
    </div>

    <div class="form-login__register">
      Ещё нет аккаунта?
      <a class="form-login__register-link" @click.prevent="$emit('switchForm', 'register')">Зарегистрироваться</a>
    </div>
  </form>
</template>

<script>
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import MainLogo from "@/components/MainLogo";
import SocialsList from "@/components/SocialsList";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";

export default {
  components: {
    MainLogo,
    MyInput,
    MyButton,
    SocialsList,
  },
  setup() {
    const requestMaker = useRequestMaker()
    const store = useStore()
    const router = useRouter()

    const loginRequest = async () => {
      let response = await requestMaker.fetch('login', 'POST', {
        login: form.login,
        password: form.password
      }, [200, 422, 404])

      switch (response.status) {
        case 200:
          let userData = await response.json()
          localStorage.setItem('token', userData.token)
          store.commit('auth/setUser', userData.user)

          router.push('/user/' + userData.user.id)
          break;
        case 422:

          break;
        case 404:

          break;
      }
    }

    const form = useForm({
      login: '',
      password: '',
    }, loginRequest)

    return {
      form
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/vars";

.form-login {
  width: 100%;

  &__header {
    text-align: center;
  }

  &__forgot {
    text-align: right;
    padding-top: 10px;
    padding-bottom: 25px;
  }

  &__forgot-link {
    font-size: 13px;
    letter-spacing: 0.1px;
    color: $color-text-light;
    cursor: pointer;
  }

  &__or {
    text-align: center;
    font-size: 18px;
    padding-top: 40px;

    &:before, &:after {
      content: '';
      display: inline-block;
      border: 1px solid $color-text;
      width: 40px;
      vertical-align: middle;
    }
  }

  &__socials {
    padding: 25px 40px;
  }

  &__register {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 30px;
  }

  &__register-link {
    color: $color-text-light;
    cursor: pointer;
  }
}
</style>
