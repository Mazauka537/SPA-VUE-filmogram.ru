<template>
  <router-link :to="'/collection/' + collection.id" class="collection-block">

    <div class="collection-block__image">
      <template v-if="collection.image">
        <img style="height: 100%; width: 100%; margin: 0; object-fit: cover" :src="'http://127.0.0.1:8000/storage/images/collections/' + collection.image" alt="">
      </template>
      <template v-else>
        <img :src="collection.posters[3] ?? defaultPoster">
        <img :src="collection.posters[2] ?? defaultPoster">
        <img :src="collection.posters[1] ?? defaultPoster">
        <img :src="collection.posters[0] ?? defaultPoster">
      </template>
    </div>

    <div class="collection-block__title">
      {{ collection.title }}
    </div>

  </router-link>
</template>

<script>

export default {
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
  padding: 15px 15px 30px 15px;
  background: $color-bg-side;
  display: block;
  border-radius: 7px;

  &:hover {
    background: $color-bg-input;
  }

  &__image {
    height: 150px;
    width: 150px;

    img {
      vertical-align: middle;
      background: #fff;
    }

    img:nth-child(4) {
      width: 100px;
      height: 150px;
      margin-left: -117px;
    }

    img:nth-child(3) {
      width: 90px;
      height: 135px;
      margin-left: -107px;
    }

    img:nth-child(2) {
      width: 80px;
      height: 120px;
      margin-left: -96px;
    }

    img:nth-child(1) {
      width: 70px;
      height: 105px;
      margin-left: 80px;
    }
  }

  &__title {
    margin-top: 15px;
    font-weight: 700;
    color: $color-text-light
  }
}

</style>
