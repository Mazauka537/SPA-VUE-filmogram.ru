<template>
  <input class="my-input" :class="{'my-input_with-icon': iconClass}" :type="type" :placeholder="placeholder"
         :value="modelValue" @input="e => $emit('update:modelValue', e.target.value)">
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
    modelValue: String | Number
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
  border-radius: 3px;

  &_with-icon {
    padding-left: 40px;
  }

  &::placeholder {
    color: $color-placeholder;
  }
}
</style>
