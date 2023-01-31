<template>
  <LoadableItemsContainer :loader="usersLoader">
    <router-link class="user-block-link"
                 v-for="user in usersLoader.items"
                 :key="user.id"
                 :to="'/user/' + user.id">
      <UserBlock :user="user"/>
    </router-link>
  </LoadableItemsContainer>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import UserBlock from "@/components/UserBlock";

export default {
  components: {UserBlock, LoadableItemsContainer},
  props: {
    usersLoader: Object
  },
  setup() {

  }
}
</script>

<style scoped lang="scss">

.collection-block-link {
  padding: 10px 0;
  display: block;
}
</style>
