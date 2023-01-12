<template>
  <div class="my-search-input__wrapper icon-search">
    <input class="my-search-input"
           type="text"
           :placeholder="placeholder"
           :value="modelValue"
           @focus="$emit('focus')"
           @input="e => $emit('update:modelValue', e.target.value)">
    <div class="my-search-input__spin" v-if="isLoading">
      <svg width="100%" height="100%" viewBox="0 0 48 48">
        <path
            d="M31.0711 16.9289C29.6725 15.5304 27.8907 14.578 25.9509 14.1922C24.0111 13.8063 22.0004 14.0043 20.1732 14.7612C18.3459 15.5181 16.7841 16.7998 15.6853 18.4443C14.5865 20.0888 14 22.0222 14 24C14 25.9778 14.5865 27.9112 15.6853 29.5557C16.7841 31.2002 18.3459 32.4819 20.1732 33.2388C22.0004 33.9957 24.0111 34.1937 25.9509 33.8079C27.8907 33.422 29.6725 32.4696 31.0711 31.0711C31.8521 30.29 33.1184 30.29 33.8995 31.0711C34.6805 31.8521 34.6805 33.1185 33.8995 33.8995C31.9416 35.8574 29.447 37.1908 26.7313 37.731C24.0155 38.2712 21.2006 37.9939 18.6424 36.9343C16.0843 35.8747 13.8978 34.0803 12.3594 31.778C10.8211 29.4757 10 26.7689 10 24C10 21.2311 10.8211 18.5243 12.3594 16.222C13.8978 13.9197 16.0843 12.1253 18.6424 11.0657C21.2006 10.0061 24.0155 9.72882 26.7313 10.269C29.447 10.8092 31.9416 12.1426 33.8995 14.1005C34.6805 14.8816 34.6805 16.1479 33.8995 16.9289C33.1184 17.71 31.8521 17.71 31.0711 16.9289Z"
            fill="#333333"/>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: 'Search'
    },
    isLoading: Boolean,
    modelValue: String
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.my-search-input {
  height: 35px;
  width: 100%;
  border: $border-main;
  background: $color-bg;
  border-radius: 50px;
  padding: 0 15px 0 40px;

  &::placeholder {
    color: $color-placeholder;
  }

  &__wrapper {
    position: relative;

    &:before {
      position: absolute;
      color: $color-placeholder;
      font-size: 20px;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      padding-bottom: 2.4px;
    }
  }

  &__spin {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 50%;
    transform: translateY(-50%);
    right: 3px;
    animation: rotate 1s infinite linear;

    path {
      fill: $color-placeholder;
    }
  }
}

@keyframes rotate {
  from {
    transform: translateY(-50%) rotate(0);
  }
  to {
    transform: translateY(-50%) rotate(360deg);
  }
}
</style>
