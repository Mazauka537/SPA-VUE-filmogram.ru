<template>
  <ScrollableBlock ref="scrollableBlock">

    <div class="loadable-container__scroll-wrapper">
      <LoadableItemsContainer :loader="loader" :scrollable-block="scrollableBlock">

        <slot>

        </slot>

      </LoadableItemsContainer>
    </div>

  </ScrollableBlock>
</template>

<script>
import ScrollableBlock from "@/components/ScrollableBlock";
import {ref} from "vue";
import LoadableItemsContainer from "@/components/LoadableItemsContainer";

export default {
  components: {LoadableItemsContainer, ScrollableBlock},
  props: {
    loader: Object,
  },
  setup() {
    const scrollableBlock = ref(undefined)

    return {
      scrollableBlock,
    }
  }
}
</script>

<style scoped lang="scss">
.loadable-container__scroll-wrapper {
  padding-right: 12px;
}
</style>
