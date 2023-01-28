<template>
  <div class="add-to-collections-block">
    <div class="add-to-collections-block__header">Добавить в коллекцию</div>
    <div class="add-to-collections-block__list">
      <CollectionCheck v-for="collection in collections"
                       :collection="collection"
                       @click="toggleSelect(collection.id)"/>
    </div>
    <div class="add-to-collections-block__save">
      <MyButtonMini @click="$emit('save')">Сохранить</MyButtonMini>
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
import MyButtonMini from "@/components/UI/MyButtonMini";

export default {
  components: {MyButtonMini, MyButton, CollectionCheck},
  props: {
    filmId: Number
  },
  setup({filmId}, {emit}) {
    const loadCollections = async () => {
      const response = await requestMaker.fetch('get/all/collections', 'GET', {
        user_id: store.state.auth.user.id,
        film_id: filmId
      }, [200])

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

      const response = await requestMaker.fetch('toggle/film', 'POST', {
        collection_id: toggledCollection.id,
        film_id: filmId
      }, [201, 200])
    }

    const collections = ref([])

    const requestMaker = useRequestMaker()
    const store = useStore()
    const route = useRoute()

    onMounted(() => {
      loadCollections()
    })

    return {
      collections,
      toggleSelect
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.add-to-collections-block {

  &__header {
    font-weight: 700;
    padding-bottom: 20px;
  }

  &__save {
    margin-top: 20px;
    text-align: right;
  }
}

</style>
