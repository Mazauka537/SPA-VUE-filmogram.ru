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

    <div class="film-block-mini__more" v-if="isMoreBtnVisible">
      <AddToCollectionsBtn @click.stop="$emit('addToCollections', film)"/>
    </div>

  </div>
</template>

<script>

import SaveBtn from "@/components/UI/SaveBtn";
import MoreBtn from "@/components/UI/MoreBtn";
import AddToCollectionsBtn from "@/components/UI/AddToCollectionsBtn";

export default {
  components: {AddToCollectionsBtn, MoreBtn, SaveBtn},
  props: {
    film: Object,
    isMoreBtnVisible: {
      type: Boolean,
      default: true
    }
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

      &__more {
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

  &__more {
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    text-align: right;
    opacity: 0;
  }
}

@media screen and (max-width: 1460px) {
  .film-block-mini {

    &__poster {
      width: 50px;
      height: 75px;
    }

    &__name, &__original-name {
      font-size: 14px;
    }
  }
}

@media screen and (max-width: 1030px) {
  .film-block-mini {

    &__save {
      opacity: 1;
    }

    &__more {
      opacity: 1;
    }
  }
}

@media screen and (max-width: 560px) {
  .film-block-mini {

    &__poster {
      width: 40px;
      height: 60px;
    }

    &__name, &__original-name {
      font-size: 13px;
    }
  }
}

@media screen and (max-width: 390px) {
  .film-block-mini {

    &__year {
      display: none;
    }
  }
}
</style>
