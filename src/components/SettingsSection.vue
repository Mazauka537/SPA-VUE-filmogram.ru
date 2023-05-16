<template>
  <section class="settings-section">
    <h3 class="settings-section__title">{{ title }}</h3>
    <slot></slot>
  </section>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";
.settings-section {
  padding: 10px 0;

  &__title {
    padding: 10px 0;
    color: $color-text-light;
  }
}

</style>
