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
    <div class="add-to-collections-block__save">
      <MyButton @click="$emit('save')">Сохранить</MyButton>
    </div>
  </div>
</template>

<script>
import CollectionCheck from "@/components/CollectionCheck";
import {onMounted, ref} from "vue";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import MyButton from "@/components/UI/MyButton";
import LoadingPanel from "@/components/LoadingPanel";

export default {
  components: {LoadingPanel, MyButton, CollectionCheck},
  props: {
    film: Object
  },
  setup({film}, {emit}) {
    const loadCollections = async () => {
      const response = await requestMaker.fetch('get/all/collections', 'GET', {
        user_id: store.state.auth.user.id,
        film_id: film.film_id
      }, [200])

      isCollectionsLoading.value = false
      collections.value = await response.json()
    }

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
        const response = await requestMaker.fetch('toggle/film', 'POST', {
          collection_id: toggledCollection.id,
          film_id: film.film_id
        }, [201, 200])
      }
    }

    const collections = ref([])
    const isCollectionsLoading = ref(true)

    const requestMaker = useRequestMaker()
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      loadCollections()
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
  padding-top: 10px;

  &__load {
    padding: 30px;
  }

  &__save {
    margin-top: 20px;
    text-align: right;
  }
}

</style>
