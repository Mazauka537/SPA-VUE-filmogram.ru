<template>
  <ScrollableBlock>
    <div class="view-home__bg">
      <div class="view-home">
        <div class="container">

          <header class="view-home__header">
            <nav class="view-home__nav container">
              <router-link class="view-home__nav-link" to="'/search">Поиск</router-link>
              <MainLogo class="view-home__logo"/>
              <router-link class="view-home__nav-link" style="text-align: right"
                           :to="$store.state.auth.user ? '/user/' + $store.state.auth.user.id : '/auth'">
                {{ $store.state.auth.user ? 'Профиль' : 'Войти' }}
              </router-link>
            </nav>
          </header>

          <section class="view-home__top">
            <div class="view-home__top-inner">
              <h1 class="view-home__title">Добро пожаловать</h1>
              <p class="view-home__desc">
                Создавайте свои коллекции с подборками лучших фильмов и сериалов, делитесь ими с друзьями, ищите любые
                фильмы на ваш вкус
              </p>
              <MyButton class="view-home__begin-btn">Начать</MyButton>
            </div>

            <div class="view-home__arrow">
              <svg width="100%" height="100%" viewBox="0 0 768 768">
                <path
                    d="M169.376 310.624l192 192c12.512 12.512 32.768 12.512 45.248 0l192-192c12.512-12.512 12.512-32.768 0-45.248s-32.768-12.512-45.248 0l-169.376 169.376-169.376-169.376c-12.512-12.512-32.768-12.512-45.248 0s-12.512 32.768 0 45.248z"></path>
              </svg>
            </div>
          </section>

          <section class="view-home__default-collections">
            <div class="view-home__default-collection" v-for="(collection, index) in defaultCollections">
              <DefaultCollection :collection="collection" :is-flipped="index % 2 === 0"/>
            </div>
          </section>

          <BlocksLine style="margin-top: 60px;" title="Популярные коллекции" :items="famousCollections"
                      :is-users="false"/>
          <BlocksLine style="margin-top: 40px;" title="Популярные пользователи" :items="famousUsers"/>

        </div>
      </div>

      <footer class="view-home__footer">
        <div class="view-home__footer-inner container">
          <div class="view-home__beta">
            <h2 class="view-home__beta-title">
              О проекте
            </h2>
            <p class="view-home__beta-text-top">
              Данный сайт находится на стадии разработки, могут возникнуть некоторые неполадки,
              будем рады если вы сообщите нам о каких-либо проблемах сайта, это очень поможет данному проекту
            </p>
            <p class="view-home__beta-text">
              Связаться с разработчиком: filmogram.ru@gmail.com
            </p>
          </div>
          <div class="view-home__support">
            <h2 class="view-home__support-title">
              Есть вопросы?
            </h2>
            <form class="view-home__form">
              <MyTextarea placeholder="Ваш вопрос" v-model="form.text" style="height: 100px"/>
              <MyInput placeholder="Email для отправки ответа" v-model="form.email" style="margin-top: 10px"/>
              <MyButton @click="form.submit" style="margin-top: 30px; width: 100%; font-size: 13px">Отправить</MyButton>
            </form>
          </div>
        </div>
      </footer>

    </div>
  </ScrollableBlock>
</template>

<script>
import ScrollableBlock from "@/components/ScrollableBlock";
import BlocksLine from "@/components/BlocksLine";
import MainLogo from "@/components/MainLogo";
import MyButton from "@/components/UI/MyButton";
import {onMounted, ref} from "vue";
import DefaultCollection from "@/components/DefaultCollection";
import useRequestMaker from "@/composables/useRequestMaker";
import MyInput from "@/components/UI/MyInput";
import MyTextarea from "@/components/UI/MyTextarea";
import useForm from "@/composables/useForm";
import ViewAuth from "@/App";

export default {
  components: {ViewAuth, MyTextarea, MyInput, DefaultCollection, MyButton, MainLogo, BlocksLine, ScrollableBlock},
  setup() {
    const requestMaker = useRequestMaker()

    const defaultCollections = ref([])
    const famousCollections = ref([])
    const famousUsers = ref([])

    const getDefaultCollections = async () => {
      const response = await requestMaker.fetch('get/default/collections')

      defaultCollections.value = await response.json()
    }

    const getFamousCollections = async () => {
      const response = await requestMaker.fetch('get/famous/collections')

      famousCollections.value = await response.json()
    }

    const getFamousUsers = async () => {
      const response = await requestMaker.fetch('get/famous/users')

      famousUsers.value = await response.json()
    }

    const sendLetterToSupport = async () => {

    }

    const form = useForm({
      text: '',
      email: '',
    }, sendLetterToSupport())

    onMounted(() => {
      getDefaultCollections()
      getFamousCollections()
      getFamousUsers()
    })

    return {
      defaultCollections,
      famousCollections,
      famousUsers,
      form
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.container {
  max-width: 1100px;
  margin: 0 auto;
}

.view-home {
  min-height: 100%;
  background: linear-gradient(to bottom, rgba($color-bg-main, 0.8), $color-bg-main 99vh);
  padding: 0 30px 30px 30px;
  color: $color-text-light;

  &__bg {
    height: 100vh;
    background: url("/public/home-bg.jpg") no-repeat top center;
    background-size: cover;
    padding-right: 12px;
  }

  &__header {
    position: absolute;
    width: 100%;
    left: 0;
    top: 0;
    padding: 0 30px;
  }

  &__nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-right: 12px;
  }

  &__logo {
    font-size: 108px;
  }

  &__nav-link {
    font-size: 18px;
    width: 100px;
    cursor: pointer;
  }

  &__top {
    position: relative;
    height: 100vh;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__top-inner {

  }

  &__title {
    font-size: 32px;
  }

  &__desc {
    font-size: 20px;
    max-width: 800px;
    font-weight: 300;
    margin: 40px auto 45px;
  }

  &__begin-btn {
    font-size: 16px;
  }

  &__arrow {
    position: absolute;
    width: 30px;
    height: 30px;
    bottom: 20px;

    svg {
      fill: rgba($color-text-light, 0.3);
      animation: arrow 4s infinite;
    }
  }

  &__default-collection {
    margin-top: 50px;
  }

  &__footer {
    padding: 30px;
    background: $color-bg-footer;
  }

  &__footer-inner {
    display: flex;
    justify-content: space-between;
  }

  &__beta {
    max-width: 350px;
    width: 100%;
    padding-right: 30px;
  }

  &__beta-title {
    padding-bottom: 20px;
  }

  &__beta-text-top {
    padding-bottom: 30px;
    text-align: justify;
  }

  &__support {
    max-width: 350px;
    width: 100%;
  }

  &__support-title {
    padding-bottom: 20px;
  }

  &__form {
    max-width: 350px;
  }
}

@keyframes arrow {
  0% {
    opacity: 0;
    transform: translateY(-40px);
  }
  15% {
    opacity: 0.6;
  }
  25% {
    opacity: 0.6;
  }
  40% {
    opacity: 0;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-40px);
  }
}
</style>
