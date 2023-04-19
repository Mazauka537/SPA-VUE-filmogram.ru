<template>
  <PopUp :closable="false" title="Фильтр поиска фильмов">
    <form class="form-films-filter">

      <MySelect :options="orderOptions" v-model="form.order" style="margin-top: 20px;"/>
      <MySelect :options="typeOptions" v-model="form.type" style="margin-top: 30px;"/>
      <MySelect :options="genreOptions" v-model="form.genre" style="margin-top: 30px;"/>

      <div class="form-films-filter__input-line" style="margin-top: 40px;">
        <MyInput min="1000" max="3000" type="number" placeholder="Год от" v-model="form.year_from" style="width: 47%;"/>
        <MyInput min="1000" max="3000" type="number" placeholder="Год до" v-model="form.year_to" style="width: 47%;"/>
      </div>

      <div class="form-films-filter__input-line" style="margin-top: 30px;">
        <MyInput min="0" max="10" type="number" placeholder="Рейтинг от" v-model="form.rating_from" style="width: 47%;"/>
        <MyInput min="0" max="10" type="number" placeholder="Рейтинг до" v-model="form.rating_to" style="width: 47%;"/>
      </div>

      <div class="form-films-filter__btn">
        <MyButton @click.prevent="form.submit" :white="true" style="margin-top: 35px;">Применить</MyButton>
      </div>

    </form>
  </PopUp>
</template>

<script>
import MySelect from "@/components/UI/MySelect";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp, MyButton, MyInput, MySelect},
  props: {
    initialFilter: Object
  },
  setup(props, {emit}) {
    const orderOptions = [
      {name: 'По популярности', value: 'NUM_VOTE'},
      {name: 'По рейтигу', value: 'RATING'},
      {name: 'По дате релиза', value: 'YEAR'}
    ]

    const typeOptions = [
      {name: 'Все', value: 'ALL'},
      {name: 'Фильмы', value: 'FILM'},
      {name: 'Сериалы', value: 'TV_SERIES'},
      {name: 'Мини-сериалы', value: 'MINI_SERIES'},
      {name: 'ТВ шоу', value: 'TV_SHOW'}
    ]

    const genreOptions = [
      {name: 'Все жанры', value: 0},
      {name: 'триллер', value: 1},
      {name: 'криминал', value: 3},
      {name: 'детектив', value: 5},
      {name: 'боевик', value: 11},
      {name: 'приключения', value: 7},
      {name: 'фантастика', value: 6},
      {name: 'вестерн', value: 10},
      {name: 'фэнтези', value: 12},
      {name: 'ужасы', value: 17},
      {name: 'драма', value: 2},
      {name: 'мелодрама', value: 4},
      {name: 'биография', value: 8},
      {name: 'комедия', value: 13},
      {name: 'военный', value: 14},
      {name: 'документальный', value: 22},
      {name: 'история', value: 15},
      {name: 'мультфильм', value: 18},
      {name: 'аниме', value: 24},
      {name: 'семейный', value: 19},
      {name: 'детский', value: 33},
      {name: 'короткометражка', value: 23},
      {name: 'фильм-нуар', value: 9},
      {name: 'музыка', value: 16},
      {name: 'мюзикл', value: 20},
      {name: 'спорт', value: 21},
      {name: 'для взрослых', value: 28},
      {name: 'концерт', value: 27},
      {name: 'новости', value: 26},
      {name: 'игра', value: 31},
      {name: 'реальное ТВ', value: 30},
      {name: 'ток-шоу', value: 32},
      {name: 'церемония', value: 29},
    ]

    const formSubmit = () => {
      if (form.year_from !== '' && form.year_from < 1000) form.year_from = 1000
      if (form.year_from !== '' && form.year_from > 3000) form.year_from = 3000
      if (form.year_to !== '' && form.year_to < 1000) form.year_to = 1000
      if (form.year_to !== '' && form.year_to > 3000) form.year_to = 3000
      if (form.rating_from !== '' && form.rating_from < 0) form.rating_from = 0
      if (form.rating_from !== '' && form.rating_from > 10) form.rating_from = 10
      if (form.rating_to !== '' && form.rating_to < 0) form.rating_to = 0
      if (form.rating_to !== '' && form.rating_to > 10) form.rating_to = 10

      if (form.year_from !== '' && form.year_to !== '' && form.year_from > form.year_to) {
        form.year_from = ''
        form.year_to = ''
      }
      if (form.rating_from !== '' && form.rating_to !== '' && form.rating_from > form.rating_to) {
        form.rating_from = ''
        form.rating_to = ''
      }

      if (form.rating_from !== '') form.rating_from = Math.floor(form.rating_from)
      if (form.rating_to !== '') form.rating_to = Math.floor(form.rating_to)
      if (form.year_from !== '') form.year_from = Math.floor(form.year_from)
      if (form.year_to !== '') form.year_to = Math.floor(form.year_to)

      emit('filtered', form)
    }

    const form = useForm(props.initialFilter, formSubmit)

    return {
      orderOptions,
      typeOptions,
      genreOptions,
      form
    }
  }
}
</script>

<style scoped lang="scss">

.form-films-filter {
  width: 100%;
  max-width: 400px;

  &__input-line {
    display: flex;
    justify-content: space-between;
  }

  &__btn {
    text-align: right;
  }
}
</style>
