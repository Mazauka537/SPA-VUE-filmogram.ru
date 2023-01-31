<template>
  <div class="my-checkbox">

    <svg class="my-checkbox__icon" width="100%" height="100%" viewBox="0 0 768 768" v-if="checked">
      <path d="M543.104 200.032c-30.944-17.216-69.92-6.016-87.040 24.864l-118.816 213.824-68-68c-24.992-24.992-65.504-24.992-90.496 0s-24.992 65.504 0 90.496l128 128c12.096 12.128 28.416 18.784 45.248 18.784 2.944 0 5.92-0.192 8.864-0.64 19.872-2.784 37.312-14.72 47.072-32.288l160-288c17.184-30.912 6.048-69.856-24.832-87.040z"></path>
    </svg>

    <svg class="my-checkbox__icon" width="100%" height="100%" viewBox="0 0 768 768" v-else>
      <path
          d="M576 320h-128v-128c0-35.328-28.672-64-64-64s-64 28.672-64 64l2.272 128h-130.272c-35.328 0-64 28.672-64 64s28.672 64 64 64l130.272-2.272-2.272 130.272c0 35.328 28.672 64 64 64s64-28.672 64-64v-130.272l128 2.272c35.328 0 64-28.672 64-64s-28.672-64-64-64z"></path>
    </svg>

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

  &__icon {
    height: 100%;
    width: 100%;
    fill: $color-text;
  }
}
</style>
