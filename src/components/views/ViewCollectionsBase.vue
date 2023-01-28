<template>
  <LoadableItemsContainer :loader="collectionsLoader">
    <router-link class="collection-block-link"
                 v-for="collection in collectionsLoader.items"
                 :key="collection.id"
                 :to="'/collection/' + collection.id">
      <CollectionBlock :collection="collection"
                       @toggleSaves="collectionId => toggleSave(collectionsLoader.items, collectionId)"/>
    </router-link>
  </LoadableItemsContainer>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import CollectionBlock from "@/components/CollectionBlock";
import {useRoute} from "vue-router/dist/vue-router";
import useToggleSave from "@/composables/useToggleSave";
import {onMounted, watch} from "vue";

export default {
  components: {LoadableItemsContainer, CollectionBlock},
  props: {
    collectionsLoader: Object
  },
  setup(props) {
    const route = useRoute()
    const {toggleSave} = useToggleSave()

    watch(() => route.params.id, () => {
      props.collectionsLoader.reset()
    })

    return {
      toggleSave
    }
  }
}
</script>

<style scoped lang="scss">

.collection-block-link {
  padding: 10px 0;
  display: block;
}
</style>
