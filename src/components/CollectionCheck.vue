<template>
  <div class="collection-check">
    <div class="collection-check__name">
      {{ collection.title }}
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
  padding: 15px 0;

  &__name {

  }

  &__checkbox {

  }
}
</style>
