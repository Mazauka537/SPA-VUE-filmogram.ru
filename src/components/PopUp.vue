<template>
  <div class="pop-up"
       @click="() => {if (closable) popUpController.hide()}"
       v-if="popUpController.visible">

    <div class="pop-up__inner panel" :class="{'pop-up__inner_fullscreen': fullScreen}" @click="clickInnerHandler">

      <div class="pop-up__header">
        <div class="pop-up__title">
          {{ title }}
        </div>
        <div class="pop-up__close" @click="popUpController.hide"></div>
      </div>

      <div class="pop-up__body">
        <slot></slot>
      </div>

    </div>

  </div>
</template>

<script>
import ScrollableBlock from "@/components/ScrollableBlock";

export default {
  components: {ScrollableBlock},

  props: {
    title: String,
    popUpController: Object,
    closable: {
      type: Boolean,
      default: true
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const clickInnerHandler = e => {
      if (props.closable) {
        e.stopPropagation()
      }
    }

    return {
      clickInnerHandler
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
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background: $color-bg-main;
    border-radius: 8px;
    max-height: 100%;
    padding: 5px;

    display: flex;
    flex-direction: column;

    &_fullscreen {
      height: 100%;

      .pop-up__body {
        overflow-y: hidden;
      }
    }
  }

  &__header {
    color: $color-text;
    font-size: 16px;
    padding: 20px;
    position: relative;
  }

  &__body {
    overflow-y: auto;
    padding: 0 20px 20px 20px;
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
    right: 20px;
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
