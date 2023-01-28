<template>
  <div class="film-table-head">
    <FilmTable>
      <template #number><span style="font-size: 14px">#</span></template>
      <template #name>название</template>
      <template #genre>жанр</template>
      <template #year>год</template>
      <template #rate>оценки</template>
    </FilmTable>
  </div>
</template>

<script>
import FilmTable from "@/components/FilmTable";
export default {
  components: {FilmTable}
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.film-table-head {
  text-transform: uppercase;
  font-size: 12px;
  letter-spacing: 0.2px;
  vertical-align: middle;
  padding-bottom: 7px;
  border-bottom: 1px solid rgba($color-text, 0.2);
}
</style>
