<template>
  <div class="info-block-film" :class="{'info-block-film_visible': $route.query.film}">

    <div class="info-block-film__top">
      <div class="info-block-film__close" @click="$router.replace(backLink)"></div>
    </div>

    <ScrollableBlock v-if="film">
      <div class="info-block-film__inner">

        <div class="info-block-film__poster">
          <img :src="film.filmKp.posterUrlPreview" alt="poster">
        </div>

        <div class="info-block-film__age">
          {{ type }}
          <template v-if="film.filmKp.additionalInfo?.ageRating">{{ film.filmKp.additionalInfo.ageRating }}+</template>
        </div>

        <div class="info-block-film__name" style="margin-top: 5px">
          {{ film.filmKp.nameRu }}
        </div>

        <div class="info-block-film__original-name">
          {{ film.filmKp.nameOriginal }}
        </div>

        <div class="info-block-film__splitted" style="margin-top: 10px">
          <div class="info-block-film__splitted-left">
            Год:
          </div>
          <div class="info-block-film__splitted-right">
            {{ film.filmKp.year }}
          </div>
        </div>

        <div class="info-block-film__splitted">
          <div class="info-block-film__splitted-left">
            Время:
          </div>
          <div class="info-block-film__splitted-right"
               v-if="film.filmKp.additionalInfo && film.filmKp.additionalInfo !== 'loading...' && film.filmKp.additionalInfo !== '404'">
            {{ additionalLength }}
          </div>
          <div class="info-block-film__splitted-right"
               v-else>
            {{ length }}
          </div>
        </div>

        <div class="info-block-film__splitted">
          <div class="info-block-film__splitted-left">
            Страны:
          </div>
          <div class="info-block-film__splitted-right">
            {{ countries }}
          </div>
        </div>

        <div class="info-block-film__splitted">
          <div class="info-block-film__splitted-left">
            Жанры:
          </div>
          <div class="info-block-film__splitted-right" v-html="genresList">
          </div>
        </div>

        <div class="info-block-film__load-more"
             v-if="(!film.filmKp.additionalInfo && film.filmKp.additionalInfo !== '404') || film.filmKp.additionalInfo === 'loading...'"
             style="margin-top: 20px">
      <span class="info-block-film__more link" @click="$emit('loadMoreInfo', film)"
            v-if="film.filmKp.additionalInfo !== 'loading...'">
        Больше информации
      </span>
          <span class="info-block-film__loading" v-if="film.filmKp.additionalInfo === 'loading...'">
        <LoadingPanel :size="30" :transparent="true"/>
      </span>
        </div>

        <div class="info-block-film__additional-info"
             v-if="film.filmKp.additionalInfo && film.filmKp.additionalInfo !== 'loading...' && film.filmKp.additionalInfo !== '404'">

          <div class="info-block-film__splitted">
            <div class="info-block-film__splitted-left">
              Бюджет:
            </div>
            <div class="info-block-film__splitted-right">
              {{ budget }}
            </div>
          </div>

          <div class="info-block-film__splitted">
            <div class="info-block-film__splitted-left">
              Сборы:
            </div>
            <div class="info-block-film__splitted-right">
              {{ fees }}
            </div>
          </div>

          <div class="info-block-film__serial" v-if="seasonsCount">
            <div class="info-block-film__splitted">
              <div class="info-block-film__splitted-left">
                Сезонов:
              </div>
              <div class="info-block-film__splitted-right">
                {{ seasonsCount }}
              </div>
            </div>

            <div class="info-block-film__splitted">
              <div class="info-block-film__splitted-left">
                Серий:
              </div>
              <div class="info-block-film__splitted-right">
                {{ episodesCount }}
              </div>
            </div>
          </div>

          <div class="info-block-film__splitted" style="margin-top: 10px">
            <div class="info-block-film__splitted-left">
              Актеры:
            </div>
            <div class="info-block-film__splitted-right">
              <PersonsList :persons="actors"/>
            </div>
          </div>

          <div class="info-block-film__splitted" style="margin-top: 10px">
            <div class="info-block-film__splitted-left">
              Продюсеры:
            </div>
            <div class="info-block-film__splitted-right">
              <PersonsList :persons="producers"/>
            </div>
          </div>

          <div class="info-block-film__splitted" style="margin-top: 10px">
            <div class="info-block-film__splitted-left">
              Сценаристы:
            </div>
            <div class="info-block-film__splitted-right">
              <PersonsList :persons="writers"/>
            </div>
          </div>

          <div class="infi-block-film__trailer" style="margin-top: 20px" v-if="trailerUrl">
            <iframe width="100%"
                    height="auto"
                    :src="trailerUrl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>
        </div>

        <div class="info-block-film__desc" style="margin-top: 20px">
          {{ film.filmKp.description ?? film.filmKp.additionalInfo?.description }}
        </div>
        <div class="info-block-film__link link" style="margin-top: 20px">
          <a :href="film.filmKp.webUrl">
            Смотреть на Kinopoisk.ru
          </a>
        </div>

      </div>
    </ScrollableBlock>
    <div class="info-block-film__empty" v-else>
      Выберите фильм
    </div>
  </div>

