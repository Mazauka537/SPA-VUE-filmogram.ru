<template>
  <ScrollableBlock>
    <div class="nav-collections">
      <LoadingPanel v-if="$store.state.collections.isLoading" :size="40"/>
      <template v-else>
        <CollectionBlockMini v-for="collection in $store.state.collections.collections" :key="collection.id" :collection="collection"/>
      </template>
    </div>
  </ScrollableBlock>
</template>

<script>
import ScrollableBlock from "@/components/ScrollableBlock";
import {onMounted} from "vue";
import CollectionBlockMini from "@/components/CollectionBlockMini";
import LoadingPanel from "@/components/LoadingPanel";
import MyButton from "@/components/UI/MyButton";
import {useStore} from "vuex";

export default {
  components: {MyButton, LoadingPanel, CollectionBlockMini, ScrollableBlock},
  setup() {
    const store = useStore()


    onMounted(() => {
      store.dispatch('collections/loadCollections')
    })
  }
}
</script>

<style scoped lang="scss">
.nav-collections {
  padding: 0 23px 0 5px;
}
</style>
