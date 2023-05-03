<template>
  <div class="collection-preview" :style="{transform: 'scale(' + imageScale + ')', opacity: imageOpacity}">
    <template v-if="imagePath">
      <img style="height: 100%; width: 100%; margin: 0; object-fit: cover"
           :src="imagePath">
    </template>
    <template v-else>
      <ImageSlabs :img1="sortedFilms[3]?.filmKp.posterUrlPreview"
                  :img2="sortedFilms[2]?.filmKp.posterUrlPreview"
                  :img3="sortedFilms[1]?.filmKp.posterUrlPreview"
                  :img4="sortedFilms[0]?.filmKp.posterUrlPreview"/>
    </template>
  </div>
</template>

<script>
import {ref} from "vue";
import ImageSlabs from "@/components/ImageSlabs";

export default {
  components: {ImageSlabs},
  props: {
    imagePath: String,
    sortedFilms: Array,
    scrollableBlock: Object
  },
  setup(props) {
    const imageScale = ref(1)
    const imageOpacity = ref(1)

    setTimeout(() => {
      const elemScrollableBlock = props.scrollableBlock.elemScrollableBlock.querySelector('.ss-content')

      elemScrollableBlock.addEventListener('scroll', () => {
        if (window.screen.width <= 560) {

          imageScale.value = 1 - elemScrollableBlock.scrollTop * 100 / 180 / 100
          imageOpacity.value = 1 - (elemScrollableBlock.scrollTop - 90) * 100 / 45 / 100

          if (imageScale.value < 0.5 ) imageScale.value = 0.5
          if (imageOpacity.value < 0 ) imageOpacity.value = 0

        } else {
          imageScale.value = 1
          imageOpacity.value = 1
        }
      })
    }, 300)

    return {
      imageScale,
      imageOpacity
    }
  }
}
</script>

<style scoped lang="scss">
.collection-preview {
  height: 100%;
  width: 100%;
  transform-origin: bottom;
}
</style>
