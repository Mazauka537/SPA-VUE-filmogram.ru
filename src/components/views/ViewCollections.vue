<template>
  <div class="view-collections">
    <ViewCollectionsBase :collections-loader="collectionsLoader"/>
  </div>
</template>

<script>
import useCollectionsLoader from "@/composables/useCollectionsLoader";
import ViewCollectionsBase from "@/components/views/ViewCollectionsBase";

export default {
  components: {ViewCollectionsBase},
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
