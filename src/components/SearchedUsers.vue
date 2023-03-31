<template>
  <BlocksList :items-loader="searchedUsersLoader" :is-users="true"/>
</template>

<script>
import BlocksList from "@/components/BlocksList";
import {watch} from "vue";
import useSearchedUsersLoader from "@/composables/useSearchedUsersLoader";

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

<style scoped>

</style>
