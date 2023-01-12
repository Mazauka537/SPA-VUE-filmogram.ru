<template>
  <form class="form-register">
    <div class="form-register__header">
      <MainLogo style="font-size: 60px"/>
      <div class="form-register__desc">
        зарегистрируйтесь чтобы иметь возможность создавать свои коллекции и подписываться на других пользователей
      </div>
    </div>

    <MyInput type="text" placeholder="Имя" icon-class="icon-person" v-model="form.name"
             style="margin-top: 33px"/>
    <MyInput type="text" placeholder="Логин" icon-class="icon-person" v-model="form.login"
             style="margin-top: 33px"/>
    <MyInput type="email" placeholder="Email" icon-class="icon-mail" v-model="form.email"
              style="margin-top: 40px"/>
    <MyInput type="password" placeholder="Пароль" icon-class="icon-lock" v-model="form.password"
              style="margin-top: 40px"/>

    <MyButton text="Sign Up" @click.prevent="form.submit" style="margin-top: 45px" :load="form.isSending">Зарегистрироваться</MyButton>

    <div class="form-register__or">
      или
    </div>

    <div class="form-register__socials">
      <SocialsList/>
    </div>

    <div class="form-register__login">
      Уже есть аккаунт?
      <a class="form-register__login-link" @click.prevent="$emit('switchForm', 'login')">Войти</a>
    </div>
  </form>
</template>

<script>
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import SocialsList from '../SocialsList'
import MainLogo from "@/components/MainLogo";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";
import useForm from "@/composables/useForm";

export default {
  components: {
    MyInput,
    MyButton,
    SocialsList,
    MainLogo
  },
  setup() {
    const requestMaker = useRequestMaker()
    const store = useStore()
    const router = useRouter()

    const registerRequest = async () => {
      let response = await requestMaker.fetch('register', 'POST', {
        login: form.login,
        name: form.name,
        email: form.email,
        password: form.password
      }, [201, 422, 406])

      switch (response.status) {
        case 201:
          let userData = await response.json()
          localStorage.setItem('token', userData.token)
          store.commit('auth/setUser', userData.user)

          router.push('/profile')
          break;
        case 422:

          break;
        case 406:

          break;
      }
    }

    const form = useForm({
      login: '',
      name: '',
      email: '',
      password: ''
    }, registerRequest)

    return {
      form
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/vars";

.form-register {
  width: 100%;

  &__header {
    text-align: center;
  }

  &__desc {
    font-size: 14px;
    letter-spacing: 0.1px;
    padding: 15px 30px 0;
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

  &__login {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 30px;
  }

  &__login-link {
    color: $color-text-light;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
