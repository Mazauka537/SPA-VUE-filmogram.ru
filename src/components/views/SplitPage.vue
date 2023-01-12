<template>
  <div class="split-page">
    <div class="split-page__left" ref="elemLeft">
      <slot name="left"></slot>
    </div>
    <div class="split-page__right" ref="elemRight">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import SimpleScrollbar from "simple-scrollbar";

export default {
  setup() {
    const elemLeft = ref()
    const elemRight = ref()

    onMounted(() => {
      SimpleScrollbar.initEl(elemLeft.value)
      SimpleScrollbar.initEl(elemRight.value)
    })

    return {
      elemLeft,
      elemRight,
    }
  }
}
</script>

<style scoped lang="scss">

.split-page {
  display: flex;

  &__left {
    padding: 0 10px 0 0;
    flex-grow: 1;
    min-width: 0;
  }

  &__right {
    width: 300px;
    min-width: 240px;
    padding: 0 0 0 10px;
  }
}
</style>
