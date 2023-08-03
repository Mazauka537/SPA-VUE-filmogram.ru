<template>
  <div class="pop-up"
       @click="() => {if (closable) {$router.back(); $emit('close')}}">

    <div class="pop-up__inner panel"
         :class="{'pop-up__inner_fullscreen': fullScreen}"
         :style="{'margin-top': marginTop + 'px'}"
         @click="clickInnerHandler"
         @touchstart="touchstart"
         @touchmove="touchmove"
         @touchend="touchend">

      <div class="pop-up__header">
        <div class="pop-up__title">
          {{ title }}
        </div>
        <div class="pop-up__close" @click="$router.back(); $emit('close')"></div>
      </div>

      <div class="pop-up__body" @scroll.prevent.stop="scroll" @scrollend.prevent.stop="scrollend">
        <slot></slot>
      </div>

    </div>

  </div>
</template>

<script>
import ScrollableBlock from "@/components/ScrollableBlock";
import {useRouter} from "vue-router/dist/vue-router";
import {ref} from "vue";

export default {
  components: {ScrollableBlock},

  props: {
    title: String,
    closable: {
      type: Boolean,
      default: true
    },
    scrollClosable: {
      type: Boolean,
      default: true
    },
    fullScreen: {
      type: Boolean,
      default: false
    }
  },
  setup(props, {emit}) {
    const router = useRouter()

    const clickInnerHandler = e => {
      if (props.closable) {
        e.stopPropagation()
      }
    }

    let touchstartY = 0
    let touchendY = 0
    const marginTop = ref(0)
    let touchEventsEnabled = true

    const touchstart = e => {
      if (props.scrollClosable && touchEventsEnabled) {
        touchstartY = e.changedTouches[0].screenY
      }
    }

    const touchmove = e => {
      if (props.scrollClosable && touchEventsEnabled) {
        let moveDistance = e.changedTouches[0].screenY - touchstartY
        marginTop.value = moveDistance > 0 ? moveDistance : 0
      } else {
        marginTop.value = 0
      }
    }

    const touchend = e => {
      if (props.scrollClosable && touchEventsEnabled) {
        touchendY = e.changedTouches[0].screenY
        handleGesture()
      }
    }

    const handleGesture = () => {
      if (touchendY > touchstartY) {
        if (touchendY - touchstartY > 160) {
          router.back()
          emit('close')
        } else {
          marginTop.value = 0
        }
      }
    }

    const scroll = e => {
      touchEventsEnabled = false
    }

    const scrollend = e => {
      if (e.target.scrollTop === 0)
        touchEventsEnabled = true
    }

    return {
      clickInnerHandler,
      marginTop,
      touchstart,
      touchmove,
      touchend,
      scroll,
      scrollend
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/vars";

.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba($color-placeholder, 0.6);
  z-index: 5;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  &__inner {
    background: $color-bg-main;
    border-radius: 7px;
    max-height: 100%;
    max-width: 560px;
    display: flex;
    flex-direction: column;
    transition: margin-top 0.2s ease;

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
    padding: 20px;
    height: 100%;
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

    &:after, &:before {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      background: $color-text-light;
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

@media screen and (max-width: 560px) {
  .pop-up {
    display: block;

    &__inner {
      border-radius: 0;
      height: 100%;
      width: 100%;
      padding-bottom: 0;
    }

    &__header {
      padding: 20px 20px 10px 20px;
    }

    &__title {
      text-align: center;
      padding: 0 30px;
    }

    &__close {
      right: auto;
      left: 20px;
    }
  }
}
</style>
