<template>
  <div class="block-list">

    <LoadableItemsContainer :loader="itemsLoader">
      <div class="block-list__title">{{ title }}</div>

      <div class="block-list__blocks">
        <div class="block-list__block"
             v-for="item in itemsLoader.items"
             :key="item.id">
          <UserBlock v-if="isUsers" :user="item"/>
          <CollectionBlock v-else :collection="item"/>
        </div>
        <div class="block-list__block"
             v-for="i in missingBlocksCount"
             :key="i">
          <EmptyBlock/>
        </div>
      </div>
    </LoadableItemsContainer>

  </div>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import {computed, ref} from "vue";
import EmptyBlock from "@/components/EmptyBlock";

export default {
  components: {EmptyBlock, UserBlock, CollectionBlock, LoadableItemsContainer},
  props: {
    isUsers: {
      type: Boolean,
      default: true
    },
    title: String,
    itemsLoader: Object
  },
  setup(props) {
    const missingBlocksCount = computed(() => {
      return 8 - (props.itemsLoader.items.length % 8)
    })

    const elemScrollableBlock = ref(undefined)

    return {
      missingBlocksCount,
      elemScrollableBlock
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.block-list {
  height: 100%;

  &__title {
    font-size: 22px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
  }

  &__blocks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -7px;
  }

  &__block {
    padding: 15px 7px;
  }
}
</style>
