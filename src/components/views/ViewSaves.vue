<template>
  <BlocksPage title="Сохранненые коллекции"
              :items-loader="savesLoader"
              :is-users="false"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useSavesLoader from "@/composables/useSavesLoader";
import BlocksPage from "@/components/BlocksPage";

export default {
  components: {BlocksPage, LoadableItemsContainer, BlocksList},
  setup() {
    const {savesLoader} = useSavesLoader()

    return {
      savesLoader,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
