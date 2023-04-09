<template>
  <div class="searching-films">

      <MySearchInput v-model="searchString"/>

      <div class="searching-films__list" ref="elemList">
        <LoadableItemsContainerWithOwnScroll :loader="filmsLoader">
          <div class="searching-films__film" v-for="film in filmsLoader.items" @click="toggleFilm(collection.id, film)">
            <div class="searching-films__film-check">
              <MyCheckbox :checked="film.isInCollection"/>
            </div>
            <div class="searching-films__film-block">
              <FilmBlockMini :film="film" @save="toggleFavorite" style="padding: 10px 10px 10px 0;"/>
            </div>
          </div>
        </LoadableItemsContainerWithOwnScroll>
      </div>

  </div>
</template>

<script>
import MySearchInput from "@/components/UI/MySearchInput";
import MyCheckbox from "@/components/UI/MyCheckbox";
import useFilmsLoader from "@/composables/useFilmsLoader";
import FilmBlockMini from "@/components/FilmBlockMini";
import {onMounted, ref} from "vue";
import SimpleScrollbar from "simple-scrollbar";
import useToggleFavorite from "@/composables/useToggleFavorite";
import useToggleFilm from "@/composables/useToggleFilm";
import LoadableItemsContainerWithOwnScroll from "@/components/LoadableItemsContainerWithOwnScroll";

export default {
  components: {LoadableItemsContainerWithOwnScroll, FilmBlockMini, MyCheckbox, MySearchInput},
  props: {
    collection: Object
  },
  setup() {
    const {filmsLoader, searchString} = useFilmsLoader()
    const elemList = ref()

    const {toggleFavorite} = useToggleFavorite()
    const {toggleFilm} = useToggleFilm()

    onMounted(() => {
      SimpleScrollbar.initEl(elemList.value)
    })

    return {
      elemList,
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

  &__list {
    margin-top: 20px;
    padding-right: 5px;
    padding-bottom: 100px;
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
  }

  &__film-block {
    width: 100%;
    overflow: hidden;
  }
}

</style>
