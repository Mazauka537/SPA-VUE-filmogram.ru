import {reactive} from "vue";

export default function useImageScaleCalculator() {

  const scaleStyles = reactive({
    transformOrigin: 'bottom',
    transform: 'scale(' + 1 + ')',
    opacity: 1,
  })

  const setScrollHandler = (scrollableBlock, scrollHeight) => {
    const elemScrollableBlock = scrollableBlock.elemScrollableBlock.querySelector('.ss-content')

    elemScrollableBlock.addEventListener('scroll', () => {
      let imageScale
      let imageOpacity

      if (window.screen.width <= 560) {

        imageScale = 1 - elemScrollableBlock.scrollTop / scrollHeight
        imageOpacity = 1 - (elemScrollableBlock.scrollTop - (scrollHeight / 2)) / (scrollHeight / 4)

        if (imageScale < 0.5) imageScale = 0.5
        if (imageOpacity < 0) imageOpacity = 0

      } else {
        imageScale = 1
        imageOpacity = 1
      }

      scaleStyles.transform = 'scale(' + imageScale + ')'
      scaleStyles.opacity = imageOpacity
    })
  }

  return {
    setScrollHandler,
    scaleStyles
  }
}
