<template>
  <BlocksPage title="Подписчики"
              :items-loader="subscribersLoader"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import useSubscribersLoader from "@/composables/useSubscribersLoader";
import BlocksPage from "@/components/BlocksPage";

export default {
  components: {BlocksPage, LoadableItemsContainer, BlocksList},
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
