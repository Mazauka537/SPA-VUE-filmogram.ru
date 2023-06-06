<template>
  <div class="socials">
    <div class="socials__item" @click="client.requestCode">
      <svg width="100%" height="100%" viewBox="0 0 512 512">
        <path
            d="M261.1 219.4v87.8h145.2c-5.9 37.7-43.9 110.4-145.2 110.4-87.4 0-158.7-72.4-158.7-161.6s71.3-161.6 158.7-161.6c49.7 0 83 21.2 102 39.5l69.5-66.9c-44.6-41.8-102.4-67-171.5-67-141.5 0-256 114.5-256 256s114.5 256 256 256c147.7 0 245.8-103.9 245.8-250.1 0-16.8-1.8-29.6-4-42.4l-241.8-0.1z"></path>
      </svg>
      <span class="socials__text">
        Войти с помощью Google
      </span>
    </div>
  </div>
</template>

<script>

import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";

export default {
  setup() {
    const requestMaker = useRequestMaker()
    const store = useStore()
    const router = useRouter()

    const client = google.accounts.oauth2.initCodeClient({
      client_id: '124116094811-dkj3g2ucqlfro5fk9d785nfs44ksdfmt.apps.googleusercontent.com',
      scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
      ux_mode: 'popup',
      redirect_uri: "https://localhost:8080/search",
      callback: async (googleResponse) => {
        const response = await requestMaker.fetch('google/auth', 'POST', {
          code: googleResponse.code
        }, [200, 403])

        switch (response.status) {
          case 200:
            let userData = await response.json()
            localStorage.setItem('token', userData.token)
            store.commit('auth/setUser', userData.user)
            store.dispatch('collections/loadCollections')

            router.push('/user/' + userData.user.id)
            break;
          case 403:
            store.commit('notifications/addNotification', {
              text: 'Данный Email уже зарегистрирован с помощью формы. Для входа в аккаунт с данным Email используйте форму авторизации с вводом пароля'
            })
            break;
        }
      }
    });

    return {
      client
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/assets/styles/vars";

.socials {

  &__item {
    cursor: pointer;
    text-align: center;
    border-radius: 50px;
    border: 1px solid $color-text-light;
    color: $color-text-light;
    padding: 5px;

  }

  svg {
    fill: $color-text-light;
    height: 25px;
    width: 35px;
    padding-right: 10px;
    vertical-align: middle;
  }

  &__text {
    vertical-align: middle;
  }
}
</style>
