<template>
  <div v-if="collection">

    <SplitPage>

      <template #left>
        <div class="view-collection">

          <div class="view-collection__header">
            <div class="view-collection__preview">
              <template v-if="collection.image">
                <img style="height: 100%; width: 100%; margin: 0; object-fit: cover"
                     :src="'http://127.0.0.1:8000/storage/images/collections/' + collection.image">
              </template>
              <template v-else-if="collection.image">
                <img style="height: 100%; width: 100%; margin: 0; object-fit: cover"
                     :src="'http://127.0.0.1:8000/storage/images/collections/' + collection.image">
              </template>
              <template v-else>
                <img :src="sortedFilms[3] ? sortedFilms[3].filmKp.posterUrlPreview : defaultPoster">
                <img :src="sortedFilms[2] ? sortedFilms[2].filmKp.posterUrlPreview : defaultPoster">
                <img :src="sortedFilms[1] ? sortedFilms[1].filmKp.posterUrlPreview : defaultPoster">
                <img :src="sortedFilms[0] ? sortedFilms[0].filmKp.posterUrlPreview : defaultPoster">
              </template>

            </div>
            <div class="view-collection__info">
              <div class="view-collection__open">{{
                  collection.public ? 'Открытая коллеция' : 'Закрытая коллекция'
                }}
              </div>
              <div class="view-collection__name" @click="selectedFilm = undefined">{{ collection.title }}</div>
              <div class="view-collection__main-info">
                <router-link :to="'/user/' + collection.user_id" class="view-collection__owner">
                <span class="view-collection__owner-avatar">
                  <img
                      :src="collection.user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + collection.user.avatar : '/user.jpg'"
                      alt="avatar">
                </span>
                  <span class="view-collection__owner-name">{{ collection.user.name }}</span>
                </router-link>&nbsp;&bull;
                <span class="view-collection__likes">0 лайков</span>&nbsp;&bull;
                <span class="view-collection__films_count">{{ collection.films_count }} фильмов</span>
              </div>
            </div>
          </div>

          <div class="view-collection__body">
            <div class="view-collection__ctrl-panel" v-if="!collection.constant">
              <MyButton @click="popUpAddFilms.show"
                        v-if="$store.getters['auth/isOwner'](collection.user_id)"
                        style="margin-right: 25px;">
                Дополнить
              </MyButton>
              <button class="view-collection__save-btn"
                      v-if="!$store.getters['auth/isOwner'](collection.user.id)"
                      @click="toggleSave(collection)">
                <SaveBtn :active="collection.isInSaves"/>
              </button>
              <button class="view-collection__share-btn">
                <ShareBtn :link="window.location.origin + '/collection/' + collection.id"/>
              </button>
              <button class="view-collection__more-btn" v-if="$store.getters['auth/isOwner'](collection.user.id)">
                <MoreBtn :options="moreBtnOptions"/>
              </button>
            </div>

            <FilmTableHead/>

            <LoadableItemsContainer :loader="collectedFilmsLoader" style="margin-top: 15px;">
              <DragContainer @drop="changeOrder" :disable="!$store.getters['auth/isOwner'](collection.user_id)">
                <DragBlock v-for="(film, index) in sortedFilms" :key="film.id">
                  <div class="view-collection__film-block-wrapper" ref="filmBlocks" :data-film-id="film.id">
                    <FilmBlock :film="film"
                               style="margin: 5px 0"
                               :number="index + 1"
                               @save="toggleFavorite"
                               @pointerdown="setSelectedFilm(film)"
                               @delete="deleteFilm(film)"
                               @addToCollection="addingToCollectionFilm = film; popUpAddToCollections.show()"/>
                  </div>
                </DragBlock>
              </DragContainer>
            </LoadableItemsContainer>
          </div>
        </div>
      </template>

      <template #right>
        <InfoBlockFilm v-if="selectedFilm"
                       :film="selectedFilm"
                       :collection="collection"
                       @loadMoreInfo="loadMoreFilmInfo"/>
        <InfoBlockCollection v-else
                             :collection="collection"
                             @edit="popUpEditCollection.show"
                             @delete="popUpDeleteCollection.show"/>
      </template>

    </SplitPage>

    <PopUp :pop-up-controller="popUpAddFilms" :center="false" :title="'Поиск фильмов в коллекцию ' + collection.title">
      <SearchingFilmsBlock :collection="collection" @close="popUpAddFilms.hide" style="margin-top: 30px;"/>
    </PopUp>

    <PopUp :pop-up-controller="popUpDeleteCollection" :title="'Удалить коллекцию &quot' + collection.title + '&quot?'">
      <DialogConfirm
          @yes="deleteCollection"
          @no="popUpDeleteCollection.hide"/>
    </PopUp>

    <PopUp :pop-up-controller="popUpAddToCollections" title="Добавить в коллекцию">
      <AddToCollectionsBlock :film="addingToCollectionFilm"
                             @currentCollectionChanged="currentCollectionChanged"
                             @favoriteCollectionChanged="favoriteCollectionChanged"
                             @save="popUpAddToCollections.hide"/>
    </PopUp>

    <PopUp :pop-up-controller="popUpEditCollection" title="Изменение сведений">
      <FormEditCollection style="margin-top: 30px;" :collection="collection" @collectionEdited="collectionEdited"/>
    </PopUp>

  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
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
import SplitPage from "@/components/views/SplitPage";
import FilmTable from "@/components/FilmTable";
import FilmTableHead from "@/components/FilmTableHead";
import MoreBtn from "@/components/UI/MoreBtn";
import ShareBtn from "@/components/UI/ShareBtn";
import useToggleCollectionPublic from "@/composables/useToggleCollectionPublic";
import useToggleSave from "@/composables/useToggleSave";
import SaveBtn from "@/components/UI/SaveBtn";
import useToggleFavorite from "@/composables/useToggleFavorite";

