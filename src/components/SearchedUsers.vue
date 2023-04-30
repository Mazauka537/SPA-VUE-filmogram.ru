<template>
  <div class="searched-users">
    <BlocksList :items-loader="searchedUsersLoader" :is-users="true"/>
  </div>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import useSearchedUsersLoader from "@/composables/useSearchedUsersLoader";
import {watch} from "vue";

export default {
  components: {BlocksList},
  props: {
    searchString: String
  },
  setup(props) {
    const {searchedUsersLoader, callback} = useSearchedUsersLoader()

    watch(() => props.searchString, () => {
      callback(props.searchString)
    })

    return {
      searchedUsersLoader
    }
  }
}
</script>

<style scoped lang="scss">
.searched-users {
  height: 100%;
  padding: 0 30px;
}


@media screen and (max-width: 1030px) {
  .searched-users {
    padding: 0 15px;
  }
}
</style>
