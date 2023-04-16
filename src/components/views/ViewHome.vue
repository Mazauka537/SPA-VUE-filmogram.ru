<template>
  <ScrollableBlock>
    <div class="view-home">

      <header class="view-home__header">
        <MainLogo style="font-size: 128px; color:#FFF;"/>
        <h1 class="view-home__hello">Добро пожаловать</h1>
        <p class="view-home__desc">
          Создавайте свои коллекции с подборками лучших фильмов и не только, и делитесь ими с друзьями
        </p>
      </header>

      <section class="view-home__home-collections">
      </section>

      <section class="view-home__create-btn">
        <MyButton style="font-size: 20px; padding: 10px 20px;">Создать свою коллекцию</MyButton>
      </section>

      <BlocksLine title="Популярные коллекции" :items="famousCollections" :is-users="false"/>
      <BlocksLine title="Популярные пользователи" :items="famousUsers"/>

      <footer class="view-home__footer">
        <div class="view-home__beta">

        </div>
        <div class="view-home__support">

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
import {ref} from "vue";

export default {
  components: {MyButton, MainLogo, BlocksLine, ScrollableBlock},
  setup() {
    const famousCollections = ref([])
    const famousUsers = ref([])

    return {
      famousCollections,
      famousUsers
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.view-home {

  &__header {
    text-align: center;
    padding: 50px 0;
  }

  &__hello {
    margin-top: 40px;
    font-size: 54px;
    color: $color-text-light;
    font-weight: bold;
  }

  &__desc {
    margin-top: 40px;
    font-size: 28px;
    color: $color-text-light;
  }

  &__create-btn {
    text-align: center;
  }
}

</style>
