<template>
  <div class="blocks-page">

    <HeadBar :title="title"/>

    <div class="blocks-page__title">{{ title }}</div>

    <div class="blocks-page__blocks-list">
      <BlocksList :items-loader="itemsLoader"
                  :is-users="isUsers"/>
    </div>
  </div>
</template>

<script>
import HeadBar from "@/components/HeadBar";
import BlocksList from "@/components/BlocksList";

export default {
  components: {BlocksList, HeadBar},
  props: {
    isUsers: {
      type: Boolean,
      default: true
    },
    title: String,
    itemsLoader: Object
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.blocks-page {
  padding: 0 0 56px 0;
  height: 100%;


  &__title {
    font-size: 22px;
    color: $color-text-light;
    font-weight: 700;
    letter-spacing: 0.8px;
    padding: 15px 30px;
  }

  &__blocks-list {
    height: 100%;
  }
}

@media screen and (max-width: 1030px) {
  .blocks-page {
    &__title {
      padding: 15px;
    }
  }
}

@media screen and (max-width: 560px) {
  .blocks-page {
    padding: 50px 0 0 0;

    &__title {
      display: none;
    }
  }
}
</style>
