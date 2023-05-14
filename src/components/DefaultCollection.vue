<template>
  <div class="default-collection" :class="{'default-collection_flipped': isFlipped}">
    <div class="default-collection__img">
      <router-link :to="'/default/collection/' + collection.id">
        <img :src="'http://127.0.0.1:8000/storage/images/defaultCollections/' + collection.image"
             alt="collection image">
      </router-link>
    </div>
    <div class="default-collection__info">
      <h1 class="default-collection__title">
        <router-link class="default-collection__title-link" :to="'/default/collection/' + collection.id">
          {{ collection.title }}
        </router-link>
      </h1>
      <p class="default-collection__desc">
        {{ collection.description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    collection: Object,
    isFlipped: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.default-collection {
  display: flex;
  align-items: center;

  &_flipped {
    flex-direction: row-reverse;

    .default-collection {
      &__info {
        text-align: right;
      }
    }
  }

  &__img {
    height: 180px;
    width: 180px;
    flex-shrink: 0;

    img {
      width: 100%;
      height: 100%;
    }
  }

  &__info {
    padding: 0 30px;
    flex-grow: 1;
    max-width: 500px;
  }

  &__title {
    color: $color-text-light;
    font-size: 28px;
  }

  &__desc {
    font-size: 18px;
    margin-top: 30px;
    color: $color-text;
    font-weight: 300;
  }
}
</style>
