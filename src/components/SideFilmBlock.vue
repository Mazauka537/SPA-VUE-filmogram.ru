<template>
  <div class="side-film-block" :class="{'side-film-block_visible': $route.query.film}">

    <div class="side-film-block__top">
      <div class="side-film-block__close" @click="$router.replace({query: {}})"></div>
    </div>

    <ScrollableBlock>
      <div class="side-film-block__inner">

        <div class="side-film-block__undefiend" v-if="!filmFromKp">
          Фильм не выбран
          <div class="side-film-block__undefiend-sub">
            Нажмите на фильм из списка для отображения дополнительной информации
          </div>
        </div>

        <div class="side-film-block__404" v-else-if="filmFromKp === '404'">
          404
          <div class="side-film-block__404-sub">
            Фильм не найден
          </div>
          <div class="side-film-block__404-sub-sub">
            Приносим свои извенения за неудобства, в данный момент выбранный вами фильм не доступен
          </div>
        </div>

        <div class="side-film-block__loading" v-else-if="filmFromKp === 'loading'">
          <LoadingPanel/>
        </div>

        <div class="side-film-block__film" v-else>

          <div class="side-film-block__poster">
            <img :src="filmFromKp.poster.previewUrl" alt="poster">
            <div class="side-film-block__rates">
              <div class="side-film-block__rate" v-if="filmFromKp.rating.kp">
                <sup>КП</sup>{{ (filmFromKp.rating.kp + '').substr(0, 3) }}
              </div>
              <div class="side-film-block__rate" style="margin-top: 7px;" v-if="filmFromKp.rating.imdb">
                <sup>IMDb</sup>{{ (filmFromKp.rating.imdb + '').substr(0, 3) }}
              </div>
            </div>
          </div>

          <div class="side-film-block__age">
            {{ type }}
            <template v-if="filmFromKp?.ageRating">{{ filmFromKp.ageRating }}+</template>
          </div>

          <div class="side-film-block__name">
            {{ filmFromKp.name }}
          </div>

          <div class="side-film-block__original-name">
            {{ filmFromKp.names[1].name }}
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Год:
            </div>
            <div class="side-film-block__splitted-right">
              {{ filmFromKp.year }}
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Время:
            </div>
            <div class="side-film-block__splitted-right">
              {{ length }}
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Бюджет:
            </div>
            <div class="side-film-block__splitted-right">
              {{ budget }}
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Сборы:
            </div>
            <div class="side-film-block__splitted-right">
              {{ fees }}
            </div>
          </div>

          <div class="side-film-block__serial" v-if="seasonsCount">
            <div class="side-film-block__splitted">
              <div class="side-film-block__splitted-left">
                Сезонов:
              </div>
              <div class="side-film-block__splitted-right">
                {{ seasonsCount }}
              </div>
            </div>

            <div class="side-film-block__splitted">
              <div class="side-film-block__splitted-left">
                Серий:
              </div>
              <div class="side-film-block__splitted-right">
                {{ episodesCount }}
              </div>
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Страны:
            </div>
            <div class="side-film-block__splitted-right">
              {{ countries }}
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Жанры:
            </div>
            <div class="side-film-block__splitted-right" v-html="genresList">
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Актеры:
            </div>
            <div class="side-film-block__splitted-right">
              <PersonsList :persons="actors"/>
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Продюсеры:
            </div>
            <div class="side-film-block__splitted-right">
              <PersonsList :persons="producers"/>
            </div>
          </div>

          <div class="side-film-block__splitted">
            <div class="side-film-block__splitted-left">
              Сценаристы:
            </div>
            <div class="side-film-block__splitted-right">
              <PersonsList :persons="writers"/>
            </div>
          </div>

          <div class="side-film-block__trailer" v-if="trailerUrl">
            <iframe width="100%"
                    height="auto"
                    :src="trailerUrl"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen></iframe>
          </div>

          <div class="side-film-block__desc">
            {{ filmFromKp.description }}
          </div>
          <div class="side-film-block__link">
            <a :href="'https://www.kinopoisk.ru/film/' + $route.query.film">
              Смотреть на Kinopoisk.ru
            </a>
          </div>

        </div>

      </div>
    </ScrollableBlock>

  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import PersonsList from "@/components/PersonsList";
