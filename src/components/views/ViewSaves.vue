<template>
  <div class="view-saves">
    <ViewCollectionsBase :collections-loader="savesLoader"/>
  </div>
</template>

<script>
import ViewCollectionsBase from "@/components/views/ViewCollectionsBase";
import useSavesLoader from "@/composables/useSavesLoader";

export default {
  components: {ViewCollectionsBase},
  setup() {
    const {savesLoader} = useSavesLoader()

    return {
      savesLoader,
    }
  }
}
</script>

<style scoped>

</style>
