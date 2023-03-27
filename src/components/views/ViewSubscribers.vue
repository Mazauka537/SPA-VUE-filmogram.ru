<template>
  <BlocksList title="Подписчики" :items-loader="subscribersLoader"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useSubscribersLoader from "@/composables/useSubscribersLoader";

export default {
  components: {LoadableItemsContainer, BlocksList},
  setup() {
    const {subscribersLoader} = useSubscribersLoader()

    return {
      subscribersLoader,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
