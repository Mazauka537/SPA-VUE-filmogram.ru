import {ref} from "vue";

export default function useEditNameInput() {
  const isNameEditing = ref(false)
  const nameInput = ref(null)

  const showEditName = () => {
    isNameEditing.value = true
    nameInput.value.hidden = false
    nameInput.value.focus()
  }

  const hideEditName = () => {
    isNameEditing.value = false
    nameInput.value.hidden = true
  }

  const inputKeyDown = e => {
    if (e.code === 'Enter') {
      nameInput.value.blur()
    }
  }

  return {
    isNameEditing,
    nameInput,
    showEditName,
    hideEditName,
    inputKeyDown
  }
}
