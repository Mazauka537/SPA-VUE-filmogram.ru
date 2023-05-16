<template>
  <router-link :to="'/collection/' + collection.id" class="collection-block-mini">

    <div class="collection-block-mini__image">
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

    <div class="collection-block-mini__title">
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
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.collection-block-mini {
  display: inline-block;
  width: 100%;
  padding: 5px;
  border-radius: 7px;

  &:hover {
    background: $color-bg-side;
  }

  &__image {
    height: 40px;
    width: 40px;
    display: inline-block;
    vertical-align: middle;
  }

  &__title {
    font-size: 13px;
    color: $color-text-light;
    margin-left: 10px;
    max-width: 164px;
    display: inline-block;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}

@media screen and (max-width: 1460px) {
  .collection-block-mini {

    &__title {
      max-width: 124px;
    }
  }
}
</style>
