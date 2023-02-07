<template>
  <div class="share-btn" @click="copyToClipboard">
    <svg width="100%" height="100%" viewBox="0 0 768 768">
      <path
          d="M128 639.968c-3.072 0-6.112-0.48-9.152-1.344-13.568-4.032-22.848-16.512-22.848-30.656v-32c0-153.6 108.192-283.648 256-313.472v-54.528c0-17.088 6.656-33.152 18.72-45.248 24.192-24.224 66.4-24.192 90.528-0.032l201.216 198.496c6.112 6.016 9.536 14.176 9.536 22.784s-3.424 16.768-9.536 22.784l-201.376 198.624c-23.872 23.872-66.144 24.032-90.336-0.16-12.096-12.096-18.752-28.16-18.752-45.248v-45.984c-79.84 6.432-144.736 31.52-197.248 111.488-6.080 9.216-16.16 14.496-26.752 14.496zM384 448.32c8.384 0 32-0.32 32-0.32v111.968l178.432-176-178.432-175.872v111.904c0 0-12.288-0.128-28.512 1.664-109.312 12.096-196 91.648-220.544 194.56 67.872-55.296 145.632-66.112 217.056-67.904z"></path>
    </svg>
  </div>
</template>

<script>

import {useStore} from "vuex";

export default {
  props: {
    link: String
  },
  setup(props) {
    const store = useStore()

    const copyToClipboard = () => {
      navigator.clipboard.writeText(props.link)
      store.commit('notifications/addNotification', {
        text: 'ссылка скопирована в буфер обмена'
      })
    }

    return {
      copyToClipboard
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.share-btn {
  height: 100%;
  width: 100%;

  svg {
    fill: $color-text-light;
  }
}
</style>