import LoadingPanel from "@/components/LoadingPanel";
import ScrollableBlock from "@/components/ScrollableBlock";
import {onMounted, watch} from "vue";
import useLoadFilmFromKp from "@/composables/useLoadFilmFromKp";
import {useRoute} from "vue-router";
import useSideFilmBlockComputeds from "@/composables/useSideFilmBlockComputeds";

export default {
  components: {ScrollableBlock, LoadingPanel, PersonsList, MyButton},
  setup() {
    const route = useRoute()

    const {filmFromKp, isFilmLoading, loadFilmFromKp} = useLoadFilmFromKp()
    const {
      budget, fees, actors, producers, writers, trailerUrl, episodesCount, seasonsCount, length,
      genresList, countries, type
    } = useSideFilmBlockComputeds(filmFromKp)

    const onQueryFilmChanged = () => {
      if (route.query.film) {
        loadFilmFromKp(route.query.film)
      } else {
        filmFromKp.value = undefined
      }
    }

    watch(() => route.query.film, () => {
      onQueryFilmChanged()
    })

    onMounted(() => {
      onQueryFilmChanged()
    })

    return {
      filmFromKp,
      isFilmLoading,

      genresList,
      countries,
      type,

      budget,
      fees,
      actors,
      producers,
      writers,
      trailerUrl,
      episodesCount,
      seasonsCount,
      length,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.side-film-block {
  position: fixed;
  right: 0;
  top: 0;
  max-width: 300px;
  min-width: 240px;
  width: 100%;
  height: 100vh;
  text-align: center;
  z-index: 3;
  background: $color-bg-side;
  transition: right 0.1s;

  &__inner {
    padding: 0 15px;
  }

  &__undefiend {
    color: $color-text-light;
    font-size: 20px;
    padding: 100px 30px;
  }

  &__undefiend-sub {
    color: $color-text;
    font-size: 14px;
    margin-top: 20px;
  }

  &__404 {
    color: $color-text-light;
    font-size: 52px;
    padding: 100px 30px;
    font-weight: 700;
  }

  &__404-sub {
    color: $color-text-light;
    font-size: 18px;
    margin-top: 20px;
    font-weight: 400;
  }

  &__404-sub-sub {
    color: $color-text;
    font-size: 14px;
    margin-top: 20px;
    font-weight: 400;
  }

  &__loading {

  }

  &__film {
    padding-right: 12px;
  }

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
    margin: 15px auto 0;
    max-width: 240px;
    position: relative;

    img {
      width: 100%;
      object-fit: contain;
    }
  }

  &__rates {
    position: absolute;
    bottom: 6px;
    right: 6px;
  }

  &__rate {
    font-size: 18px;
    font-weight: 700;
    text-align: right;
    color: $color-text-light;
    text-shadow: 0 0 4px #000;

    sup {
      font-size: 9px;
      font-weight: 300;
      color: $color-text;
      padding-right: 3px;
    }
  }

  &__age {
    font-size: 14px;
  }

  &__name {
    font-weight: 700;
    font-size: 18px;
    margin-top: 5px;
  }

  &__original-name {

  }

  &__splitted {
    padding: 8px 0;
    border-bottom: 1px dashed $color-bg-input;

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
    font-size: 15px;
  }

  &__trailer {
    margin-top: 20px;
  }

  &__desc {
    font-size: 14px;
    margin-top: 20px;
  }

  &__link {
    font-size: 14px;
    margin-top: 30px;
    margin-bottom: 40px;
  }
}

@media screen and (max-width: 1460px) {
  .side-film-block {
    &__poster {
      max-width: 180px;
    }
  }
}

@media screen and (max-width: 1280px) {
  .side-film-block {
    right: -100%;

    &_visible {
      right: 0;
    }
  }
}

@media screen and (max-width: 770px) {
  .side-film-block {

    &__inner {
      padding: 0 15px 50px 15px;
    }
  }
}

@media screen and (max-width: 560px) {
  .side-film-block {
    max-width: 100%;
  }
}
</style>
