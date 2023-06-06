<template>
  <form class="form-register">
    <div class="form-register__header">
      <MainLogo style="font-size: 60px"/>
      <div class="form-register__desc">
        зарегистрируйтесь чтобы иметь возможность создавать свои коллекции и подписываться на других пользователей
      </div>
    </div>

    <MyInputIconic type="text" placeholder="Имя" icon-class="icon-person" v-model="form.name"
             style="margin-top: 33px"/>
    <MyInputIconic type="email" placeholder="Email" icon-class="icon-mail" v-model="form.email"
             style="margin-top: 40px"/>
    <MyInputIconic type="password" placeholder="Пароль" icon-class="icon-lock" v-model="form.password"
             style="margin-top: 40px"/>

    <MyButton text="Sign Up"
              @click.prevent="form.submit"
              style="margin-top: 45px; width: 100%;"
              :white="true"
              :load="form.isSending"
              :disabled="form.name.length === 0 || form.email.length === 0 || form.password.length === 0">
      Зарегистрироваться
    </MyButton>

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
import MyButton from '@/components/UI/MyButton'
import SocialsList from '@/components/SocialsList'
import MainLogo from "@/components/MainLogo";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";
import useForm from "@/composables/useForm";
import MyInputIconic from "@/components/UI/MyInputIconic";

export default {
  components: {
    MyInputIconic,
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
        name: form.name,
        email: form.email,
        password: form.password
      }, [201, 422, 406])

      switch (response.status) {
        case 201:
          let userData = await response.json()
          localStorage.setItem('token', userData.token)
          store.commit('auth/setUser', userData.user)
          store.dispatch('collections/loadCollections')

          router.push('/user/' + userData.user.id)
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные, убедитесь что все поля заполнены правильно'
          })
          break;
        case 406:
          store.commit('notifications/addNotification', {
            text: 'Данный Email уже используется'
          })
          break;
      }
    }

    const form = useForm({
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
  padding-bottom: 50px;

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
    max-width: 250px;
    margin: 40px auto;
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
