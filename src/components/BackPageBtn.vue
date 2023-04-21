<template>
  <div class="back-page-btn" @click="$router.back()">
    <svg width="100%" height="100%" viewBox="0 0 512 512">
      <path d="M201.373 438.627l-160-160c-12.497-12.496-12.497-32.758 0-45.255l160-160c12.497-12.496 32.758-12.496 45.255 0s12.497 32.758 0 45.255l-105.373 105.373h306.745c17.673 0 32 14.327 32 32s-14.327 32-32 32h-306.745l105.373 105.373c6.248 6.248 9.372 14.438 9.372 22.627s-3.124 16.379-9.372 22.627c-12.497 12.497-32.758 12.497-45.255 0z"></path>
    </svg>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.back-page-btn {
  position: fixed;
  top: 15px;
  left: 15px;
  height: 24px;
  width: 24px;
  display: none;
  cursor: pointer;

  svg {
    fill: $color-text-light;
  }
}

@media screen and (max-width: 560px) {
  .back-page-btn {
    display: block;
  }
}
</style>
