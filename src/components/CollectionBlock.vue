<template>
  <router-link :to="'/collection/' + collection.id" class="collection-block">

    <div class="collection-block__image">
      <template v-if="collection.image">
        <img style="height: 100%; width: 100%; margin: 0; object-fit: cover"
             :src="'http://127.0.0.1:8000/storage/images/collections/' + collection.image" alt="">
      </template>
      <template v-else>
        <ImageSlabs :img1="collection.posters[3]"
                    :img2="collection.posters[2]"
                    :img3="collection.posters[1]"
                    :img4="collection.posters[0]"/>
      </template>
    </div>

    <div class="collection-block__title">
      {{ collection.title }}
    </div>

  </router-link>
</template>

<script>

import ImageSlabs from "@/components/ImageSlabs";
export default {
  components: {ImageSlabs},
  props: {
    collection: Object
  },
  setup() {

    return {
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.collection-block {
  padding: 15px;
  width: 180px;
  height: 227px;
  background: $color-bg-side;
  display: inline-block;
  border-radius: 7px;

  &:hover {
    background: $color-bg-input;
  }

  &__image {
    height: 150px;
    width: 150px;
  }

  &__title {
    margin-top: 15px;
    font-weight: 700;
    color: $color-text-light;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

@media screen and (max-width: 1460px) {
  .collection-block {
    width: 150px;
    height: 190px;

    &__image {
      height: 120px;
      width: 120px;
    }

    &__title {
      font-weight: 700;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 560px) {
  .collection-block {
    width: 100%;
    height: auto;
    padding: 0;
    background: transparent;

    &:hover {
      background: transparent;
    }

    &__image {
      height: 60px;
      width: 60px;
      display: inline-block;
      vertical-align: middle;
    }

    &__title {
      display: inline-block;
      margin-top: 0;
      margin-left: 10px;
      font-weight: 400;
      vertical-align: middle;
    }
  }
}

</style>
