<template>
  <div class="single-page" ref="elemPage">
    <slot></slot>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import SimpleScrollbar from "simple-scrollbar";

export default {
  setup() {
    const elemPage = ref()

    onMounted(() => {
      SimpleScrollbar.initEl(elemPage.value)
    })

    return {
      elemPage,
    }
  }
}
</script>

<style scoped lang="scss">

.single-page {
  height: 100%;
}
</style>
