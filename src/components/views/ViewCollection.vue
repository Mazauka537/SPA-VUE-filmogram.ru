<template>
  <SplitPage v-if="collection">
    <template #left>
      <div class="view-collection">

        <div class="view-collection__header">
          <div class="view-collection__preview">
            <img :src="defaultPoster">
            <img :src="defaultPoster">
            <img :src="defaultPoster">
            <img :src="defaultPoster">
          </div>
          <div class="view-collection__info">
            <div class="view-collection__open">Открытая коллеция</div>
            <div class="view-collection__name" @click="selectedFilm = undefined">{{ collection.title }}</div>
            <div class="view-collection__main-info">
              <router-link :to="'/user/' + collection.user_id" class="view-collection__owner">
                <span class="view-collection__owner-avatar">
                  <img
                      :src="collection.user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + collection.user.avatar : '/user.jpg'"
                      alt="avatar">
                </span>
                <span class="view-collection__owner-name">{{ collection.user.login }}</span>
              </router-link>&nbsp;&bull;
              <span class="view-collection__likes">0 лайков</span>&nbsp;&bull;
              <span class="view-collection__films_count">{{ collection.films_count }} фильмов</span>
            </div>
          </div>
        </div>

        <div class="view-collection__body">
          <div class="view-collection__ctrl-panel">
            <MyButtonMini @click="popUpAddFilms.show"
                          v-if="$store.getters['auth/isOwner'](collection.user_id)">
              Дополнить
            </MyButtonMini>
          </div>

          <FilmTableHead/>

          <LoadableItemsContainer :loader="collectedFilmsLoader" style="margin-top: 5px;">
            <DragContainer @drop="changeOrder" :disable="!$store.getters['auth/isOwner'](collection.user_id)">
              <DragBlock v-for="(film, index) in sortedFilms" :key="film.id">
                <div class="view-collection__film-block-wrapper" ref="filmBlocks" :data-film-id="film.id">
                  <FilmBlock :film-kp="film.filmKp"
                                     :number="index + 1"
                                     @pointerdown="setSelectedFilm(film)"
                                     @addToCollection="addingToCollectionFilmId = film.filmKp.kinopoiskId; popUpAddToCollections.show()"/>
                </div>
              </DragBlock>
            </DragContainer>
          </LoadableItemsContainer>
        </div>
      </div>
    </template>

    <template #right>
      <InfoBlockFilm v-if="selectedFilm"
                     :film-kp="selectedFilm.filmKp"
                     :collection="collection"
                     @delete="() => deleteFilm(selectedFilm)"
                     @loadMoreInfo="loadMoreFilmInfo"/>
      <InfoBlockCollection v-else
                           :collection="collection"
                           @edit="popUpEditCollection.show"
                           @delete="popUpDeleteCollection.show"/>
    </template>

    <PopUp :pop-up-controller="popUpAddFilms" :center="false">
      <SearchingFilmsBlock/>
    </PopUp>

    <PopUp :pop-up-controller="popUpDeleteCollection">
      <DialogConfirm
          :question="'Вы действительно хотите на всегда удалить коллекцию &quot' + collection.title + '&quot'"
          @yes="deleteCollection"
          @no="popUpDeleteCollection.hide"/>
    </PopUp>

    <PopUp :pop-up-controller="popUpAddToCollections">
      <AddToCollectionsBlock :film-id="addingToCollectionFilmId"
                             @currentCollectionChanged="currentCollectionChanged"
                             @save="popUpAddToCollections.hide"/>
    </PopUp>

    <PopUp :pop-up-controller="popUpEditCollection">
      <FormEditCollection :collection="collection" @collectionEdited="collectionEdited"/>
    </PopUp>

  </SplitPage>
</template>

