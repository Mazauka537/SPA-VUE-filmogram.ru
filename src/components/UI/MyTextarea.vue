<template>
  <textarea class="my-textarea"
            :placeholder="placeholder"
            :value="modelValue"
            @input="e => $emit('update:modelValue', e.target.value)"></textarea>
</template>

<script>
export default {
  props: {
    placeholder: String,
    modelValue: String
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-textarea {
  height: 100px;
  width: 100%;
  resize: none;
  border: $border-main;
  background: $color-bg;
  padding: 7px 15px;

  &::placeholder {
    color: $color-placeholder;
  }
}
</style>
