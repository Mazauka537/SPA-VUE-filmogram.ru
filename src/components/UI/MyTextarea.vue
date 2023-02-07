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
  height: 100%;
  width: 100%;
  resize: none;
  background: $color-bg-input;
  padding: 7px 15px;
  border-radius: 3px;

  &::placeholder {
    color: $color-placeholder;
  }
}
</style>
