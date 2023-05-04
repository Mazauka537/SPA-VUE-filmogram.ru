<template>
  <div class="blocks-list">

    <LoadableItemsContainerWithOwnScroll :loader="itemsLoader">
      <div class="blocks-list__blocks">
        <div class="blocks-list__block"
             v-for="item in itemsLoader.items"
             :key="item.id">
          <UserBlock v-if="isUsers" :user="item"/>
          <CollectionBlock v-else :collection="item"/>
        </div>
        <div class="blocks-list__block"
             v-for="i in missingBlocksCount"
             :key="i">
          <EmptyBlock/>
        </div>
      </div>
    </LoadableItemsContainerWithOwnScroll>

  </div>
</template>

<script>
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import {computed, ref} from "vue";
import EmptyBlock from "@/components/EmptyBlock";
import LoadableItemsContainerWithOwnScroll from "@/components/LoadableItemsContainerWithOwnScroll";

export default {
  components: {LoadableItemsContainerWithOwnScroll, EmptyBlock, UserBlock, CollectionBlock},
  props: {
    isUsers: {
      type: Boolean,
      default: true
    },
    itemsLoader: Object
  },
  setup(props) {
    const maxItemsCount = 11;

    const missingBlocksCount = computed(() => {
      return maxItemsCount - (props.itemsLoader.items.length % maxItemsCount)
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

.blocks-list {
  height: 100%;

  &__blocks {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 0 -7px;
    padding: 0 30px;
  }

  &__block {
    padding: 0 7px;
    margin-bottom: 30px;
  }
}

@media screen and (max-width: 1030px) {
  .blocks-list {
    &__blocks {
      padding: 0 15px;
    }
  }
}

@media screen and (max-width: 560px) {
  .blocks-list {

    &__blocks {
      padding: 15px;
      display: block;
    }

    &__block {
      margin-bottom: 15px;
    }
  }
}
</style>
