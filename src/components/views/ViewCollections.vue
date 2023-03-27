<template>
  <BlocksList title="Открытые коллекции" :items-loader="collectionsLoader"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useCollectionsLoader from "@/composables/useCollectionsLoader";

export default {
  components: {LoadableItemsContainer, BlocksList},
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
