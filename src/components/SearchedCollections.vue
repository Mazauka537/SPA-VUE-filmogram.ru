<template>
  <div class="searched-collections">
    <BlocksList :items-loader="searchedCollectionsLoader" :is-users="false"/>
  </div>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import useSearchedCollectionsLoader from "@/composables/useSearchedCollectionsLoader";
import {onMounted, watch} from "vue";
import useSearchInput2 from "@/composables/useSearchInput2";

export default {
  components: {BlocksList},
  props: {
    searchString: String
  },
  setup(props) {
    const {searchedCollectionsLoader} = useSearchedCollectionsLoader()
    const {goSearch} = useSearchInput2()

    watch(() => props.searchString, () => goSearch(() => {
      searchedCollectionsLoader.setKeyword(props.searchString)
      searchedCollectionsLoader.reset()
    }))

    return {
      searchedCollectionsLoader
    }
  }
}
</script>

<style scoped lang="scss">
.searched-collections {
  height: 100%;
}
</style>
