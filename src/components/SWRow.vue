<template>
  <div class="sw-row">
    <div class="sw-row__label">
      <slot name="label"></slot>
    </div>
    <div class="sw-row__input">
      <slot name="input"></slot>
      <div class="sw-row__sub" v-if="$slots.sub">
        <slot name="sub"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.sw-row {
  display: flex;

  &__label {
    width: 160px;
    padding-right: 20px;
    text-align: right;
    padding-top: 5px;
  }

  &__input {
    max-width: 400px;
    width: 100%;
  }

  &__sub {
    color: $color-text;
    font-size: 12px;
    margin-top: 5px;
  }
}
</style>
