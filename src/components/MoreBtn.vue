<template>
  <div class="more-btn" @click="showOptions" ref="elemMoreBtn">
    <svg width="100%" height="100%" viewBox="0 0 768 768">
      <path
          d="M448 384c0-17.664-7.2-33.696-18.752-45.248s-27.584-18.752-45.248-18.752-33.696 7.2-45.248 18.752-18.752 27.584-18.752 45.248 7.2 33.696 18.752 45.248 27.584 18.752 45.248 18.752 33.696-7.2 45.248-18.752 18.752-27.584 18.752-45.248zM672 384c0-17.664-7.2-33.696-18.752-45.248s-27.584-18.752-45.248-18.752-33.696 7.2-45.248 18.752-18.752 27.584-18.752 45.248 7.2 33.696 18.752 45.248 27.584 18.752 45.248 18.752 33.696-7.2 45.248-18.752 18.752-27.584 18.752-45.248zM224 384c0-17.664-7.2-33.696-18.752-45.248s-27.584-18.752-45.248-18.752-33.696 7.2-45.248 18.752-18.752 27.584-18.752 45.248 7.2 33.696 18.752 45.248 27.584 18.752 45.248 18.752 33.696-7.2 45.248-18.752 18.752-27.584 18.752-45.248z"></path>
    </svg>
    <ul class="more-btn__options" v-if="isOptionsVisible">
      <li class="more-btn__option" v-for="option in options" @click="option.onClick">{{ option.text }}</li>
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
    }

    const hideOptions = e => {
      const isTargetInMoreBtn = !!Array.from(e.path).find(element => element === elemMoreBtn.value)

      if (!isTargetInMoreBtn)
        isOptionsVisible.value = false
    }

    onMounted(() => {
      window.addEventListener('click', hideOptions)
    })

    return {
      elemMoreBtn,
      isOptionsVisible,
      showOptions
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.more-btn {
  height: 100%;
  width: 100%;
  position: relative;

  svg {
    fill: $color-text-light;
  }

  &__options {
    position: absolute;
    bottom: -150%;
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
