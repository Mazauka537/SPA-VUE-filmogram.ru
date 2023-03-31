<template>
  <SplitPage>
    <template #left>
      <div class="view-search">
        <div class="view-search__header">
          <div class="view-search__search">
            <MySearchInput v-model="searchString"/>
          </div>
          <div class="view-search__types">
            <SearchTypesList v-model="searchType"/>
          </div>
        </div>

        <div class="view-search__body">
          <SearchedCollections v-if="searchType === 'collections'" :search-string="searchString"/>
          <SearchedUsers v-if="searchType === 'users'" :search-string="searchString"/>
        </div>
      </div>
    </template>

    <template #right>

    </template>
  </SplitPage>
</template>

<script>
import SplitPage from "@/components/views/SplitPage";
import MySearchInput from "@/components/UI/MySearchInput";
import SearchTypesList from "@/components/SearchTypesList";
import SearchedCollections from "@/components/SearchedCollections";
import {ref} from "vue";
import SearchedUsers from "@/components/SearchedUsers";

export default {
  components: {SearchedUsers, SearchedCollections, SearchTypesList, MySearchInput, SplitPage},
  setup() {

    const searchType = ref('all')
    const searchString = ref('')

    return {
      searchType,
      searchString,
    }
  }
}
</script>

<style scoped lang="scss">
.view-search {
  padding: 10px 30px 30px 30px;

  &__types {
    padding-top: 18px;
  }
}
</style>
