<template>
  <div class="notification" ref="elemBlock">
    <div class="notification__inner">

      <div class="notification__close"
           v-if="notification.closable"
           @click="$emit('close', notification.id)"></div>

      <div class="notification__text">
        {{ notification.text }}
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
    transition: opacity 3s 2s;
  }

  &__inner {
    margin: 5px 0;
    padding: 15px;
    background: $color-bg-notice;
    width: 100%;
    position: relative;
  }

  &__close {
    width: 15px;
    height: 15px;
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;

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

  &__text {
    color: $color-text;
  }
}

@media screen and (max-width: 560px) {
  .notification {
    max-width: 80%;
    margin: 0 auto;
    text-align: center;

    &__inner {
      border-radius: 10px;
      margin: 3px 0;
      padding: 5px 10px;
      font-size: 12px;
      display: inline-block;
      width: auto;
      background: $color-bg-notice-media;
    }

    &__close {
      display: none;
    }
  }
}
</style>
