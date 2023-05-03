<template>
  <div class="view-tests">

    <div class="view-tests__container">
      <div class="view-tests__preview" :style="{width: size + 'px', height: size + 'px'}">
        <img :src="defaultPoster">
        <img :src="defaultPoster">
        <img :src="defaultPoster">
        <img :src="defaultPoster">
      </div>

      <MyInput style="margin-top: 40px;" type="number" v-model="size"/>
    </div>

  </div>
</template>

<script>
import MySelect from "@/components/UI/MySelect";
import {ref} from "vue";
import MyButton from "@/components/UI/MyButton";
import MyInput from "@/components/UI/MyInput";

export default {
  components: {MyInput, MyButton, MySelect},
  props: {
    title: String
  },
  setup() {
    const size = ref(240)

    return {
      size,
      defaultPoster: 'https://kinopoiskapiunofficial.tech/images/posters/kp_small/746160.jpg',
    }
  }
}
</script>

<style scoped lang="scss">

.view-tests {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    padding: 20px;
    width: 500px;
  }

  &__preview {
    height: 180px;
    width: 180px;

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
}
</style>
