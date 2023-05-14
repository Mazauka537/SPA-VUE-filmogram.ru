<template>
  <button class="drag-block">
    <div class="drag-block__inner">
      <div class="drag-block__grab" :class="{'drag-block__grab_visible': isGrabVisible}">
        <svg width="100%" height="100%" viewBox="0 0 768 768">
          <path d="M96 192h576v64.5h-576v-64.5zM96 415.5v-63h576v63h-576zM96 576v-64.5h576v64.5h-576z"></path>
        </svg>
      </div>
      <slot></slot>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    isGrabVisible: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.drag-block {
  display: block;
  width: 100%;
  border: none;
  background: transparent;
  text-align: left;
  position: relative;

  &__inner {
    width: 100%;
    height: 100%;
  }

  &__grab {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
    height: 24px;
    width: 24px;
    touch-action: none;
    display: none;

    &_visible {
      display: block;
    }

    svg {
      fill: $color-text;
    }
  }
}
</style>
