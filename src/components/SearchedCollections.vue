<template>
  <div class="searched-collections">
    <BlocksList :items-loader="searchedCollectionsLoader" :is-users="false"/>
  </div>
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

<style scoped lang="scss">
.searched-collections {
  height: 100%;
  padding: 0 30px;
}


@media screen and (max-width: 1030px) {
  .searched-collections {
    padding: 0 15px;
  }
}
</style>
