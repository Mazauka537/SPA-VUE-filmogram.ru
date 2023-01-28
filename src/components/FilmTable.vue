<template>
  <div class="film-table">
    <div class="film-table__number">
      <slot name="number"></slot>
    </div>
    <div class="film-table__name">
      <slot name="name"></slot>
    </div>
    <div class="film-table__genre">
      <slot name="genre"></slot>
    </div>
    <div class="film-table__year">
      <slot name="year"></slot>
    </div>
    <div class="film-table__rate">
      <slot name="rate"></slot>
    </div>
    <div class="film-table__grab">
      <slot name="grab"></slot>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="scss">

.film-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  &__number {
    width: 40px;
    text-align: right;
    padding-right: 10px;
  }

  &__name {
    flex-grow: 1;
    padding-right: 10px;
  }

  &__genre {
    width: 300px;
    padding-right: 10px;
  }

  &__year {
    width: 300px;
    padding-right: 10px;
  }

  &__rate {
    width: 50px;
    text-align: right;
  }

  &__grab {
    width: 50px;
  }
}
</style>
