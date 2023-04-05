<template>
  <div class="more-btn" @pointerdown.stop="showOptions" ref="elemMoreBtn">
    <svg width="100%" height="100%" viewBox="0 0 768 768">
      <path
          d="M448 384c0-17.664-7.2-33.696-18.752-45.248s-27.584-18.752-45.248-18.752-33.696 7.2-45.248 18.752-18.752 27.584-18.752 45.248 7.2 33.696 18.752 45.248 27.584 18.752 45.248 18.752 33.696-7.2 45.248-18.752 18.752-27.584 18.752-45.248zM672 384c0-17.664-7.2-33.696-18.752-45.248s-27.584-18.752-45.248-18.752-33.696 7.2-45.248 18.752-18.752 27.584-18.752 45.248 7.2 33.696 18.752 45.248 27.584 18.752 45.248 18.752 33.696-7.2 45.248-18.752 18.752-27.584 18.752-45.248zM224 384c0-17.664-7.2-33.696-18.752-45.248s-27.584-18.752-45.248-18.752-33.696 7.2-45.248 18.752-18.752 27.584-18.752 45.248 7.2 33.696 18.752 45.248 27.584 18.752 45.248 18.752 33.696-7.2 45.248-18.752 18.752-27.584 18.752-45.248z"></path>
    </svg>
    <ul class="more-btn__options" v-if="isOptionsVisible">
      <template v-for="option in options">
        <li v-if="option.isInvisible ? !option.isInvisible() : true"
            class="more-btn__option"
            @pointerdown="option.onClick">
          {{ option.text() }}
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  props: {
    options: Array
  },
  setup() {
    const isOptionsVisible = ref(false)
    const elemMoreBtn = ref(undefined)

    const showOptions = () => {
      isOptionsVisible.value = !isOptionsVisible.value
      window.addEventListener('click', hideOptions)
    }

    const hideOptions = e => {
      let isTargetInMoreBtn = false

      let node = e.target
      while (node !== document.body) {
        if (node === elemMoreBtn.value) {
          isTargetInMoreBtn = true
          break;
        }
        node = node.parentNode
      }

      if (!isTargetInMoreBtn) {
        window.removeEventListener('click', hideOptions)
        isOptionsVisible.value = false
      }
    }

    return {
      elemMoreBtn,
      isOptionsVisible,
      showOptions
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../assets/styles/vars";

.more-btn {
  height: 100%;
  width: 100%;
  position: relative;

  svg {
    fill: $color-text-light;
    cursor: pointer;
  }

  &__options {
    z-index: 2;
    position: absolute;
    top: 130%;
    right: 0;
    padding: 5px;
    background: $color-bg-more;
    border-radius: 5px;
    box-shadow: 0 0 10px #111;
  }

  &__option {
    color: $color-text-light;
    padding: 15px 20px;
    cursor: pointer;
    white-space: nowrap;
    border-radius: 2px;

    &:hover {
      background: $color-bg-input;
    }
  }
}
</style>
