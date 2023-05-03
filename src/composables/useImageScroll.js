import {ref} from "vue";

export default function useImageScroll(scrollableBlock) {
  const imageScale = ref(1)
  const imageOpacity = ref(1)

  setTimeout(() => {
    const elemScrollableBlock = scrollableBlock.value.elemScrollableBlock.querySelector('.ss-content')

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
  }, 500)

  return {
    imageScale,
    imageOpacity
  }
}
