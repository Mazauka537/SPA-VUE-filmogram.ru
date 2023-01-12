<template>
  <div class="my-input__wrapper" :class="iconClass">
    <input class="my-input" :class="{'my-input_with-icon': iconClass}" :type="type" :placeholder="placeholder"
           :value="modelValue" @input="e => $emit('update:modelValue', e.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    iconClass: String,
    type: {
      type: String,
      default: 'Text'
    },
    placeholder: String,
    modelValue: String
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-input {
  height: 35px;
  width: 100%;
  background: $color-bg-input;
  padding: 0 12px;

  &_with-icon {
    padding-left: 40px;
  }

  &::placeholder {
    color: $color-placeholder;
  }

  &__wrapper {
    position: relative;

    &:before {
      position: absolute;
      color: $color-text;
      font-size: 20px;
      left: 12px;
      top: 50%;
      transform: translateY(-50%);
      padding-bottom: 2.4px;
    }
  }
}
</style>
