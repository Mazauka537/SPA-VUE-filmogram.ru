<template>
  <button class="my-button" :class="{'my-button_white': white}">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    white: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-button {
  position: relative;
  background: $color-main;
  color: $color-text-light;
  height: 24px;
  padding: 0 20px;
  font-size: 12px;
  cursor: pointer;

  &_white {
    background: $color-text-light;
    color: $color-text;
  }
}
</style>
