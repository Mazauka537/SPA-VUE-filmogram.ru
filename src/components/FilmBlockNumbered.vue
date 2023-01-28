<template>
  <div class="film-block-numbered">
    <div class="film-block-numbered__number">
      {{ number }}
    </div>
    <div class="film-block-numbered__film">
      <FilmBlock :film-kp="filmKp" @addToCollection="$emit('addToCollection')"/>
    </div>
  </div>
</template>

<script>
import FilmBlock from "@/components/FilmBlock";

export default {
  components: {FilmBlock},
  props: {
    number: Number,
    filmKp: Object
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.film-block-numbered {
  padding: 10px;
  margin: 0 -10px;
  display: flex;
  align-items: center;

  &__number {
    padding-right: 5px;
    width: 20px;
    color: $color-placeholder;
    font-size: 14px;
    font-weight: 700;
    overflow-x: hidden;
    white-space: nowrap;
    flex-shrink: 0;
  }

  &__film {
    flex-grow: 1;
    min-width: 0;
    overflow: hidden;
  }
}
</style>
