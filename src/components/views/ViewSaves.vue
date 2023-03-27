<template>
  <BlocksList title="Сохранненые коллекции" :items-loader="savesLoader"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useSavesLoader from "@/composables/useSavesLoader";

export default {
  components: {LoadableItemsContainer, BlocksList},
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
