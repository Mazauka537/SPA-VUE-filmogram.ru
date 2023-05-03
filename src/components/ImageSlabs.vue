<template>
  <div class="image-slabs">
    <img :src="img1 ?? defaultPoster">
    <img :src="img2 ?? defaultPoster">
    <img :src="img3 ?? defaultPoster">
    <img :src="img4 ?? defaultPoster">
  </div>
</template>

<script>
export default {
  props: {
    img1: String,
    img2: String,
    img3: String,
    img4: String,
  },
  setup() {

    return {
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
    }
  }
}
</script>

<style scoped lang="scss">

.image-slabs {
  width: 100%;
  height: 100%;

  img {
    vertical-align: middle;
    background: #fff;
  }

  img:nth-child(4) {
    width: 66.666%;
    height: 100%;
    margin-left: -77.5%;
  }

  img:nth-child(3) {
    width: 60%;
    height: 90%;
    margin-left: -70.833%;
  }

  img:nth-child(2) {
    width: 53.333%;
    height: 80%;
    margin-left: -64.166%;
  }

  img:nth-child(1) {
    width: 46.666%;
    height: 70%;
    margin-left: 53.33%;
  }
}
</style>
