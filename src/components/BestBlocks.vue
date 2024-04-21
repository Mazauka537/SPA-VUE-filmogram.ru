<template>
  <div class="best-blocks">
    <div class="best-blocks__title">Лучший результат: фильм</div>
    <div class="best-blocks__film" @click="$router.push({query: {film: film.filmKp.kinopoiskId}})">
      <FilmBlockMini v-if="film" :film="film"/>
    </div>
    <div class="best-blocks__title" style="margin-top: 30px;">Коллекция, пользователь</div>
    <div class="best-blocks__split">
      <CollectionBlock v-if="collection" :collection="collection"/>
      <NotFoundBlock v-else text="Коллекции не найдены"/>
      <UserBlock v-if="user" :user="user"/>
      <NotFoundBlock v-else text="Пользователи не найдены"/>
    </div>
  </div>
</template>

<script>
import FilmBlockMini from "@/components/FilmBlockMini";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import NotFoundBlock from "@/components/NotFoundBlock";

export default {
  components: {NotFoundBlock, UserBlock, CollectionBlock, FilmBlockMini},
  props: {
    film: Object,
    collection: Object,
    user: Object
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.best-blocks {

  &__title {
    font-size: 22px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
    padding-bottom: 15px;
  }

  &__film {
    padding: 15px 15px 15px 15px;
    background: $color-bg-side;
    border-radius: 7px;

    &:hover {
      background: $color-bg-input;
    }
  }

  &__split {
    display: flex;
    justify-content: space-between;
  }
}
</style>
