<template>
  <div class="scrollable-block" ref="elemScrollableBlock">
    <slot></slot>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import SimpleScrollbar from "simple-scrollbar";

export default {
  setup() {
    const elemScrollableBlock = ref()

    onMounted(() => {
      SimpleScrollbar.initEl(elemScrollableBlock.value)
    })

    return {
      elemScrollableBlock,
    }
  }
}
</script>

<style scoped lang="scss">

.scrollable-block {
  height: 100%;
}
</style>
