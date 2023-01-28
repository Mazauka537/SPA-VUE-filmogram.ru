<template>
  <div class="collection-check">
    <div class="collection-check__name">
      {{ collection.title }}
      <span class="collection-check__films-count">{{ collection.films_count }}</span>
    </div>
    <div class="collection-check__checkbox">
      <MyCheckbox :checked="collection.isFilmAdded"/>
    </div>
  </div>
</template>

<script>
import MyCheckbox from "@/components/UI/MyCheckbox";
export default {
  components: {MyCheckbox},
  props: {
    collection: Object
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.collection-check {
  display: flex;
  justify-content: space-between;
  padding: 20px 0;

  &__name {

  }

  &__films-count {
    font-size: 14px;
  }

  &__checkbox {

  }
}
</style>
