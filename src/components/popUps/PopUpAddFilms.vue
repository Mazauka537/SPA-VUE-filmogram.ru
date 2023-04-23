<template>
  <PopUp :full-screen="true" :title="'Поиск фильмов в коллекцию ' + collection.title" @close="$emit('close')">
    <div class="searching-films">

      <MySearchInput v-model="searchString"/>

      <div class="searching-films__list">
        <LoadableItemsContainerWithOwnScroll :loader="filmsLoader">
          <div class="searching-films__film" v-for="film in filmsLoader.items" @click="toggleFilm(collection.id, film)">
            <div class="searching-films__film-check">
              <MyCheckbox :checked="film.isInCollection"/>
            </div>
            <div class="searching-films__film-block">
              <FilmBlockMini :film="film" @save="toggleFavorite" :is-more-btn-visible="false" style="padding: 10px 10px 10px 0;"/>
            </div>
          </div>
        </LoadableItemsContainerWithOwnScroll>
      </div>

    </div>
  </PopUp>
</template>

<script>
import MySearchInput from "@/components/UI/MySearchInput";
import MyCheckbox from "@/components/UI/MyCheckbox";
import useFilmsLoader from "@/composables/useFilmsLoader";
import FilmBlockMini from "@/components/FilmBlockMini";
import useToggleFavorite from "@/composables/useToggleFavorite";
import useToggleFilm from "@/composables/useToggleFilm";
import LoadableItemsContainerWithOwnScroll from "@/components/LoadableItemsContainerWithOwnScroll";
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp, LoadableItemsContainerWithOwnScroll, FilmBlockMini, MyCheckbox, MySearchInput},
  props: {
    collection: Object
  },
  setup() {
    const {filmsLoader, searchString} = useFilmsLoader()

    const {toggleFavorite} = useToggleFavorite()
    const {toggleFilm} = useToggleFilm()

    return {
      searchString,
      filmsLoader,
      toggleFilm,
      toggleFavorite
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.searching-films {
  height: 100%;
  width: 100%;
  max-width: 560px;

  &__list {
    margin-top: 20px;
    padding-bottom: 35px;
    height: 100%;
  }

  &__film {
    padding: 0 0 0 10px;
    display: flex;
    align-items: center;
    justify-content: stretch;
    flex-wrap: nowrap;

    &:hover {
      background: $color-bg-input;
    }
  }

  &__film-check {
    width: 30px;
    flex-shrink: 0;
  }

  &__film-block {
    flex-grow: 1;
    min-width: 0;
    overflow: hidden;
  }
}

</style>
