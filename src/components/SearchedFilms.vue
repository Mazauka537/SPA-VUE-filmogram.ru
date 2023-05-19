<template>
  <div class="searched-films">

    <div class="searched-films__films-table-head">
      <FilmTableHead/>
    </div>

    <div class="searched-films__films">
      <LoadableItemsContainerWithOwnScroll :loader="searchedFilmsLoader">
        <div class="searched-films__film-block" v-for="(film, index) in searchedFilmsLoader.items" :key="film.film_id">
          <FilmBlock :film="film"
                     :number="index + 1"
                     @save="toggleFavorite"
                     @click="$router.push({query: {film: film.filmKp.kinopoiskId}})"
                     @addToCollection="addingToCollectionFilm = film; $router.push({query: {popUp: 'addFilmToCollections'}})"/>
        </div>
      </LoadableItemsContainerWithOwnScroll>
    </div>

  </div>

  <div class="searched-films__filter-btn" :class="{'searched-films__filter-btn_filtered': isFiltered}"
       @click="$router.push({path: '/search', query: {popUp: 'filter'}})">
    <svg width="100%" height="100%" viewBox="0 0 768 768">
      <path
          d="M136.5 180q19.5 24 43.5 55.5t48.75 63 45 58.5 33 42.75l12.75 15.75v192q0 13.5 9.75 23.25t23.25 9.75h63q13.5 0 23.25-9.75t9.75-23.25v-192l12.75-15.75t33-42.75 45-58.5 48.75-63 43.5-55.5q9-10.5 7.5-22.5t-10.5-21-22.5-9h-444q-13.5 0-22.5 9t-10.5 21 7.5 22.5z"></path>
    </svg>

    Фильтр
  </div>

  <SideFilmBlock/>

  <PopUpsContainer>
    <PopUpFilter v-if="$route.query.popUp === 'filter'"
                 :initial-filter="filmsFilter"
                 @filtered="setFilter"/>
    <PopUpAddFilmToCollections v-else-if="$route.query.popUp === 'addFilmToCollections'"
                               :film="addingToCollectionFilm"
                               @favoriteCollectionChanged="toggleFavorite"/>
  </PopUpsContainer>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import {computed, defineAsyncComponent, onMounted, ref, watch} from "vue";
import useSearchedFilmsLoader from "@/composables/useSearchedFilmsLoader";
import FilmBlock from "@/components/FilmBlock";
import FilmTableHead from "@/components/FilmTableHead";
import useToggleFavorite from "@/composables/useToggleFavorite";
import ScrollableBlock from "@/components/ScrollableBlock";
import LoadableItemsContainerWithOwnScroll from "@/components/LoadableItemsContainerWithOwnScroll";
import {useRouter} from "vue-router/dist/vue-router";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";
import SideFilmBlock from "@/components/SideFilmBlock";
import useSearchInput2 from "@/composables/useSearchInput2";

export default {
  components: {
    SideFilmBlock,
    PopUpFilter: defineAsyncComponent(() => import('@/components/popUps/PopUpFilter')),
    PopUpAddFilmToCollections: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilmToCollections')),
    PopUpsContainer,
    LoadableItemsContainerWithOwnScroll,
    ScrollableBlock,
    FilmTableHead, FilmBlock, BlocksList
  },
  props: {
    searchString: String
  },
  setup(props) {
    const router = useRouter()

    const addingToCollectionFilm = ref(undefined)
    const filmsFilter = ref({
      order: 'NUM_VOTE',
      type: 'ALL',
      genre: 0,
      year_from: '',
      year_to: '',
      rating_from: '',
      rating_to: ''
    })

    const {searchedFilmsLoader} = useSearchedFilmsLoader(filmsFilter)
    const {toggleFavorite} = useToggleFavorite()
    const {goSearch} = useSearchInput2()

    const setFilter = (filter) => {
      filmsFilter.value = filter
      router.back()
      searchedFilmsLoader.reset()
    }

    const isFiltered = computed(() => {
      return filmsFilter.value.order !== 'NUM_VOTE' ||
          filmsFilter.value.type !== 'ALL' ||
          filmsFilter.value.genre !== 0 ||
          filmsFilter.value.year_from !== '' ||
          filmsFilter.value.year_to !== '' ||
          filmsFilter.value.rating_from !== '' ||
          filmsFilter.value.rating_to !== ''

    })

    watch(() => props.searchString, () => goSearch(() => {
      searchedFilmsLoader.setKeyword(props.searchString)
      searchedFilmsLoader.reset()
    }))

    onMounted(() => goSearch(() => {
      searchedFilmsLoader.setKeyword(props.searchString)
      searchedFilmsLoader.reset()
    }))

    return {
      addingToCollectionFilm,
      toggleFavorite,
      searchedFilmsLoader,
      setFilter,
      filmsFilter,
      isFiltered
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.searched-films {
  padding: 0 330px 25px 30px;
  height: 100%;

  &__films {
    height: 100%;
  }

  &__film-block {
    padding: 5px 0;
  }

  &__filter-btn {
    position: fixed;
    right: 330px;
    bottom: 30px;
    padding: 10px 12px;
    font-size: 13px;
    color: $color-text-light;
    background: $color-bg-search-type;
    border-radius: 100px;
    cursor: pointer;
    z-index: 2;

    &:hover {
      background: $color-bg-input;
    }

    &_filtered {

      &:before {
        content: '';
        height: 10px;
        width: 10px;
        border-radius: 50%;
        background: $color-text-light;
        display: block;
        position: absolute;
        top: 0;
        right: 0;
      }
    }

    svg {
      vertical-align: bottom;
      fill: $color-text-light;
      height: 16px;
      width: 16px;
    }
  }
}

@media screen and (max-width: 1280px) {
  .searched-films {
    padding: 0 30px 25px 30px;


    &__filter-btn {
      right: auto;
      left: 230px;
    }
  }
}

@media screen and (max-width: 1030px) {
  .searched-films {
    padding: 0 15px 25px 15px;
  }
}

@media screen and (max-width: 900px) {
  .searched-films {

    &__films-table-head {
      display: none;
    }
  }
}

@media screen and (max-width: 770px) {
  .searched-films {
    padding: 0 15px;

    &__filter-btn {
      right: auto;
      left: 15px;
      bottom: 65px;
    }
  }
}

@media screen and (max-width: 560px) {
  .searched-films {

    &__filter-btn {
      right: 15px;
      left: auto;
    }
  }
}
</style>
