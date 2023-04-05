<template>
  <div class="film-block">

    <FilmTable>
      <template #number><span class="film-block__number-section">{{ number }}</span></template>

      <template #name>
        <div class="film-block__name-section">
          <div class="film-block__poster">
            <img :src="film.filmKp.posterUrlPreview" alt="poster">
          </div>
          <div class="film-block__main-info">
            <div class="film-block__name">
              {{ film.filmKp.nameRu ?? film.filmKp.nameOriginal }}
            </div>
            <div class="film-block__original-name">
              {{ film.filmKp.nameOriginal }}
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
        <div class="film-block__year">
          {{ film.filmKp.year }}
        </div>
      </template>

      <template #save>
        <div class="film-block__save" :class="{'film-block__save_visible': film.isInFavorite}">
          <SaveBtn :active="film.isInFavorite" @pointerdown.stop="$emit('save', film)"/>
        </div>
      </template>

      <template #rate>
        <div class="film-block__rates">
          <div class="film-block__rate" :class="'film-block__rate_' + rateColorKp" v-if="film.filmKp.ratingKinopoisk">
            <sup>КП</sup>{{ film.filmKp.ratingKinopoisk }}
          </div>
          <div class="film-block__rate" style="margin-top: 10px;" :class="'film-block__rate_' + rateColorImdb"
               v-if="film.filmKp.ratingImdb">
            <sup>IMDb</sup>{{ film.filmKp.ratingImdb }}
          </div>
        </div>
      </template>

      <template #more>
        <div class="film-block__more">
          <MoreBtn :options="moreBtnOptions"/>
        </div>
      </template>
    </FilmTable>

  </div>
</template>

<script>
import useFilmComputeds from "@/composables/useFilmComputeds";
import FilmTable from "@/components/FilmTable";
import SaveBtn from "@/components/UI/SaveBtn";
import MoreBtn from "@/components/UI/MoreBtn";
import {useRoute} from "vue-router/dist/vue-router";
import {useStore} from "vuex";

export default {
  components: {MoreBtn, SaveBtn, FilmTable},

  props: {
    number: Number,
    film: Object,
    collection: Object
  },
  setup(props, {emit}) {
    const route = useRoute()
    const store = useStore()

    const {genres, countries, type, rateColorKp, rateColorImdb} = useFilmComputeds(props)

    const moreBtnOptions = [{
      text: () => 'удалить из коллекции',
      onClick: () => {
        emit('delete')
      },
      isInvisible: () => {
        return route.name !== 'collection' || !store.getters['auth/isOwner'](props.collection.user_id)
      }
    }, {
      text: () => 'добавить в коллекцию',
      onClick: () => {
        emit('addToCollection')
      }
    }]

    return {
      genres,
      countries,
      type,
      rateColorKp,
      rateColorImdb,
      moreBtnOptions
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.film-block {

  &:hover {
    .film-block {

      &__save, &__more {
        opacity: 1;
      }
    }
  }

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

  &__save {
    height: 25px;
    width: 25px;
    opacity: 0;

    &_visible {
      opacity: 1;
    }
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

  &__more {
    height: 25px;
    width: 45px;
    padding-left: 20px;
    opacity: 0;
  }
}
</style>
