<template>
  <div class="pop-up" :class="{'pop-up_center': center}" @click="popUpController.hide" v-if="popUpController.visible">

    <div class="pop-up__inner panel" :class="{'pop-up__inner_center': center}" @click.stop>

      <div class="pop-up__header">
        <div class="pop-up__title">
          {{ title }}
        </div>
        <div class="pop-up__close" @click="popUpController.hide"></div>
      </div>

      <slot></slot>

    </div>

  </div>
</template>

<script>
export default {
  props: {
    title: String,
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
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
    background: $color-bg-main;
    padding: 25px;

    &_center {
      border-radius: 8px;
      margin: 0;
      height: auto;
    }
  }

  &__header {
    color: $color-text;
    font-size: 16px;
    position: relative;
  }

  &__title {
    max-width: 500px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: left;
    color: $color-text-light;
    font-size: 20px;
    font-weight: 700;
    padding-right: 30px;
  }

  &__close {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    height: 15px;
    width: 15px;

    &:hover {
      &:after, &:before {
        background: $color-text-light;
      }
    }

    &:after, &:before {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      background: $color-text;
      border-radius: 50px;
      position: absolute;
      left: 0;
      top: 50%;
    }

    &:after {
      transform: translateY(-50%) rotate(45deg);
    }

    &:before {
      transform: translateY(-50%) rotate(-45deg);
    }
  }
}
</style>
