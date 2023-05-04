<template>
  <div class="collection-preview" :style="scaleStyles">
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
import ImageSlabs from "@/components/ImageSlabs";
import useImageScaleCalculator from "@/composables/useImageScaleCalculator";

export default {
  components: {ImageSlabs},
  props: {
    imagePath: String,
    sortedFilms: Array,
    scrollableBlock: Object
  },
  setup(props) {
    const {setScrollHandler, scaleStyles} = useImageScaleCalculator()

    setTimeout(() => {
      setScrollHandler(props.scrollableBlock, 180)
    }, 300)

    return {
      scaleStyles
    }
  }
}
</script>

<style scoped lang="scss">
.collection-preview {
  height: 100%;
  width: 100%;
}
</style>
