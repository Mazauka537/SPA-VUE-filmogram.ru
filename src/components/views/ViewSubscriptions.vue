<template>
  <BlocksPage>
    <BlocksList title="Подписки" :items-loader="subscriptionsLoader"/>
  </BlocksPage>
</template>

<script>
import useSubscriptionsLoader from "@/composables/useSubscriptionsLoader";
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import BlocksPage from "@/components/BlocksPage";

export default {
  components: {BlocksPage, LoadableItemsContainer, BlocksList},
  setup() {
    const {subscriptionsLoader} = useSubscriptionsLoader()

    return {
      subscriptionsLoader,
    }
  }
}
</script>

<style scoped lang="scss">

</style>
