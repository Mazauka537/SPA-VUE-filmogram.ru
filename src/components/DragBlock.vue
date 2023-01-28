<template>
  <button class="drag-block">
    <div class="drag-block__inner">
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.drag-block {
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;

  &__inner {
    width: 100%;
    height: 100%;
  }
}
</style>
