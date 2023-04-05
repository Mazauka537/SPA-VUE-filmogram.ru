<template>
  <div class="my-select">
    <button class="my-select__btn" :class="{'my-select__btn_colored': selectedName}" @click.stop="showOptions">
      {{ selectedName ?? placeholder }}
      <svg width="100%" height="100%" viewBox="0 0 768 768" v-if="!isOptionsVisible">
        <path d="M223.5 319.5h321l-160.5 160.5z"></path>
      </svg>
      <svg width="100%" height="100%" viewBox="0 0 768 768" v-else>
        <path d="M223.5 448.5l160.5-160.5 160.5 160.5h-321z"></path>
      </svg>
    </button>

    <ul class="my-select__options" v-if="isOptionsVisible">
      <li class="my-select__option" @click="$emit('update:modelValue', undefined)" v-if="canBeUnselected">Отменить выбор</li>
      <li v-for="option in options"
          class="my-select__option"
          @click="$emit('update:modelValue', option.value)">
        {{ option.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import {computed, ref} from "vue";

export default {
  props: {
    canBeUnselected: {
      type: Boolean,
      default: false
    },
    placeholder: String,
    options: Array,
    modelValue: String | Number
  },
  setup(props) {

    const isOptionsVisible = ref(false)

    const showOptions = () => {
      if (isOptionsVisible.value === true) {
        hideOptions()
        return
      }

      isOptionsVisible.value = true
      window.addEventListener('click', hideOptions)
    }

    const hideOptions = () => {
      isOptionsVisible.value = false
      window.removeEventListener('click', hideOptions)
    }

    const selectedName = computed(() => {
      return props.options.find(option => option.value === props.modelValue)?.name
    })

    return {
      isOptionsVisible,
      showOptions,
      selectedName,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-select {
  position: relative;

  &__btn {
    height: 35px;
    width: 100%;
    background: $color-bg-input;
    padding: 0 32px;
    border-radius: 3px;
    position: relative;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

    &_colored {
      color: $color-text-light;
    }

    svg {
      position: absolute;
      height: 25px;
      width: 25px;
      right: 3px;
      top: 50%;
      transform: translateY(-50%);
      fill: $color-text-light;
    }
  }

  &__options {
    position: absolute;
    z-index: 2;
    top: 40px;
    left: 0;
    width: 100%;
    padding: 5px;
    background: $color-bg-more;
    border-radius: 3px;
    box-shadow: 0 0 10px #111;
  }

  &__option {
    color: $color-text-light;
    padding: 15px 20px;
    cursor: pointer;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    border-radius: 2px;
    width: 100%;

    &:hover {
      background: $color-bg-input;
    }
  }
}

</style>
