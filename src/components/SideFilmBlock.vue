<template>
  <div class="side-film-block" :class="{'side-film-block_visible': $route.query.film}">

    <HeadBar v-if="filmFromKp"
             :title="filmFromKp?.name"
             :scrollable-block="scrollableBlock"
             :scroll-height="220"
             style="position: absolute; display: block; text-align: left"/>

    <ScrollableBlock ref="scrollableBlock">
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

          <div class="side-film-block__poster" :style="scaleStyles">
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
import {onMounted, ref, watch} from "vue";
import useLoadFilmFromKp from "@/composables/useLoadFilmFromKp";
import {useRoute} from "vue-router";
import useSideFilmBlockComputeds from "@/composables/useSideFilmBlockComputeds";
import HeadBar from "@/components/HeadBar";
import useImageScaleCalculator from "@/composables/useImageScaleCalculator";

export default {
  components: {HeadBar, ScrollableBlock, LoadingPanel, PersonsList, MyButton},
  setup() {
    const route = useRoute()

    const scrollableBlock = ref(undefined)

    const {filmFromKp, isFilmLoading, loadFilmFromKp} = useLoadFilmFromKp()
    const {
      budget, fees, actors, producers, writers, trailerUrl, episodesCount, seasonsCount, length,
      genresList, countries, type
    } = useSideFilmBlockComputeds(filmFromKp)
    const {setScrollHandler, scaleStyles} = useImageScaleCalculator()

    setTimeout(() => {
      setScrollHandler(scrollableBlock.value, 300)
    }, 300)

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
      scrollableBlock,
      scaleStyles,

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