export default {
  components: {
    SaveBtn,
    ShareBtn,
    MoreBtn,
    FilmTableHead,
    FilmTable,
    SplitPage,
    AddToCollectionsBlock,
    FormEditCollection,
    DialogConfirm,
    InfoBlockFilm,
    InfoBlockCollection,
    FilmBlock, DragContainer, DragBlock, SearchingFilmsBlock, PopUp, MyButton, LoadableItemsContainer
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

    const collection = ref(undefined)
    const selectedFilm = ref(undefined)
    const filmBlocks = ref(undefined)
    const addingToCollectionFilm = ref(undefined)

    const moreBtnOptions = [{
      text: () => 'Изменить сведения',
      onClick: () => {
        popUpEditCollection.show()
      }
    }, {
      text: () => 'Удалить коллекцию',
      onClick: () => {
        popUpDeleteCollection.show()
      }
    }, {
      text: () => collection.value.public ? 'Сделать приватной' : 'Сделать общедоступной',
      onClick: () => {
        toggleCollectionPublic(collection.value)
      }
    }]


    const collectionEdited = (newCollection) => {
      collection.value = newCollection
      popUpEditCollection.hide()
    }

    const sortedFilms = computed(() => {
      return collectedFilmsLoader.items.sort((filmA, filmB) => filmB.order - filmA.order)
    })

    const setSelectedFilm = (film) => {
      selectedFilm.value = film
    }

    const currentCollectionChanged = () => {
      popUpAddToCollections.onHide = () => {
        collectedFilmsLoader.reset()
        popUpAddToCollections.onHide = undefined
      }
    }

    const favoriteCollectionChanged = (film) => {
      toggleFavorite(film)
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
    const {toggleCollectionPublic} = useToggleCollectionPublic()
    const {toggleSave} = useToggleSave()
    const {toggleFavorite} = useToggleFavorite()
    const popUpAddToCollections = usePopUp()

    watch(() => route.params.id, async () => {
      getCollection()
    })

    onMounted(async () => {
      await getCollection()
    })

    return {
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
      moreBtnOptions,
      collection,
      selectedFilm,
      addingToCollectionFilm,
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
      favoriteCollectionChanged,
      toggleSave,
      toggleFavorite,
      filmBlocks,
      setSelectedFilm,
      loadMoreFilmInfo,
      window
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
    height: 100%;
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
