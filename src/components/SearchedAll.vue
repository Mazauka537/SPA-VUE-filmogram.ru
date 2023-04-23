<template>
  <ScrollableBlock
      v-if="searchedItems.films.length > 0 || searchedItems.collections.length > 0 || searchedItems.users.length > 0">
    <div class="searched-all">

      <div class="searched-all__top-section">
        <div class="searched-all__best">
          <BestBlocks :film="searchedItems.films[0]"
                      :collection="searchedItems.collections[0]"
                      :user="searchedItems.users[0]"
                      @filmSelected="setSelectedFilm"/>
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

      <BlocksLineShort v-if="searchedItems.collections.length > 0"
                       style="margin-top: 30px;"
                       :is-users="false"
                       title="Коллекции"
                       :items="searchedItems.collections"/>

      <BlocksLine v-if="searchedItems.users.length > 0"
                  style="margin-top: 30px;"
                  title="Пользователи"
                  :items="searchedItems.users"/>

    </div>
  </ScrollableBlock>


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
import BlocksLineShort from "@/components/BlocksLineShort";
import useToggleFavorite from "@/composables/useToggleFavorite";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";
import SideFilmBlock from "@/components/SideFilmBlock";

export default {
  components: {
    SideFilmBlock,
    PopUpsContainer,
    BlocksLineShort,
    PopUpAddFilmToCollections: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilmToCollections')),
    BestBlocks, UserBlock, CollectionBlock, FilmBlockMini, BlocksLine, ScrollableBlock
  },
  props: {
    searchString: String
  },
  setup(props, {emit}) {
    const {loadSearchedItems, searchedItems} = useSearchAllLoader()
    const {toggleFavorite} = useToggleFavorite()

    const addingToCollectionFilm = ref(undefined)

    let isSearchingCount = 0

    const goSearch = async () => {
      isSearchingCount++
      emit('setLoading', true)
      await loadSearchedItems(props.searchString)
      isSearchingCount--
      if (isSearchingCount === 0) {
        emit('setLoading', false)
      }
    }

    watch(() => props.searchString, goSearch)

    onMounted(goSearch)

    return {
      addingToCollectionFilm,
      searchedItems,
      toggleFavorite
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.searched-all {
  padding-right: 300px;

  &__top-section {
    display: flex;
    padding-right: 18px;
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
    padding-right: 0;
  }
}

@media screen and (max-width: 900px) {
  .searched-all {
    &__best {
      display: none;
    }
  }
}
</style>
