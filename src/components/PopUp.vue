<template>
  <div class="pop-up" :class="{'pop-up_center': center}" @click="popUpController.hide" v-if="popUpController.visible">
    <div class="pop-up__inner panel" :class="{'pop-up__inner_center': center}" @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    popUpController: Object,
    center: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color-placeholder, 0.6);
  z-index: 3;
  overflow-y: auto;

  &_center {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__inner {
    position: relative;
    max-width: 600px;
    width: 100%;
    height: 100%;
    overflow: hidden;
    margin: 0 auto;

    &_center {
      margin: 0;
    }
  }
}
</style>
