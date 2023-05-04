<template>
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
      <SearchedAll v-if="searchType === 'all'" :search-string="searchString"
                   @setLoading="value => isSearching = value"/>
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
  height: 100%;

  &__header {
    padding: 10px 30px 0 30px;
  }

  &__body {
    height: 100%;
    padding-bottom: 105px;
  }

  &__search {
    max-width: 600px;
  }

  &__types {
    padding: 10px 0;
  }
}

@media screen and (max-width: 1030px) {
  .view-search {

    &__header {
      padding: 10px 15px 0 15px;
    }
  }
}

@media screen and (max-width: 400px) {
  .view-search {

    &__types {
      padding: 10px 0 4px 0;
    }
  }
}

</style>
