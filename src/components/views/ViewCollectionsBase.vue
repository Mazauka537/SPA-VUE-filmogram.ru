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
import useToggleSave from "@/composables/useToggleSave";

export default {
  components: {LoadableItemsContainer, CollectionBlock},
  props: {
    collectionsLoader: Object
  },
  setup() {
    const {toggleSave} = useToggleSave()

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
