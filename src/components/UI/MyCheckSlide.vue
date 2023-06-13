<template>
  <label class="my-check-slide" :class="{'my-check-slide_active': isChecked, 'my-check-slide_disabled': disabled}">
    <span></span>
  </label>
</template>

<script>
export default {
  props: {
    isChecked: Boolean,
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

$color-bg-check-sphere: #FFFFFF;
$color-bg-check-input: #9A9999;

.my-check-slide {
  position: relative;
  display: block;
  width: 38px;
  height: 22px;
  background: $color-bg-check-input;
  border-radius: 50px;
  transition: background .2s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  span {
    position: absolute;
    display: block;
    top: 2px;
    left: 2px;
    width: 18px;
    height: 18px;
    background: $color-bg-check-sphere;
    border-radius: 10px;
    transition: all .2s ease;
  }

  &_active {
    background: $color-main;

    span {
      transform: translateX(16px);
    }
  }

  &_disabled {
    background: $color-bg-check-input;

    span {
      transform: translateX(0);
    }
  }
}
</style>
