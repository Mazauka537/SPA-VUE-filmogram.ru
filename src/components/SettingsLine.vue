<template>
  <div class="settings-line">
    <slot></slot>
    <div class="settings-line__check" v-if="withCheckbox">
      <MyCheckSlide :is-checked="isChecked"/>
    </div>
  </div>
</template>

<script>
import MyCheckSlide from "@/components/UI/MyCheckSlide";
export default {
  components: {MyCheckSlide},
  props: {
    withCheckbox: Boolean,
    isChecked: Boolean
  }

}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.settings-line {
  padding: 10px;
  margin: 0 -10px;
  position: relative;
  cursor: pointer;
  user-select: none;
  border-radius: 7px;

  &:hover {
    background: $color-bg-input;
  }

  &__check {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}

@media screen and (max-width: 560px) {
  .settings-line {
    &:hover {
      background: none;
    }
  }
}

</style>
