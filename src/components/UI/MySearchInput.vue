<template>
  <div class="my-search-input__wrapper icon-search">
    <input class="my-search-input"
           type="text"
           :placeholder="placeholder"
           :value="modelValue"
           @input="e => $emit('update:modelValue', e.target.value)">
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Поиск'
    },
    modelValue: String
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-search-input {
  height: 35px;
  width: 100%;
  background: $color-bg-input;
  border-radius: 50px;
  padding: 0 15px 0 40px;

  &::placeholder {
    color: $color-placeholder;
  }

  &__wrapper {
    position: relative;

    &:before {
      position: absolute;
      color: $color-placeholder;
      font-size: 20px;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      padding-bottom: 2.4px;
    }
  }
}
</style>
