<template>
  <div class="view-subscriptions">
    <ViewUsersBase :users-loader="subscriptionsLoader"/>
  </div>
</template>

<script>
import ViewUsersBase from "@/components/views/ViewUsersBase";
import useSubscriptionsLoader from "@/composables/useSubscriptionsLoader";

export default {
  components: {ViewUsersBase},
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
