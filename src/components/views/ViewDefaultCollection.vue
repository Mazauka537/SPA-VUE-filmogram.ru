<template>
  <template v-if="collection">

    <ScrollableBlock ref="scrollableBlock">

      <div class="view-default-collection">

        <HeadBar :title="collection.title"/>

        <div class="view-default-collection__header">
          <div class="view-default-collection__preview">
            <img style="height: 100%; width: 100%; margin: 0; object-fit: cover"
                 :src="'http://127.0.0.1:8000/storage/images/defaultCollections/' + collection.image">
          </div>
          <div class="view-default-collection__info">
            <div class="view-default-collection__name" @click="selectedFilm = undefined">{{ collection.title }}</div>
            <div class="view-default-collection__main-info">
              100 фильмов
            </div>
          </div>
        </div>

        <div class="view-default-collection__body">

          <div class="view-default-collection__films-table-head">
            <FilmTableHead/>
          </div>

          <LoadableItemsContainer :loader="searchedFilmsLoader" style="margin-top: 15px;"
                                  :scrollable-block="scrollableBlock">
            <div class="view-default-collection__film-block-wrapper" v-for="(film, index) in searchedFilmsLoader.items"
                 :key="film.id">
              <FilmBlock :film="film"
                         style="margin: 10px 0"
                         :number="index + 1"
                         @save="toggleFavorite"
                         @pointerdown="$router.push({query: {film: film.filmKp.kinopoiskId}})"
                         @addToCollection="addingToCollectionFilm = film; $router.push({query: {popUp: 'addFilmToCollections'}})"/>
            </div>
          </LoadableItemsContainer>
        </div>
      </div>

    </ScrollableBlock>


    <SideFilmBlock/>

    <PopUpsContainer>
      <PopUpAddFilmToCollections v-if="$route.query.popUp === 'addFilmToCollections'"
                                 :film="addingToCollectionFilm"
                                 @favoriteCollectionChanged="toggleFavorite"/>
    </PopUpsContainer>

  </template>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import {defineAsyncComponent, ref} from "vue";
import {useRoute} from "vue-router";
import FilmBlock from "@/components/FilmBlock";
import FilmTableHead from "@/components/FilmTableHead";
import useToggleFavorite from "@/composables/useToggleFavorite";
import ScrollableBlock from "@/components/ScrollableBlock";
import useSearchedFilmsLoader from "@/composables/useSearchedFilmsLoader";
import useGetCollectionData from "@/composables/useGetCollectionData";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";
import SideFilmBlock from "@/components/SideFilmBlock";
import HeadBar from "@/components/HeadBar";

export default {
  components: {
    HeadBar,
    SideFilmBlock,
    PopUpAddFilmToCollections: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilmToCollections')),
    PopUpsContainer,
    ScrollableBlock,
    FilmTableHead,
    FilmBlock, LoadableItemsContainer
  },
  async setup() {
    const route = useRoute()

    const addingToCollectionFilm = ref(undefined)
    const scrollableBlock = ref(undefined)
    const collection = ref(undefined)

    const {toggleFavorite} = useToggleFavorite()
    const {getCollectionData} = useGetCollectionData()
    collection.value = await getCollectionData(route.params.id)
    const {searchedFilmsLoader} = useSearchedFilmsLoader(collection)

    return {
      addingToCollectionFilm,
      collection,
      searchedFilmsLoader,
      scrollableBlock,
      toggleFavorite,
      window
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.view-default-collection {
  background: $color-bg-header;
  height: 100%;
  padding-right: 312px;

  &__header {
    display: flex;
    justify-content: left;
    align-items: end;
    padding: 30px 30px 24px 30px;
  }

  &__preview {
    height: 240px;
    width: 240px;
    flex-shrink: 0;

    img {
      vertical-align: middle;
      background: #fff;
    }

    img:nth-child(4) {
      width: 160px;
      height: 240px;
      margin-left: -186px;
    }

    img:nth-child(3) {
      width: 144px;
      height: 216px;
      margin-left: -170px;
    }

    img:nth-child(2) {
      width: 128px;
      height: 192px;
      margin-left: -154px;
    }

    img:nth-child(1) {
      width: 112px;
      height: 168px;
      margin-left: 128px;
    }
  }

  &__info {
    padding-left: 25px;
  }

  &__name {
    font-size: 72px;
    color: $color-text-light;
    font-weight: 700;
    padding: 20px 0 40px;
  }

  &__main-info {
    color: $color-text-light;

    a:hover {
      text-decoration: underline;
    }
  }

  &__body {
    background: $color-bg-body;
    padding: 30px 30px 130px 30px;
  }

  &__film-block-wrapper {

  }
}

@media screen and (max-width: 1460px) {
  .view-default-collection {

    &__preview {
      height: 180px;
      width: 180px;
    }

    &__name {
      font-size: 48px;
      padding: 15px 0 37px;
    }
  }
}

@media screen and (max-width: 1280px) {
  .view-default-collection {
    padding-right: 12px;
  }
}

@media screen and (max-width: 1030px) {
  .view-default-collection {

    &__header {
      padding: 15px;
    }

    &__body {
      padding: 15px 15px 130px 15px;
    }
  }
}

@media screen and (max-width: 900px) {
  .view-default-collection {

    &__films-table-head {
      display: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .view-default-collection {
    background: $color-bg-header-media2;

    &__header {
      display: block;
      padding: 15px 15px 0 15px;
    }

    &__preview {
      margin: 0 auto;
    }

    &__info {
      padding-left: 0;
    }

    &__name {
      font-size: 16px;
      padding: 10px 0 7px 0;
    }

    &__body {
      background: none;
      padding: 10px 15px 130px 15px;
    }
  }
}

</style>
