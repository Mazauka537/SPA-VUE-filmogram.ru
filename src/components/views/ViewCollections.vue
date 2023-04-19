<template>
  <BlocksPage>
    <BlocksList :title="$store.getters['auth/isOwner']($route.params.id) ? 'Мои коллекции' : 'Открытые коллекции'"
                :items-loader="collectionsLoader"
                :is-users="false"/>
  </BlocksPage>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useCollectionsLoader from "@/composables/useCollectionsLoader";
import BlocksPage from "@/components/BlocksPage";

export default {
  components: {BlocksPage, LoadableItemsContainer, BlocksList},
  setup() {
    const {collectionsLoader} = useCollectionsLoader()

    return {
      collectionsLoader,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
