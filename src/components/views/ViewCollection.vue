<template>
  <template v-if="collection">

    <ScrollableBlock ref="scrollableBlock">

      <div class="view-collection">

        <BackPageBtn/>

        <div class="view-collection__header">
          <div class="view-collection__preview">
            <template v-if="collection.image">
              <img style="height: 100%; width: 100%; margin: 0; object-fit: cover"
                   ref="elemPreviewImg"
                   :src="'http://127.0.0.1:8000/storage/images/collections/' + collection.image + '?=1'">
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
            <span class="view-collection__btn" v-if="$store.getters['auth/isOwner'](collection.user_id)">
            <MyButton @click="$router.push({path: '/collection/' + $route.params.id, query: {popUp: 'addFilms'}})">
              Дополнить
            </MyButton>
            </span>
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

          <div class="view-collection__films-table-head">
            <FilmTableHead/>
          </div>

          <LoadableItemsContainer :loader="collectedFilmsLoader" style="margin-top: 15px;"
                                  :scrollable-block="scrollableBlock">
            <DragContainer @drop="changeOrder" :disable="!$store.getters['auth/isOwner'](collection.user_id)">
              <DragBlock v-for="(film, index) in sortedFilms" :key="film.id">
                <div class="view-collection__film-block-wrapper" ref="elemsFilmBlocks" :data-film-id="film.id">
                  <FilmBlock :film="film"
                             style="margin: 5px 0"
                             :number="index + 1"
                             :collection="collection"
                             @save="toggleFavorite"
                             @pointerdown="$router.push({query: {film: film.filmKp.kinopoiskId}})"
                             @delete="deleteFilm(film)"
                             @addToCollection="addingToCollectionFilm = film; $router.push({path: '/collection/' + $route.params.id, query: {popUp: 'addFilmToCollections'}})"/>
                </div>
              </DragBlock>
            </DragContainer>
          </LoadableItemsContainer>
        </div>
      </div>

    </ScrollableBlock>


    <SideFilmBlock/>


    <PopUpsContainer>
      <PopUpEditCollection v-if="$route.query.popUp === 'editCollection'"
                           :collection="collection"
                           @collectionEdited="onCollectionEdited"/>
      <PopUpDeleteCollection v-else-if="$route.query.popUp === 'deleteCollection'"
                             :collection="collection"/>
      <PopUpAddFilms v-else-if="$route.query.popUp === 'addFilms'"
                     :collection="collection"
                     @close="collectedFilmsLoader.reset()"/>
      <PopUpAddFilmToCollections v-else-if="$route.query.popUp === 'addFilmToCollections'"
                                 :film="addingToCollectionFilm"
                                 @favoriteCollectionChanged="toggleFavorite"
                                 @close="onCurrentCollectionChanged"/>
    </PopUpsContainer>

  </template>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import DragBlock from "@/components/DragBlock";
import DragContainer from "@/components/DragContainer";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import {ref, computed, onMounted, watch} from "vue";
import {useRoute} from "vue-router";
import useDeleteFilmFromCollection from "@/composables/useDeleteFilmFromCollection";
import useChangeFilmOrder from "@/composables/useChangeFilmOrder";
import FilmBlock from "@/components/FilmBlock";
import FilmTable from "@/components/FilmTable";
import FilmTableHead from "@/components/FilmTableHead";
import MoreBtn from "@/components/UI/MoreBtn";
import ShareBtn from "@/components/UI/ShareBtn";
import useToggleCollectionPublic from "@/composables/useToggleCollectionPublic";
import useToggleSave from "@/composables/useToggleSave";
import SaveBtn from "@/components/UI/SaveBtn";
import useToggleFavorite from "@/composables/useToggleFavorite";
import useGetCollection from "@/composables/useGetCollection";
import ScrollableBlock from "@/components/ScrollableBlock";
import {useRouter} from "vue-router/dist/vue-router";
import {defineAsyncComponent} from "vue";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";
import BackPageBtn from "@/components/BackPageBtn";
import SideFilmBlock from "@/components/SideFilmBlock";

