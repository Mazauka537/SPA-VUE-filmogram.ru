<template>
  <div class="block-list">
    <div class="block-list__title">{{ title }}</div>
    <LoadableItemsContainer :loader="itemsLoader">
      <router-link class="user-block-link"
                   v-for="item in itemsLoader.items"
                   :key="item.id"
                   :to="(isUsers ? '/user/' : '/collection/') + item.id">
        <div class="block-list__block">
          <UserBlock v-if="isUsers" :user="item"/>
          <CollectionBlock v-else :collection="item"/>
        </div>
      </router-link>
    </LoadableItemsContainer>
  </div>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";

export default {
  components: {UserBlock, CollectionBlock, LoadableItemsContainer},
  props: {
    isUsers: {
      type: Boolean,
      default: true
    },
    title: String,
    itemsLoader: Object
  }
}
</script>

<style scoped>

</style>
