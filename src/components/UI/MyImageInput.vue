<template>
  <label class="my-image-input">
    {{ text }}
    <input class="my-image-input__input" type="file" accept="image/png,image/jpeg,image/gif" @input="updateInput">
  </label>
</template>

<script>
import {ref} from "vue";

export default {
  setup(_, {emit}) {

    const text = ref('Выберите фото')

    const updateInput = e => {
      let imageName = e.target.value.split('\\')
      imageName = imageName[imageName.length - 1]
      text.value = imageName

      const file = e.target.files[0]
      const fileReader = new FileReader()

      fileReader.addEventListener('load', () => {
        emit('update:modelValue', fileReader.result)
      })

      fileReader.readAsDataURL(file)
    }

    return {
      text,
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
  height: 35px;
  width: 100%;
  border: $border-main;
  background: $color-bg;
  padding: 5px 15px 0 15px;
  text-align: center;
  overflow-x: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  &__input {
    display: none;
  }
}
</style>
