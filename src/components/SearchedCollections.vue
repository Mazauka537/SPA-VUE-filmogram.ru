<template>
  <BlocksList :items-loader="searchedCollectionsLoader" :is-users="false"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import useSearchedCollectionsLoader from "@/composables/useSearchedCollectionsLoader";
import {watch} from "vue";

export default {
  components: {BlocksList},
  props: {
    searchString: String
  },
  setup(props) {
    const {searchedCollectionsLoader, callback} = useSearchedCollectionsLoader()

    watch(() => props.searchString, () => {
      callback(props.searchString)
    })

    return {
      searchedCollectionsLoader
    }
  }
}
</script>

<style scoped>

</style>
