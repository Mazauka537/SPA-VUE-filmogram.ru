<template>
  <div class="view-subscribers">
    <ViewUsersBase :users-loader="subscribersLoader"/>
  </div>
</template>

<script>
import ViewUsersBase from "@/components/views/ViewUsersBase";
import useSubscribersLoader from "@/composables/useSubscribersLoader";

export default {
  components: {ViewUsersBase},
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
