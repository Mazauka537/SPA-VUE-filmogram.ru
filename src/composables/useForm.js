import {reactive} from "vue";

export default function useForm(fields = {}, onSubmit = null) {
  const form = reactive({})

  for (let key in fields) {
    form[key] = fields[key]
  }

  form.isSending = false

  form.submit = async () => {
    form.isSending = true
    if (onSubmit) await onSubmit()
    form.isSending = false
  }

  return form
}