</template>

<script>
import MyButton from "@/components/UI/MyButton";
import PersonsList from "@/components/PersonsList";
import useFilmComputeds from "@/composables/useFilmComputeds";
import LoadingPanel from "@/components/LoadingPanel";
import useFilmInfoComputeds from "@/composables/useFilmInfoComputeds";
import ScrollableBlock from "@/components/ScrollableBlock";

export default {
  components: {ScrollableBlock, LoadingPanel, PersonsList, MyButton},
  props: {
    film: Object,
    backLink: String
  },
  setup(props) {
    const {genresList, countries, type} = useFilmComputeds(props)
    const {
      length, budget, fees, actors, producers, writers, trailerUrl,
      episodesCount, seasonsCount, additionalLength
    } = useFilmInfoComputeds(props)

    return {
      genresList,
      countries,
      type,

      length,
      budget,
      fees,
      actors,
      producers,
      writers,
      trailerUrl,
      episodesCount,
      seasonsCount,
      additionalLength,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.info-block-film {
  position: fixed;
  right: 0;
  top: 0;
  max-width: 320px;
  min-width: 240px;
  width: 100%;
  height: 100vh;
  text-align: center;
  z-index: 2;
  background: $color-bg-side;
  transition: right 0.1s;

  &_visible {
    right: 0;
  }

  &__top {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    z-index: 3;
    background: rgba($color-bg-side, 0.7);
  }

  &__close {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    height: 15px;
    width: 15px;

    &:hover {
      &:after, &:before {
        background: $color-text-light;
      }
    }

    &:after, &:before {
      content: '';
      display: block;
      height: 2px;
      width: 100%;
      background: $color-text;
      border-radius: 50px;
      position: absolute;
      left: 0;
      top: 50%;
    }

    &:after {
      transform: translateY(-50%) rotate(45deg);
    }

    &:before {
      transform: translateY(-50%) rotate(-45deg);
    }
  }

  &__poster {

    img {
      width: 100%;
    }
  }

  &__name {
    font-weight: 700;
    font-size: 18px;
  }

  &__original-name {

  }

  &__age {
    font-size: 14px;
  }

  &__load-more {
    position: relative;
    height: 20px;
  }

  &__more {
    height: 20px;
  }

  &__loading {
    height: 20px;
  }

  &__delete {
    text-align: center;
  }

  &__splitted {
    margin-top: 3px;

    &:after {
      content: "";
      clear: both;
      display: table;
    }
  }

  &__splitted-left {
    float: left;
    font-size: 14px;
  }

  &__splitted-right {
    text-align: right;
    font-size: 14px;
  }

  &__desc {
    font-size: 14px;
  }

  &__link {
    font-size: 14px;
  }
}

@media screen and (max-width: 1280px) {
  .info-block-film {
    right: -100%;

    &_visible {
      right: 0;
    }
  }
}

@media screen and (max-width: 560px) {
  .info-block-film {
    max-width: 100%;
  }
}
</style>
