<template>
  <div class="add-to-collections-block">
    <div class="add-to-collections-block__load" v-if="isCollectionsLoading">
      <LoadingPanel :size="45"/>
    </div>
    <div class="add-to-collections-block__list" v-else>
      <CollectionCheck v-for="collection in collections"
                       :collection="collection"
                       @click="toggleSelect(collection.id)"/>
    </div>
  </div>
</template>

<script>
import CollectionCheck from "@/components/CollectionCheck";
import {onMounted} from "vue";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import MyButton from "@/components/UI/MyButton";
import LoadingPanel from "@/components/LoadingPanel";
import useToggleFilm from "@/composables/useToggleFilm";
import useLoadAllCollections from "@/composables/useLoadAllCollections";

export default {
  components: {LoadingPanel, MyButton, CollectionCheck},
  props: {
    film: Object
  },
  setup({film}, {emit}) {
    const toggleSelect = async collectionId => {
      const toggledCollection = collections.value.find(collection => collection.id === collectionId)
      toggledCollection.isFilmAdded = !toggledCollection.isFilmAdded
      if (toggledCollection.isFilmAdded) {
        toggledCollection.films_count++
      } else {
        toggledCollection.films_count--
      }

      if (route.name === 'collection' && +route.params.id === toggledCollection.id) {
        emit('currentCollectionChanged')
      }

      if (toggledCollection.constant) {
        emit('favoriteCollectionChanged', film)
      }

      if (!toggledCollection.constant) {
        toggleFilm(toggledCollection.id, film)
      }
    }

    const store = useStore()
    const route = useRoute()
    const {toggleFilm} = useToggleFilm()
    const {collections, isCollectionsLoading, loadCollections} = useLoadAllCollections()

    onMounted(() => {
      loadCollections(store.state.auth.user.id, film.film_id)
    })

    return {
      isCollectionsLoading,
      collections,
      toggleSelect
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.add-to-collections-block {

  &__load {
    padding: 30px;
  }

  &__save {
    margin-top: 20px;
    text-align: right;
  }
}

</style>