<script>
import MyButtonMini from "@/components/UI/MyButtonMini";
import PopUp from "@/components/PopUp";
import SearchingFilmsBlock from "@/components/SearchingFilmsBlock";
import DragBlock from "@/components/DragBlock";
import DragContainer from "@/components/DragContainer";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useRequestMaker from "@/composables/useRequestMaker";
import usePopUp from "@/composables/usePopUp";
import {ref, computed, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import InfoBlockCollection from "@/components/InfoBlockCollection";
import InfoBlockFilm from "@/components/InfoBlockFilm";
import DialogConfirm from "@/components/DialogConfirm";
import useCollectedFilmsLoader from "@/composables/useCollectedFilmsLoader";
import useDeleteFilmFromCollection from "@/composables/useDeleteFilmFromCollection";
import useDeleteCollection from "@/composables/useDeleteCollection";
import useChangeFilmOrder from "@/composables/useChangeFilmOrder";
import FilmBlock from "@/components/FilmBlock";
import FormEditCollection from "@/components/forms/FormEditCollection";
import useLoadMoreFilmInfoMyDB from "@/composables/useLoadMoreFilmInfoMyDB";
import AddToCollectionsBlock from "@/components/AddToCollectionsBlock";
import useAddingFilmToCollections from "@/composables/useAddingFilmToCollections";
import SplitPage from "@/components/views/SplitPage";
import FilmTable from "@/components/FilmTable";
import FilmTableHead from "@/components/FilmTableHead";

export default {
  components: {
    FilmTableHead,
    FilmTable,
    SplitPage,
    AddToCollectionsBlock,
    FormEditCollection,
    DialogConfirm,
    InfoBlockFilm,
    InfoBlockCollection,
    FilmBlock, DragContainer, DragBlock, SearchingFilmsBlock, PopUp, MyButtonMini, LoadableItemsContainer
  },
  setup() {
    const getCollection = async () => {
      const response = await requestMaker.fetch('get/collection', 'GET', {
        id: route.params.id
      }, [200, 422, 404])

      switch (response.status) {
        case 200:
          collection.value = await response.json()
          collectedFilmsLoader.reset()
          break;
        case 404:

          break;
      }
    }

    const collectionEdited = (newCollection) => {
      collection.value = newCollection
      popUpEditCollection.hide()
    }

    const collection = ref(undefined)
    const selectedFilm = ref(undefined)
    const filmBlocks = ref(undefined)

    const sortedFilms = computed(() => {
      return collectedFilmsLoader.items.sort((filmA, filmB) => filmB.order - filmA.order)
    })

    const setSelectedFilm = (film) => {
      selectedFilm.value = film
    }

    const route = useRoute()
    const requestMaker = useRequestMaker()
    const {collectedFilmsLoader} = useCollectedFilmsLoader(collection)
    const popUpAddFilms = usePopUp(() => collectedFilmsLoader.reset())
    const popUpDeleteCollection = usePopUp()
    const popUpEditCollection = usePopUp()
    const {loadMoreFilmInfo} = useLoadMoreFilmInfoMyDB(collectedFilmsLoader)
    const {deleteFilm} = useDeleteFilmFromCollection(collection, collectedFilmsLoader, filmBlocks, setSelectedFilm)
    const {deleteCollection} = useDeleteCollection(collection)
    const {changeOrder} = useChangeFilmOrder(sortedFilms)
    const {
      currentCollectionChanged,
      addingToCollectionFilmId,
      popUpAddToCollections
    } = useAddingFilmToCollections(collectedFilmsLoader)


    watch(() => route.params.id, async () => {
      getCollection()
    })

    onMounted(async () => {
      await getCollection()
    })

    return {
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
      collection,
      selectedFilm,
      addingToCollectionFilmId,
      collectedFilmsLoader,
      popUpAddFilms,
      popUpDeleteCollection,
      popUpEditCollection,
      popUpAddToCollections,
      sortedFilms,
      changeOrder,
      deleteFilm,
      deleteCollection,
      collectionEdited,
      currentCollectionChanged,
      filmBlocks,
      setSelectedFilm,
      loadMoreFilmInfo
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.view-collection {
  background: $color-bg-header;
  height: 100%;

  &__header {
    display: flex;
    justify-content: left;
    align-items: end;
    padding: 30px 30px 24px 30px;
  }

  &__preview {
    height: 240px;
    width: 240px;

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
      margin-left: 126px;
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
    height: 100%;
    padding: 30px;
  }

  &__ctrl-panel {

  }

  &__film-block-wrapper {
    padding: 5px 0;
  }
}
</style>
