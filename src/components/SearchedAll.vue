<template>
  <div class="searched-all__wrapper">

    <div class="searched-all__loading" v-if="isItemsLoading">
      <LoadingPanel :size="60"/>
    </div>

    <div class="searched-all__empty"
         v-else-if="searchedItems.films.length === 0 && searchedItems.collections.length === 0 && searchedItems.users.length === 0">
      <h1 class="searched-all__empty-title">
        Ничего не найдено
      </h1>
      По вашему запросу "{{ searchString }}" ничего не найдено
    </div>

    <ScrollableBlock v-else>

      <div class="searched-all">

        <div class="searched-all__top-section">
          <div class="searched-all__best">
            <BestBlocks :film="searchedItems.films[0]"
                        :collection="searchedItems.collections[0]"
                        :user="searchedItems.users[0]"/>
          </div>
          <div class="searched-all__films">
            <div class="searched-all__top-section-title">Фильмы</div>
            <div class="searched-all__film-block"
                 v-for="film in searchedItems.films.slice(0, 4)"
                 @click="$router.push({query: {film: film.filmKp.kinopoiskId}})">
              <FilmBlockMini :film="film" @save="toggleFavorite"
                             @addToCollections="addingToCollectionFilm = film; $router.push({query: {popUp: 'addFilmToCollections'}})"/>
            </div>
          </div>
        </div>

        <BlocksLine v-if="searchedItems.collections.length > 0"
                    style="margin-top: 30px;"
                    :is-users="false"
                    title="Коллекции"
                    :items="searchedItems.collections"
                    :is-short="true"/>

        <BlocksLine v-if="searchedItems.users.length > 0"
                    style="margin-top: 30px;"
                    title="Пользователи"
                    :items="searchedItems.users"
                    :is-short="true"/>

      </div>

    </ScrollableBlock>
  </div>


  <SideFilmBlock/>

  <PopUpsContainer>
    <PopUpAddFilmToCollections v-if="$route.query.popUp === 'addFilmToCollections'"
                               :film="addingToCollectionFilm"
                               @favoriteCollectionChanged="toggleFavorite"/>
  </PopUpsContainer>

</template>

<script>
import {defineAsyncComponent, onMounted, ref, watch} from "vue";
import useSearchAllLoader from "@/composables/useSearchAllLoader";
import ScrollableBlock from "@/components/ScrollableBlock";
import BlocksLine from "@/components/BlocksLine";
import FilmBlockMini from "@/components/FilmBlockMini";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import BestBlocks from "@/components/BestBlocks";
import useToggleFavorite from "@/composables/useToggleFavorite";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";
import SideFilmBlock from "@/components/SideFilmBlock";
import useSearchInput2 from "@/composables/useSearchInput2";
import LoadingPanel from "@/components/LoadingPanel";

export default {
  components: {
    LoadingPanel,
    SideFilmBlock,
    PopUpsContainer,
    PopUpAddFilmToCollections: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilmToCollections')),
    BestBlocks, UserBlock, CollectionBlock, FilmBlockMini, BlocksLine, ScrollableBlock
  },
  props: {
    searchString: String
  },
  setup(props) {
    const {loadSearchedItems, searchedItems, isItemsLoading} = useSearchAllLoader()
    const {toggleFavorite} = useToggleFavorite()
    const {goSearch} = useSearchInput2()

    const addingToCollectionFilm = ref(undefined)

    watch(() => props.searchString, () => goSearch(() => {
      loadSearchedItems(props.searchString)
    }))

    loadSearchedItems(props.searchString)

    return {
      addingToCollectionFilm,
      searchedItems,
      isItemsLoading,
      toggleFavorite
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.searched-all {
  padding: 0 42px 200px 30px;

  &__loading {
    position: relative;
    padding: 100px;
  }

  &__empty {
    padding: 30px 15px;
    text-align: center;
  }

  &__empty-title {

  }

  &__wrapper {
    padding-right: 300px;
    height: 100%;
  }

  &__top-section {
    display: flex;
  }

  &__top-section-title {
    font-size: 22px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
    padding-bottom: 15px;
  }

  &__best {
    width: 415px;
    padding-right: 30px;
    flex-shrink: 0;
  }

  &__films {
    flex-grow: 1;
    min-width: 0;
  }

  &__film-block {
    padding: 8px;
    border-radius: 7px;

    &:hover {
      background: $color-bg-input;
    }
  }
}

@media screen and (max-width: 1460px) {
  .searched-all {
    &__best {
      width: 350px;
      padding-right: 20px;
    }
  }
}

@media screen and (max-width: 1280px) {
  .searched-all {

    &__wrapper {
      padding-right: 0;
    }
  }
}

@media screen and (max-width: 1030px) {
  .searched-all {
    padding: 0 27px 200px 15px;
  }
}

@media screen and (max-width: 900px) {
  .searched-all {
    &__best {
      display: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .searched-all {

    &__top-section-title {
      font-size: 16px;
    }

    &__film-block {
      &:hover {
        background: none;
      }
    }
  }
}
</style>
