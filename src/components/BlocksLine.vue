<template>
  <div class="blocks-line">
    <div class="blocks-line__header">
      <span class="blocks-line__title">{{ title }}</span>
      <router-link class="blocks-line__link" :to="link">Показать все</router-link>
    </div>
    <div class="blocks-line__blocks">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    link: String
  }

}
</script>

<style lang="scss">
@import "src/assets/styles/vars";

.blocks-line {

  &__header {

  }

  &__title {
    font-size: 22px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
  }

  &__link {
    float: right;
    text-transform: uppercase;
    font-weight: 700;
  }

  &__blocks {
    display: flex;
    padding-top: 20px;
    width: 100%;
  }

  &__block {

    &:nth-child(9) {
      display: none;
    }

    &:nth-child(8) {
      display: none;
    }
  }
}
</style>
