<template>
  <div class="single-page" ref="page">
    <slot></slot>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";
import SimpleScrollbar from "simple-scrollbar";

export default {
  setup() {
    const page = ref()

    onMounted(() => {
      SimpleScrollbar.initEl(page.value)
    })

    return {
      page,
    }
  }
}
</script>

<style scoped lang="scss">

.single-page {
  height: 100%;
}
</style>
