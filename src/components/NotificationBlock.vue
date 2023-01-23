<template>
  <div class="notification" ref="elemBlock">
    <div class="notification__inner">

      <div class="notification__close"
           v-if="notification.closable"
           @click="$emit('close', notification.id)"></div>

      <div class="notification__content">
        <div class="notification__text">{{ notification.text }}</div>
        <div class="notification__icon"></div>
      </div>

      <div class="notification__buttons" v-if="notification.buttons?.length > 0">
        <button class="notification__button"
                v-for="button in notification.buttons"
                @click="button.onClick">
          {{ button.text }}
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import {onMounted, ref, watch} from "vue";

export default {
  props: {
    notification: Object
  },
  setup(props) {
    const elemBlock = ref()

    watch(() => props.notification.state, () => {
      if (props.notification.state === 'fading') {
        elemBlock.value.classList.add('notification_fading')
        setTimeout(() => {
          elemBlock.value.style.opacity = 0.1
        })
      }

      if (props.notification.state === 'stopFading') {
        elemBlock.value.classList.remove('notification_fading')
        setTimeout(() => {
          elemBlock.value.style.opacity = 1
        })
      }

      if (props.notification.state === 'removing') {
        elemBlock.value.classList.remove('notification_fading')
        elemBlock.value.classList.add('notification_removing')
        setTimeout(() => {
          elemBlock.value.style.opacity = 0
          elemBlock.value.style.height = 0
        })
      }
    })

    onMounted(() => {
      const height = elemBlock.value.offsetHeight
      elemBlock.value.style.height = '0px'
      setTimeout(() => {
        elemBlock.value.style.height = height + 'px'
        elemBlock.value.style.opacity = 1
      }, 100)
    })

    return {
      elemBlock
    }
  }

}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.notification {
  width: 100%;
  overflow: hidden;
  opacity: 0;
  transition: height 0.2s, opacity 0.4s;

  &_removing {
    transition: height 0.15s 0.15s, opacity 0.15s;
  }

  &_fading {
    transition: opacity 7s 3s;
  }

  &__inner {
    margin: 10px 0;
    padding: 20px;
    background: $color-bg-nav;
    width: 100%;
    position: relative;
  }

  &__close {
    width: 20px;
    height: 20px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;

    &:before, &:after {
      content: '';
      position: absolute;
      left: 0;
      top: 50%;
      height: 1px;
      width: 100%;
      background: $color-text;
    }

    &:before {
      transform: rotate(-45deg);
    }

    &:after {
      transform: rotate(45deg);
    }
  }

  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__text {
    color: $color-text;
  }

  &__icon {

  }

  &__buttons {
    padding-top: 10px;
    text-align: center;
  }

  &__button {
    padding: 5px 10px;
    margin: 0 10px;
    color: $color-text-light;
    background: $color-main;
  }
}
</style>
