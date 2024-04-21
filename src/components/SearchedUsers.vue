<template>
  <div class="searched-users">
    <BlocksList :items-loader="searchedUsersLoader" :is-users="true"/>
  </div>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import useSearchedUsersLoader from "@/composables/useSearchedUsersLoader";
import {onMounted, watch} from "vue";
import useSearchInput2 from "@/composables/useSearchInput2";

export default {
  components: {BlocksList},
  props: {
    searchString: String
  },
  setup(props) {
    const {searchedUsersLoader} = useSearchedUsersLoader()
    const {goSearch} = useSearchInput2()

    watch(() => props.searchString, () => goSearch(() => {
      searchedUsersLoader.setKeyword(props.searchString)
      searchedUsersLoader.reset()
    }))

    return {
      searchedUsersLoader
    }
  }
}
</script>

<style scoped lang="scss">
.searched-users {
  height: 100%;
}
</style>
