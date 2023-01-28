<template>
  <div class="film-block">

    <div class="film-block__left">
      <div class="film-block__poster">
        <img :src="filmKp.posterUrlPreview" alt="poster">
      </div>
    </div>

    <div class="film-block__mid">
      <div class="film-block__name">
        {{ filmKp.nameRu ?? filmKp.nameOriginal }}
      </div>
      <div class="film-block__original-name">
        {{ filmKp.nameOriginal }}
      </div>
      <div class="film-block__countries">
        {{ type }}, {{ filmKp.year }}, {{ countries }}
      </div>
      <div class="film-block__genres">
        Жанры: {{ genres }}
      </div>
    </div>

    <div class="film-block__right">
      <div class="film-block__add-to-collection icon-playlist_add" @pointerdown.stop.prevent="$emit('addToCollection', filmKp.kinopoiskId)"></div>
      <div class="film-block__rate" :class="'film-block__rate_' + rateColorKp" v-if="filmKp.ratingKinopoisk">
        <sup>КП</sup>{{ filmKp.ratingKinopoisk }}
      </div>
      <div class="film-block__rate" style="margin-top: 10px;" :class="'film-block__rate_' + rateColorImdb"
           v-if="filmKp.ratingImdb">
        <sup>IMDb</sup>{{ filmKp.ratingImdb }}
      </div>
    </div>

  </div>
</template>

<script>
import useFilmComputeds from "@/composables/useFilmComputeds";

export default {
  props: {
    filmKp: Object
  },
  setup(props) {

    const {genres, countries, type, rateColorKp, rateColorImdb} = useFilmComputeds(props)

    return {
      genres,
      countries,
      type,
      rateColorKp,
      rateColorImdb
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.film-block {
  display: flex;
  justify-content: stretch;
  flex-wrap: nowrap;

  &__left {

  }

  &__mid {
    padding: 5px 20px;
    flex-grow: 1;
    overflow: hidden;
  }

  &__right {
    text-align: right;
  }

  &__poster {
    width: 80px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__name, &__original-name, &__countries {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__name {
    font-weight: 700;
  }

  &__original-name {
    font-size: 13px;
    margin-top: 5px;
  }

  &__countries {
    font-size: 13px;
    margin-top: 10px;
  }

  &__genres {
    font-size: 13px;
    margin-top: 5px;
  }

  &__add-to-collection {
    height: 30px;
    width: 30px;
    float: right;
    font-size: 26px;
    margin-bottom: 5px;
    color: $color-placeholder;
    cursor: pointer;
    z-index: 4;

    &:hover {

    }
  }

  &__rate {
    font-size: 18px;
    font-weight: 700;

    &_green {
      color: #16CB1F;
    }

    &_yellow {
      color: #D0EC16;
    }

    &_orange {
      color: #E4A316;
    }

    &_red {
      color: #E42424;
    }

    sup {
      font-size: 9px;
      font-weight: 300;
      color: $color-placeholder;
      padding-right: 2px;
    }
  }
}
</style>
