<template>
  <div class="collection-block">

    <div class="collection-block__save" :class="{'collection-block__save_saved': collection.isInSaves}"
         @click.stop.prevent="$emit('toggleSaves', collection.id)">
      <svg width="100%" height="100%" viewBox="0 0 768 768">
        <path
            d="M384 640c-6.24 0-12.512-1.824-17.952-5.504-7.2-4.832-176.256-119.36-228.672-171.872-58.592-58.592-65.376-120.864-65.376-162.624 0-94.848 77.152-172 172-172 57.664 0 108.736 28.512 140 72.192 31.264-43.68 82.336-72.192 140-72.192 94.848 0 172 77.152 172 172 0 41.76-6.784 104.032-65.376 162.624-52.512 52.512-221.536 167.040-228.672 171.872-5.44 3.68-11.712 5.504-17.952 5.504zM244 192c-59.552 0-108 48.448-108 108 0 34.976 5.536 76.288 46.624 117.376 38.784 38.784 156.256 120.8 201.376 151.872 45.12-31.072 162.592-113.088 201.376-151.872 41.088-41.088 46.624-82.4 46.624-117.376 0-59.552-48.448-108-108-108s-108 48.448-108 108c0 17.664-14.304 32-32 32s-32-14.336-32-32c0-59.552-48.448-108-108-108z"></path>
      </svg>
    </div>

    <router-link class="collection-block__user link" :to="'/user/' + collection.user_id">
      @{{ collection.user.login }}
    </router-link>

    <div class="collection-block__left">
      <div class="collection-block__preview">
        <img :src="posters[3] ?? defaultPoster">
        <img :src="posters[2] ?? defaultPoster">
        <img :src="posters[1] ?? defaultPoster">
        <img :src="posters[0] ?? defaultPoster">
      </div>
    </div>

    <div class="collection-block__right">

      <div class="collection-block__title">{{ collection.title }}</div>
      <div class="collection-block__films">{{ filmsCount }}</div>
      <div class="collection-block__desc">{{ collection.description }}</div>

    </div>
  </div>
</template>

<script>
import useRequestMaker from "@/composables/useRequestMaker";
import {onMounted, ref} from "vue";
import useFilmsCount from "@/composables/useFilmsCount";

export default {
  props: {
    collection: Object
  },
  setup(props) {
    const requestMaker = useRequestMaker()
    const {filmsCount} = useFilmsCount(props)

    const posters = ref([])

    onMounted(async () => {
      const response = await requestMaker.fetch('get/posters', 'GET', {
        collection_id: props.collection.id
      }, [200])

      posters.value = await response.json()
    })

    return {
      posters,
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
      filmsCount,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.collection-block {
  display: flex;
  align-items: center;
  position: relative;

  &__save {
    position: absolute;
    top: 0;
    right: 0;
    width: 24px;
    height: 24px;

    svg {
      fill: $color-placeholder;
      transition: fill 0.2s;
    }

    &:hover {
      svg {
        fill: $color-text;
      }
    }

    &_saved {
      svg {
        fill: $color-main;
      }

      &:hover {
        svg {
          fill: $color-main;
        }
      }
    }
  }

  &__user {
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 13px;
    color: $color-text;
  }

  &__left {
  }

  &__right {
    padding-left: 20px;
    min-width: 0;
    flex-grow: 1;
  }

  &__preview {
    height: 120px;
    width: 119px;

    img {
      vertical-align: middle;
      background: #fff;
    }

    img:nth-child(4) {
      width: 80px;
      height: 120px;
      margin-left: -93px;
    }

    img:nth-child(3) {
      width: 72px;
      height: 108px;
      margin-left: -85px;
    }

    img:nth-child(2) {
      width: 64px;
      height: 96px;
      margin-left: -77px;
    }

    img:nth-child(1) {
      width: 56px;
      height: 84px;
      margin-left: 63px;
    }
  }

  &__title {
    font-weight: 700;
  }

  &__films {
    font-size: 13px;
    color: $color-text;
  }

  &__desc {
    margin-top: 10px;
  }
}

</style>
