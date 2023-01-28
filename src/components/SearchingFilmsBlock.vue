<template>
  <div class="searching-films">
    <div class="searching-films__header">
      <MySearchInput v-model="searchString"/>
    </div>
    <div class="searching-films__list">
      <LoadableItemsContainer :loader="filmsLoader">
        <div class="searching-films__film" v-for="film in filmsLoader.items" @click="toggleFilm(film)">
          <div class="searching-films__film-check">
            <MyCheckbox :checked="film.isInCollection"/>
          </div>
          <div class="searching-films__film-block">
            <FilmBlock :film-kp="film"/>
          </div>
        </div>
      </LoadableItemsContainer>
    </div>
  </div>
</template>

<script>
import MySearchInput from "@/components/UI/MySearchInput";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import FilmBlock from "@/components/FilmBlock";
import MyCheckbox from "@/components/UI/MyCheckbox";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRoute} from "vue-router";
import useFilmsLoader from "@/composables/useFilmsLoader";

export default {
  components: {MyCheckbox, FilmBlock, LoadableItemsContainer, MySearchInput},
  setup() {
    const route = useRoute()
    const requestMaker = useRequestMaker()
    const {filmsLoader, searchString} = useFilmsLoader()

    const toggleFilm = async film => {
      film.isInCollection = !film.isInCollection

      const response = await requestMaker.fetch('toggle/film', 'POST', {
        collection_id: route.params.id,
        film_id: film.kinopoiskId,
      }, [201, 200, 401, 403, 422])
    }

    return {
      searchString,
      filmsLoader,
      toggleFilm,
    }
  }
}
</script>

<style scoped lang="scss">

.searching-films {

  &__list {
    margin-top: 20px;
    padding-right: 5px;
  }

  &__film {
    margin-top: 20px;
    display: flex;
    align-items: center;
    justify-content: stretch;
    flex-wrap: nowrap;
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
