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
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">

.film-table {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: nowrap;

  &__number {
    width: 40px;
    flex-shrink: 0;
    text-align: right;
    padding-right: 15px;
  }

  &__name {
    flex-grow: 1;
    padding-right: 10px;
    min-width: 0;
  }

  &__genre {
    width: 350px;
    flex-shrink: 0;
    padding-right: 50px;
  }

  &__year {
    width: 100px;
    flex-shrink: 0;
    padding-right: 10px;
  }

  &__save {
    width: 40px;
    flex-shrink: 0;
  }

  &__rate {
    width: 70px;
    flex-shrink: 0;
    text-align: right;
  }

  &__more {
    width: 50px;
    flex-shrink: 0;
    padding-left: 10px;
  }
}

@media screen and (max-width: 1660px) {
  .film-table {
    &__genre {
      width: 200px;
      padding-right: 20px;
    }
  }
}

@media screen and (max-width: 1460px) {
  .film-table {
    &__year {
      width: 60px;
    }

    &__save {
      width: 25px;
    }

    &__more {
      width: 40px;
      flex-shrink: 0;
    }
  }
}

@media screen and (max-width: 1030px) {
  .film-table {
    &__number {
      width: 30px;
      padding-right: 7px;
      font-size: 12px;
    }

    &__genre {
      width: 150px;
    }
  }
}

@media screen and (max-width: 900px) {
  .film-table {
    &__number {
      display: none;
    }

    &__genre {
      display: none;
    }

    &__rate {
      display: none;
    }
  }
}

@media screen and (max-width: 390px) {
  .film-table {

    &__year {
      display: none;
    }
  }
}
</style>
