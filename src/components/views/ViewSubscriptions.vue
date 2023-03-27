<template>
  <BlocksList title="Подписки" :items-loader="subscriptionsLoader"/>
</template>

<script>
import useSubscriptionsLoader from "@/composables/useSubscriptionsLoader";
import BlocksList from "@/components/BlocksList";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";

export default {
  components: {LoadableItemsContainer, BlocksList},
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
