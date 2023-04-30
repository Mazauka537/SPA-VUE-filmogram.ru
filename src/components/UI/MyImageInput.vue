<template>
  <div class="my-image-input">
    <img class="my-image-input__image" :src="imagePreviewSrc ?? startingImage ?? '/image.png'">

    <div class="my-image-input__hover">
      <label class="my-image-input__select-btn" :class="{'my-image-input__select-btn_center': !isImageSelected}">
        <span class="my-image-input__text">Выбрать фото</span>
        <input class="my-image-input__input" ref="elemInput" type="file" accept="image/png,image/jpeg,image/gif"
               @input="updateInput">
      </label>
      <div class="my-image-input__delete-btn" :class="{'my-image-input__delete-btn_hidden': !isImageSelected}"
           @click="clearImage">
        <span class="my-image-input__text">Удалить фото</span>
      </div>
    </div>

  </div>

  <div class="my-image-input__delete-btn-media" :class="{'my-image-input__delete-btn-media_hidden': !isImageSelected}"
       @click="clearImage">
    Удалить фото
  </div>
</template>

<script>
import {ref} from "vue";

export default {
  props: {
    startingImageSrc: String
  },
  setup(props, {emit}) {
    const isImageSelected = ref(!!props.startingImageSrc)
    const imagePreviewSrc = ref(undefined)
    const startingImage = ref(props.startingImageSrc)
    const elemInput = ref(undefined)

    const updateInput = e => {
      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.addEventListener('load', () => {
        emit('update:modelValue', fileReader.result)
        imagePreviewSrc.value = URL.createObjectURL(file)
        isImageSelected.value = true
      })

      fileReader.readAsDataURL(file)
    }

    const clearImage = () => {
      imagePreviewSrc.value = undefined
      isImageSelected.value = false
      startingImage.value = undefined
      elemInput.value.value = null
      emit('update:modelValue', undefined)
      emit('clear')
    }

    return {
      isImageSelected,
      imagePreviewSrc,
      startingImage,
      updateInput,
      clearImage,
      elemInput
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-image-input {
  cursor: pointer;
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
    color: $color-text;
  }

  &__select-btn, &__delete-btn {
    height: 50%;
    position: relative;
    display: block;
    cursor: pointer;

    &:hover {
      .my-image-input__text {
        color: $color-text-light;
      }
    }

    &:last-child {
      .my-image-input__text {
        transform: translateY(-100%);
      }
    }
  }

  &__select-btn {

    &_center {
      height: 100%;

      .my-image-input__text {
        transform: translateY(-50%);
      }
    }
  }

  &__delete-btn {

    &_hidden {
      display: none;
    }
  }

  &__delete-btn-media {
    display: none;
    color: $color-text-light;
    cursor: pointer;
    padding: 10px 0;
  }

  &__text {
    position: absolute;
    width: 100%;
    left: 0;
    top: 50%;
  }

  &__input {
    display: none;
  }
}

@media screen and (max-width: 560px) {
  .my-image-input {

    &__hover {
      display: block;
      background: transparent;
    }

    &__select-btn {
      height: 100%;

      .my-image-input__text {
        transform: translateY(-50%);
      }
    }

    &__delete-btn {
      display: none;
    }

    &__delete-btn-media {
      display: block;

      &_hidden {
        display: none;
      }
    }

    &__text {
      display: none;
    }
  }
}
</style>
