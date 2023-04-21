<template>
  <div class="add-to-collections-btn">
    <svg width="100%" height="100%" viewBox="0 0 768 768">
      <path
          d="M703.5 511.5v-63h-255v63h255zM192 448.5h-127.5v63h127.5v129h64.5v-129h127.5v-63h-127.5v-129h-64.5v129zM319.5 192v64.5h384v-64.5h-384zM319.5 319.5v64.5h384v-64.5h-384z"></path>
    </svg>
  </div>
</template>

<script>

export default {
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/vars";

.add-to-collections-btn {
  cursor: pointer;
  height: 100%;
  width: 100%;

  &:hover {
    svg {
      fill: $color-text-light;
    }
  }

  svg {
    fill: $color-text;
  }
}
</style>
