<template>
  <div class="film-block">

    <FilmTable>
      <template #number><span class="film-block__number-section">{{ number }}</span></template>

      <template #name>
        <div class="film-block__name-section">
          <div class="film-block__poster">
            <img :src="filmKp.posterUrlPreview" alt="poster">
          </div>
          <div class="film-block__main-info">
            <div class="film-block__name">
              {{ filmKp.nameRu ?? filmKp.nameOriginal }}
            </div>
            <div class="film-block__original-name">
              {{ filmKp.nameOriginal }}
            </div>
            <div class="film-block__type">
              тип: {{ type }}
            </div>
            <div class="film-block__countries">
              страна: {{ countries }}
            </div>
          </div>
        </div>
      </template>

      <template #genre>
        <div class="film-block__genres">
          {{ genres }}
        </div>
      </template>

      <template #year>
        <div class="film-block__genres">
          {{ filmKp.year }}
        </div>
      </template>

      <template #rate>
        <div class="film-block__rates">
          <div class="film-block__rate" :class="'film-block__rate_' + rateColorKp" v-if="filmKp.ratingKinopoisk">
            <sup>КП</sup>{{ filmKp.ratingKinopoisk }}
          </div>
          <div class="film-block__rate" style="margin-top: 10px;" :class="'film-block__rate_' + rateColorImdb"
               v-if="filmKp.ratingImdb">
            <sup>IMDb</sup>{{ filmKp.ratingImdb }}
          </div>
        </div>
      </template>
    </FilmTable>

  </div>
</template>

<script>
import useFilmComputeds from "@/composables/useFilmComputeds";
import FilmTable from "@/components/FilmTable";

export default {
  components: {FilmTable},

  props: {
    number: Number,
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

  &__name-section {
    display: flex;
    justify-content: stretch;
    align-items: center;
    flex-wrap: nowrap;
  }

  &__poster {
    width: 80px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__main-info {
    padding-left: 10px;
    flex-grow: 1;
    overflow: hidden;
  }

  &__name, &__original-name, &__countries {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  &__type {
    margin-top: 15px;
    font-size: 12px;
  }

  &__countries {
    font-size: 12px;
  }

  &__rate {
    font-size: 18px;
    font-weight: 700;

    &_green {
      color: #FFFFFF;
    }

    &_yellow {
      color: #CCCCCC;
    }

    &_orange {
      color: #AAAAAA;
    }

    &_red {
      color: #888888;
    }

    sup {
      font-size: 9px;
      font-weight: 300;
      color: $color-text;
      padding-right: 3px;
    }
  }
}
</style>