export default {
  components: {
    SideFilmBlock,
    BackPageBtn,
    PopUpsContainer,
    PopUpAddFilmToCollections: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilmToCollections')),
    PopUpAddFilms: defineAsyncComponent(() => import('@/components/popUps/PopUpAddFilms')),
    PopUpEditCollection: defineAsyncComponent(() => import('@/components/popUps/PopUpEditCollection')),
    PopUpDeleteCollection: defineAsyncComponent(() => import('@/components/popUps/PopUpDeleteCollection')),
    ScrollableBlock,
    SaveBtn,
    ShareBtn,
    MoreBtn,
    FilmTableHead,
    FilmTable,
    FilmBlock, DragContainer, DragBlock, MyButton, LoadableItemsContainer
  },
  setup() {
    const elemsFilmBlocks = ref(undefined)
    const scrollableBlock = ref(undefined)
    const elemPreviewImg = ref(undefined)

    const addingToCollectionFilm = ref(undefined)

    const sortedFilms = computed(() => {
      return collectedFilmsLoader.items.sort((filmA, filmB) => filmB.order - filmA.order)
    })

    const route = useRoute()
    const router = useRouter()
    const {collection, collectedFilmsLoader, getCollection} = useGetCollection()
    const {deleteFilm} = useDeleteFilmFromCollection(collection, collectedFilmsLoader, elemsFilmBlocks)
    const {changeOrder} = useChangeFilmOrder(sortedFilms)
    const {toggleCollectionPublic} = useToggleCollectionPublic()
    const {toggleSave} = useToggleSave()
    const {toggleFavorite} = useToggleFavorite()

    const onCollectionEdited = (newCollection) => {
      collection.value = newCollection
      if (elemPreviewImg.value) {
        elemPreviewImg.value.src += '1'
      }
      router.back()
    }

    const onCurrentCollectionChanged = (isCurrentCollectionToggled) => {
      if (isCurrentCollectionToggled) {
        collectedFilmsLoader.reset()
      }
    }

    const moreBtnOptions = [{
      text: () => 'Изменить сведения',
      onClick: () => {
        router.push({path: '/collection/' + route.params.id, query: {popUp: 'editCollection'}})
      }
    }, {
      text: () => 'Удалить коллекцию',
      onClick: () => {
        router.push({path: '/collection/' + route.params.id, query: {popUp: 'deleteCollection'}})
      }
    }, {
      text: () => collection.value.public ? 'Сделать приватной' : 'Сделать общедоступной',
      onClick: () => {
        toggleCollectionPublic(collection.value)
      }
    }]

    watch(() => route.params.id, () => {
      getCollection(route.params.id)
    })

    onMounted(() => {
      getCollection(route.params.id)
    })

    return {
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
      elemPreviewImg,
      onCollectionEdited,
      onCurrentCollectionChanged,
      scrollableBlock,
      moreBtnOptions,
      collection,
      addingToCollectionFilm,
      collectedFilmsLoader,
      sortedFilms,
      changeOrder,
      deleteFilm,
      toggleSave,
      toggleFavorite,
      elemsFilmBlocks,
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

  &__btn {
    margin-right: 25px;
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

@media screen and (max-width: 1460px) {
  .view-collection {

    &__preview {
      height: 180px;
      width: 180px;

      img:nth-child(4) {
        width: 120px;
        height: 180px;
        margin-left: -136px;
      }

      img:nth-child(3) {
        width: 108px;
        height: 162px;
        margin-left: -123px;
      }

      img:nth-child(2) {
        width: 96px;
        height: 144px;
        margin-left: -111px;
      }

      img:nth-child(1) {
        width: 84px;
        height: 126px;
        margin-left: 80px;
      }
    }

    &__name {
      font-size: 48px;
      padding: 15px 0 37px;
    }
  }
}

@media screen and (max-width: 1280px) {
  .view-collection {
    padding-right: 0;
  }
}

@media screen and (max-width: 1030px) {
  .view-collection {

    &__header {
      padding: 15px;
    }

    &__body {
      padding: 15px 15px 130px 15px;
    }
  }
}

@media screen and (max-width: 900px) {
  .view-collection {
    &__ctrl-panel {
      padding-bottom: 0;
    }

    &__films-table-head {
      display: none;
    }
  }
}

@media screen and (max-width: 560px) {
  .view-collection {
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

    &__open {
      display: none;
    }

    &__name {
      font-size: 16px;
      padding: 10px 0 7px 0;
    }

    &__body {
      background: none;
      padding: 10px 15px 130px 15px;
    }

    &__btn {
      margin-right: 15px;
    }

    &__more-btn, &__share-btn {
      height: 36px;
      width: 36px;
    }

    &__share-btn {
      margin-right: 10px;
    }
  }
}
</style>
