<template>
  <div class="searched-films">

    <FilmTableHead/>
    <LoadableItemsContainer :loader="searchedFilmsLoader">
      <div class="searched-films__film-block" v-for="(film, index) in searchedFilmsLoader.items" :key="film.film_id">
        <FilmBlock :film="film"
                   :number="index + 1"
                   @save="toggleFavorite"
                   @pointerdown="selectedFilm = film"
                   @addToCollection="addingToCollectionFilm = film; popUpAddToCollections.show()"/>
      </div>
    </LoadableItemsContainer>

  </div>

  <div class="searched-films__filter-btn" :class="{'searched-films__filter-btn_filtered': isFiltered}"
       @click="popUpFilter.show">
    <svg width="100%" height="100%" viewBox="0 0 768 768">
      <path
          d="M136.5 180q19.5 24 43.5 55.5t48.75 63 45 58.5 33 42.75l12.75 15.75v192q0 13.5 9.75 23.25t23.25 9.75h63q13.5 0 23.25-9.75t9.75-23.25v-192l12.75-15.75t33-42.75 45-58.5 48.75-63 43.5-55.5q9-10.5 7.5-22.5t-10.5-21-22.5-9h-444q-13.5 0-22.5 9t-10.5 21 7.5 22.5z"></path>
    </svg>

    Фильтр
  </div>

  <InfoBlockFilm v-if="selectedFilm"
                 :film="selectedFilm"
                 @loadMoreInfo="loadAdditionalFilmInfo"/>

  <PopUp :pop-up-controller="popUpAddToCollections" title="Добавить в коллекцию">
    <AddToCollectionsBlock :film="addingToCollectionFilm"
                           @currentCollectionChanged="currentCollectionChanged"
                           @favoriteCollectionChanged="favoriteCollectionChanged"/>
  </PopUp>

  <PopUp :pop-up-controller="popUpFilter" :closable="false" title="Фильтр поиска фильмов">
    <FormFilmsFilter @filtered="setFilter" :initial-filter="filmsFilter"/>
  </PopUp>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import {computed, ref, watch} from "vue";
import useSearchedFilmsLoader from "@/composables/useSearchedFilmsLoader";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import FilmBlock from "@/components/FilmBlock";
import FilmTableHead from "@/components/FilmTableHead";
import InfoBlockFilm from "@/components/InfoBlockFilm";
import useLoadAdditionalFilmInfo from "@/composables/useLoadAdditionalFilmInfo";
import useToggleFavorite from "@/composables/useToggleFavorite";
import PopUp from "@/components/PopUp";
import AddToCollectionsBlock from "@/components/AddToCollectionsBlock";
import useAddingFilmToCollections from "@/composables/useAddingFilmToCollections";
import ScrollableBlock from "@/components/ScrollableBlock";
import FormFilmsFilter from "@/components/forms/FormFilmsFilter";
import usePopUp from "@/composables/usePopUp";

export default {
  components: {
    FormFilmsFilter,
    ScrollableBlock,
    AddToCollectionsBlock,
    PopUp, InfoBlockFilm, FilmTableHead, FilmBlock, LoadableItemsContainer, BlocksList
  },
  props: {
    searchString: String
  },
  setup(props) {
    const selectedFilm = ref(undefined)
    const filmsFilter = ref({
      order: 'NUM_VOTE',
      type: 'ALL',
      genre: 0,
      year_from: '',
      year_to: '',
      rating_from: '',
      rating_to: ''
    })

    const {toggleFavorite} = useToggleFavorite()
    const {loadAdditionalFilmInfo} = useLoadAdditionalFilmInfo()
    const {searchedFilmsLoader, callback} = useSearchedFilmsLoader(filmsFilter)
    const popUpFilter = usePopUp()
    const {
      addingToCollectionFilm,
      popUpAddToCollections,
      currentCollectionChanged,
      favoriteCollectionChanged
    } = useAddingFilmToCollections(searchedFilmsLoader, toggleFavorite)

    const setFilter = (filter) => {
      filmsFilter.value = filter
      popUpFilter.hide()
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

    watch(() => props.searchString, () => {
      callback(props.searchString)
    })

    return {
      toggleFavorite,
      searchedFilmsLoader,
      selectedFilm,
      loadAdditionalFilmInfo,
      addingToCollectionFilm,
      popUpAddToCollections,
      currentCollectionChanged,
      favoriteCollectionChanged,
      popUpFilter,
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
  padding-right: 300px;
  height: 100%;

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
    background: $color-bg-search-item;
    border-radius: 100px;
    cursor: pointer;
    z-index: 3;

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
</style>
