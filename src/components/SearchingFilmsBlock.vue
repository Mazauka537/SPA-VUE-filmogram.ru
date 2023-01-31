<template>
  <div class="searching-films">
    <div class="searching-films__header">
      <div class="searching-films__title">
        Поиск фильмов в коллекцию {{ collection.title }}
      </div>
      <div class="searching-films__close" @click="$emit('close')"></div>
    </div>

    <div class="searching-films__body">
      <MySearchInput v-model="searchString"/>

      <div class="searching-films__list" ref="elemList">
        <LoadableItemsContainer :loader="filmsLoader">
          <div class="searching-films__film" v-for="film in filmsLoader.items" @click="toggleFilm(film)">
            <div class="searching-films__film-check">
              <MyCheckbox :checked="film.isInCollection"/>
            </div>
            <div class="searching-films__film-block">
              <FilmBlockMini :film-kp="film"/>
            </div>
          </div>
        </LoadableItemsContainer>
      </div>

    </div>
  </div>
</template>

<script>
import MySearchInput from "@/components/UI/MySearchInput";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import MyCheckbox from "@/components/UI/MyCheckbox";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router";
import useFilmsLoader from "@/composables/useFilmsLoader";
import FilmBlockMini from "@/components/FilmBlockMini";
import {onMounted, ref} from "vue";
import SimpleScrollbar from "simple-scrollbar";

export default {
  components: {FilmBlockMini, MyCheckbox, LoadableItemsContainer, MySearchInput},
  props: {
    collection: Object
  },
  setup() {
    const route = useRoute()
    const requestMaker = useRequestMaker()
    const {filmsLoader, searchString} = useFilmsLoader()
    const elemList = ref()

    const toggleFilm = async film => {
      film.isInCollection = !film.isInCollection

      const response = await requestMaker.fetch('toggle/film', 'POST', {
        collection_id: route.params.id,
        film_id: film.kinopoiskId,
      }, [201, 200, 401, 403, 422])
    }


    onMounted(() => {
      SimpleScrollbar.initEl(elemList.value)
    })

    return {
      elemList,
      searchString,
      filmsLoader,
      toggleFilm,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.searching-films {
  height: 100%;

  &__header {
    color: $color-text;
    font-size: 16px;
    padding: 15px 20px;
    background: $color-bg-input;
    position: relative;
  }

  &__title {
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__close {
    position: absolute;
    right: 20px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    height: 15px;
    width: 15px;

    &:hover {
      &:after, &:before {
        background: $color-text-light;
      }
    }

    &:after, &:before {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      background: $color-text;
      border-radius: 50px;
      position: absolute;
      left: 0;
      top: 50%;
    }

    &:after {
      transform: translateY(-50%) rotate(45deg);
    }

    &:before {
      transform: translateY(-50%) rotate(-45deg);
    }
  }

  &__body {
    background: $color-bg-side;
    padding: 20px;
    height: 100%;
  }

  &__list {
    margin-top: 20px;
    padding-right: 5px;
    padding-bottom: 100px;
    height: 100%;
  }

  &__film {
    padding: 10px;
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
