<template>
  <label class="my-check-slide" :class="{'my-check-slide_active': isChecked}">
    <span></span>
  </label>
</template>

<script>
export default {
  props: {
    isChecked: Boolean,
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
  width: 40px;
  height: 24px;
  background: $color-bg-check-input;
  border-radius: 50px;
  transition: background .2s ease;
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  span {
    position: absolute;
    display: block;
    top: 3px;
    left: 3px;
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
}
</style>
