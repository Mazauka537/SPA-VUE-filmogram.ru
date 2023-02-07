<template>
  <label class="my-image-input">
    <img class="my-image-input__image" :src="imagePreviewSrc ?? startingImageSrc ?? '/image.png'">

    <div class="my-image-input__hover">
      <span class="my-image-input__text">Выбрать фото</span>
    </div>

    <input class="my-image-input__input" type="file" accept="image/png,image/jpeg,image/gif" @input="updateInput">
  </label>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    startingImageSrc: String
  },
  setup(_, {emit}) {

    const imagePreviewSrc = ref(undefined)

    const updateInput = e => {
      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.addEventListener('load', () => {
        emit('update:modelValue', fileReader.result)
        imagePreviewSrc.value = URL.createObjectURL(file)
      })

      fileReader.readAsDataURL(file)

    }

    return {
      imagePreviewSrc,
      updateInput
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-image-input {
  cursor: pointer;
  display: block;
  height: 100%;
  width: 100%;
  background: $color-bg-input;
  border-radius: 3px;
  overflow: hidden;
  position: relative;

  &:hover {

    .my-image-input__hover {
      display: block;
    }
  }

  &__image {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }

  &__hover {
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    background: rgba($color-bg-nav, 0.5);
    color: $color-text-light;
  }

  &__text {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__input {
    display: none;
  }
}
</style>
