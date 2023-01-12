<template>
  <div class="my-checkbox">

    <div class="my-checkbox__input">
      <svg class="my-checkbox__check" width="100%" height="100%" viewBox="0 0 70 70" v-if="checked">
        <path d="M26.474,70c-2.176,0-4.234-1.018-5.557-2.764L3.049,43.639C0.725,40.57,1.33,36.2,4.399,33.875
				c3.074-2.326,7.441-1.717,9.766,1.35l11.752,15.518L55.474,3.285c2.035-3.265,6.332-4.264,9.604-2.232
				c3.268,2.034,4.266,6.334,2.23,9.602l-34.916,56.06c-1.213,1.949-3.307,3.175-5.6,3.279C26.685,69.998,26.58,70,26.474,70z"/>
      </svg>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    checked: Boolean,
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-checkbox {
  height: 17px;
  width: 17px;
  position: relative;

  &__input {
    height: 100%;
    width: 100%;
    border-radius: 2px;
    background: $color-text;
    cursor: pointer;
    position: relative;
  }

  &__check {
    position: absolute;
    left: 1px;
    top: 1px;
    height: 13px;
    width: 13px;
    fill: $color-main;
  }

  &__spin {
    top: 0;
    left: 0;
    position: absolute;
    animation: rotate 1s infinite linear;

    path {
      fill: $color-placeholder;
    }
  }
}

@keyframes rotate {
  from {
    transform: scale(1.4) rotate(0);
  }
  to {
    transform: scale(1.4) rotate(360deg);
  }
}
</style>
