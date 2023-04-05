<template>
  <div class="my-input-iconic" :class="iconClass">
    <MyInput :icon-class="iconClass" :type="type" :placeholder="placeholder" :model-value="modelValue"
             @input="e => $emit('update:modelValue', e.target.value)"/>
  </div>
</template>

<script>
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput},
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

.my-input-iconic {
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
</style>
