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
  color: $color-text-light;
  padding: 7px 15px;
  font-weight: 700;
  font-size: 12px;
  cursor: pointer;
  border: 2px solid $color-text-light;
  border-radius: 100px;
  background: transparent;
}
</style>
