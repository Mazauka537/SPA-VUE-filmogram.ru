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
    <div class="film-table__save">
      <slot name="save"></slot>
    </div>
    <div class="film-table__rate">
      <slot name="rate"></slot>
    </div>
    <div class="film-table__more">
      <slot name="more"></slot>
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
    padding-right: 15px;
  }

  &__name {
    flex-grow: 1;
    padding-right: 10px;
  }

  &__genre {
    width: 400px;
    padding-right: 50px;
  }

  &__year {
    width: 100px;
    padding-right: 10px;
  }

  &__save {
    width: 40px;
  }

  &__rate {
    width: 50px;
    text-align: right;
  }

  &__more {
    width: 50px;
  }

  &__grab {
    width: 50px;
  }
}
</style>
