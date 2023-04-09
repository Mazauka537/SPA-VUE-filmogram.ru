<template>
  <div class="search-types-list">
    <button v-for="item in typeItems"
         class="search-types-list__item"
         :class="{'search-types-list__item_active': searchType === item.value}"
         @click="setType(item.value)">
      {{ item.name }}
    </button>
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  setup(_, {emit}) {
    const typeItems = [
      {name: 'Все', value: 'all'},
      {name: 'Фильмы', value: 'films'},
      {name: 'Коллекции', value: 'collections'},
      {name: 'Пользователи', value: 'users'},
    ]

    const searchType = ref(typeItems[0].value)

    const setType = type => {
      searchType.value = type
      emit('update:modelValue', searchType.value)
    }

    return {
      searchType,
      typeItems,
      setType
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.search-types-list {

  &__item {
    padding: 7px 11px;
    font-size: 13px;
    color: $color-text-light;
    background: $color-bg-search-type;
    border-radius: 100px;
    margin-right: 12px;
    cursor: pointer;

    &_active {
      background: $color-text-light;
      color: $color-bg-search-type;
    }
  }
}
</style>
