<template>
  <div class="film-block-mini">

    <div class="film-block-mini__poster">
      <img :src="film.filmKp.posterUrlPreview" alt="poster">
    </div>
    <div class="film-block-mini__main-info">
      <div class="film-block-mini__name">
        {{ film.filmKp.nameRu ?? film.filmKp.nameOriginal }}
      </div>
      <div class="film-block-mini__original-name">
        {{ film.filmKp.nameOriginal }}
      </div>
    </div>

    <div class="film-block-mini__save" :class="{'film-block-mini__save_visible': film.isInFavorite}">
      <SaveBtn :active="film.isInFavorite" @click.stop="$emit('save', film)"/>
    </div>

    <div class="film-block-mini__year">
      {{ film.filmKp.year }}
    </div>

  </div>
</template>

<script>

import SaveBtn from "@/components/UI/SaveBtn";
export default {
  components: {SaveBtn},
  props: {
    film: Object
  },
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.film-block-mini {
  display: flex;
  justify-content: stretch;
  align-items: center;
  flex-wrap: nowrap;

  &:hover {
    .film-block-mini {

      &__save {
        opacity: 1;
      }
    }
  }

  &__poster {
    width: 60px;
    height: 90px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__main-info {
    padding-left: 10px;
    flex-grow: 1;
    overflow: hidden;
    min-width: 0;
  }

  &__name, &__original-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 16px;
  }

  &__name {
    font-weight: 700;
    color: $color-text-light;
  }

  &__original-name {
    margin-top: 3px;
    color: $color-text-light;
    font-weight: 300;
  }

  &__save {
    padding: 0 15px;
    height: 20px;
    width: 50px;
    flex-shrink: 0;
    opacity: 0;

    &_visible {
      opacity: 1;
    }
  }

  &__year {
    width: 40px;
    flex-shrink: 0;
  }
}
</style>
