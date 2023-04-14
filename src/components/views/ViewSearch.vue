<template>
    <div class="view-search">
      <div class="view-search__header">
        <div class="view-search__search">
          <MySearchInput v-model="searchString" :is-loading="isSearching"/>
        </div>
        <div class="view-search__types">
          <SearchTypesList v-model="searchType"/>
        </div>
      </div>

      <div class="view-search__body">
        <SearchedAll v-if="searchType === 'all'" :search-string="searchString" @setLoading="value => {isSearching = value}"/>
        <SearchedCollections v-if="searchType === 'collections'" :search-string="searchString"/>
        <SearchedUsers v-if="searchType === 'users'" :search-string="searchString"/>
        <SearchedFilms v-if="searchType === 'films'" :search-string="searchString"/>
      </div>
    </div>
</template>

<script>
import MySearchInput from "@/components/UI/MySearchInput";
import SearchTypesList from "@/components/SearchTypesList";
import SearchedCollections from "@/components/SearchedCollections";
import {ref} from "vue";
import SearchedUsers from "@/components/SearchedUsers";
import SearchedFilms from "@/components/SearchedFilms";
import SearchedAll from "@/components/SearchedAll";

export default {
  components: {
    SearchedAll,
    SearchedFilms, SearchedUsers, SearchedCollections, SearchTypesList, MySearchInput
  },
  setup() {
    const isSearching = ref(false)
    const searchType = ref('all')
    const searchString = ref('')

    return {
      isSearching,
      searchType,
      searchString,
    }
  }
}
</script>

<style scoped lang="scss">
.view-search {
  height: 100%;
  padding: 10px 30px 30px 30px;

  &__body {
    height: 100%;
    padding-bottom: 105px;
  }

  &__search {
    max-width: 600px;
  }

  &__types {
    padding: 18px 0 20px 0;
  }
}
</style>
