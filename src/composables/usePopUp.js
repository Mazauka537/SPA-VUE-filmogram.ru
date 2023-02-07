import {reactive, ref} from 'vue'

export default function usePopUp(onHideCallback = null, onShowCallback = null) {
  const visible = ref(false)
  const onHide = ref(onHideCallback)
  const onShow = ref(onShowCallback)

  const show = (...callbackParams) => {
    visible.value = true
    if (onShow.value) onShow.value(...callbackParams)
  }

  const hide = (...callbackParams) => {
    visible.value = false
    if (onHide.value) onHide.value(...callbackParams)
  }

  return reactive({
    visible,
    show,
    hide,
    onShow,
    onHide
  })
}
