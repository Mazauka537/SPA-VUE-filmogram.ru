<template>
  <div class="head-bar" :style="{background: 'rgba(51, 51, 51, ' + bgOpacityPercent + ')'}">
    <svg width="100%" height="100%" viewBox="0 0 512 512" @click="$router.back()">
      <path
          d="M201.373 438.627l-160-160c-12.497-12.496-12.497-32.758 0-45.255l160-160c12.497-12.496 32.758-12.496 45.255 0s12.497 32.758 0 45.255l-105.373 105.373h306.745c17.673 0 32 14.327 32 32s-14.327 32-32 32h-306.745l105.373 105.373c6.248 6.248 9.372 14.438 9.372 22.627s-3.124 16.379-9.372 22.627c-12.497 12.497-32.758 12.497-45.255 0z"></path>
    </svg>

    <div class="head-bar__title" :style="{opacity: titleOpacityPercent}" v-html="title"></div>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    title: {
      type: String,
      default: '&nbsp;'
    },
    scrollableBlock: Object,
    scrollHeight: Number
  },
  setup(props) {
    const bgOpacityPercent = ref(0)
    const titleOpacityPercent = ref(0)

    setTimeout(() => {
      const elemScrollableBlock = props.scrollableBlock.elemScrollableBlock.querySelector('.ss-content')

      elemScrollableBlock.addEventListener('scroll', () => {
        if (elemScrollableBlock.scrollTop > props.scrollHeight) {
          bgOpacityPercent.value = (elemScrollableBlock.scrollTop - props.scrollHeight) / 30
          titleOpacityPercent.value = (elemScrollableBlock.scrollTop - props.scrollHeight - 30) / 30

          if (bgOpacityPercent.value > 1) bgOpacityPercent.value = 1
          if (titleOpacityPercent.value > 1) titleOpacityPercent.value = 1

        } else {
          bgOpacityPercent.value = 0
          titleOpacityPercent.value = 0
        }

      })
    }, 300)

    return {
      bgOpacityPercent,
      titleOpacityPercent
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.head-bar {
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  width: 100%;
  display: none;
  padding: 15px 30px 15px 80px;

  svg {
    position: absolute;
    left: 15px;
    top: 50%;
    height: 23px;
    width: 23px;
    cursor: pointer;
    transform: translateY(-50%);
    fill: $color-text-light;
  }

  &__title {
    color: $color-text-light;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

@media screen and (max-width: 560px) {
  .head-bar {
    display: block;
  }
}
</style>
