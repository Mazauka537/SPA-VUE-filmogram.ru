<template>
  <div class="film-block-mini">

    <div class="film-block-mini__poster">
      <img :src="filmKp.posterUrlPreview" alt="poster">
    </div>
    <div class="film-block-mini__main-info">
      <div class="film-block-mini__name">
        {{ filmKp.nameRu ?? filmKp.nameOriginal }}
      </div>
      <div class="film-block-mini__original-name">
        {{ filmKp.nameOriginal }}
      </div>
    </div>

    <div class="film-block-mini__save" :class="{'film-block-mini__save_visible': filmKp.isInFavorite}">
      <SaveBtn :active="filmKp.isInFavorite" @click.stop="$emit('save', filmKp)"/>
    </div>

    <div class="film-block-mini__year">
      {{ filmKp.year }}
    </div>

  </div>
</template>

<script>

import SaveBtn from "@/components/UI/SaveBtn";
export default {
  components: {SaveBtn},
  props: {
    filmKp: Object
  },
  setup(props) {

    return {}
  }
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
    opacity: 0;

    &_visible {
      opacity: 1;
    }
  }
}
</style>
