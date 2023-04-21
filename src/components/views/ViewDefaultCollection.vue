<template>
  <template v-if="collection">

    <ScrollableBlock ref="scrollableBlock">

      <div class="view-default-collection">

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
          <FilmTableHead/>

          <LoadableItemsContainer :loader="searchedFilmsLoader" style="margin-top: 15px;"
                                  :scrollable-block="scrollableBlock">
            <div class="view-default-collection__film-block-wrapper" v-for="(film, index) in searchedFilmsLoader.items"
                 :key="film.id">
              <FilmBlock :film="film"
                         style="margin: 5px 0"
                         :number="index + 1"
                         @save="toggleFavorite"
                         @pointerdown="setSelectedFilm(film)"
                         @addToCollection="addingToCollectionFilm = film; $router.push({path: '/default/collection/' + $route.params.id, query: {popUp: 'addFilmToCollection'}})"/>
            </div>
          </LoadableItemsContainer>
        </div>
      </div>

    </ScrollableBlock>


    <InfoBlockFilm v-if="selectedFilm"
                   :film="selectedFilm"
                   @loadMoreInfo="loadAdditionalFilmInfo"/>

    <PopUpsContainer>
      <PopUpAddFilmToCollections v-if="$route.query.popUp === 'addFilmToCollection'"
                                 :film="addingToCollectionFilm"
                                 @favoriteCollectionChanged="toggleFavorite"/>
    </PopUpsContainer>

  </template>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import {defineAsyncComponent, ref} from "vue";
import {useRoute} from "vue-router";
import InfoBlockFilm from "@/components/InfoBlockFilm";
import FilmBlock from "@/components/FilmBlock";
import FilmTableHead from "@/components/FilmTableHead";
import useToggleFavorite from "@/composables/useToggleFavorite";
import useFilmSelection from "@/composables/useFilmSelection";
import useLoadAdditionalFilmInfo from "@/composables/useLoadAdditionalFilmInfo";
import ScrollableBlock from "@/components/ScrollableBlock";
import useSearchedFilmsLoader from "@/composables/useSearchedFilmsLoader";
import useGetCollectionData from "@/composables/useGetCollectionData";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";

export default {
  components: {
    PopUpAddFilmToCollections: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilmToCollections')),
    PopUpsContainer,
    ScrollableBlock,
    FilmTableHead,
    InfoBlockFilm,
    FilmBlock, LoadableItemsContainer
  },
  async setup() {
    const route = useRoute()

    const addingToCollectionFilm = ref(undefined)
    const scrollableBlock = ref(undefined)
    const collection = ref(undefined)


    const {selectedFilm, setSelectedFilm} = useFilmSelection()
    const {loadAdditionalFilmInfo} = useLoadAdditionalFilmInfo()
    const {toggleFavorite} = useToggleFavorite()

    const {getCollectionData} = useGetCollectionData()
    collection.value = await getCollectionData(route.params.id)
    const {searchedFilmsLoader} = useSearchedFilmsLoader(collection)

    return {
      addingToCollectionFilm,
      collection,
      searchedFilmsLoader,
      scrollableBlock,
      selectedFilm,
      toggleFavorite,
      setSelectedFilm,
      loadAdditionalFilmInfo,
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
  padding-right: 300px;

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

  &__open {
    text-transform: uppercase;
    color: $color-text-light;
    font-weight: 700;
    font-size: 13px;
    letter-spacing: 0.1px;
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

  &__owner-avatar {
    padding-right: 5px;

    * {
      vertical-align: middle;
    }

    img {
      height: 25px;
      width: 25px;
      border-radius: 50%;
      background: $color-bg-side;
    }
  }

  &__body {
    background: $color-bg-body;
    padding: 30px 30px 130px 30px;
  }

  &__ctrl-panel {
    padding-bottom: 30px;

    * {
      vertical-align: middle;
    }
  }

  &__save-btn, &__share-btn, &__more-btn {
    display: inline-block;
    height: 40px;
    width: 40px;
    cursor: pointer;

    svg {
      fill: $color-text-light;
    }
  }

  &__save-btn {
    margin-right: 20px;

    &_active {
      svg {
        fill: $color-main;
      }
    }
  }

  &__share-btn {
    margin-right: 20px;
  }

  &__film-block-wrapper {

  }
}
</style>
