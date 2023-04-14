<template>
  <div class="empty-block">
    <span class="empty-block__text">
      {{ text }}
    </span>
  </div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.empty-block {
  width: 180px;
  height: 227px;
  padding: 15px 15px 30px 15px;
  background: $color-bg-side;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 7px;

  &:hover {
    background: $color-bg-input;
  }

  &__text {
    font-size: 18px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
    text-align: center;
  }
}
</style>
