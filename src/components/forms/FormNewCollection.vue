<template>
  <form class="form-new-collection">
    <div class="form-new-collection__title">Новая коллекция</div>

    <MyInput type="text" placeholder="Название" v-model="form.title" style="margin-top: 30px;"/>
    <MyTextarea placeholder="Описание" v-model="form.description" style="margin-top: 30px;"/>

    <MyButton @click="form.submit" :load="form.isSending" style="margin-top: 30px; margin-bottom: 15px">Создать</MyButton>

  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyTextarea from "@/components/UI/MyTextarea";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";
import {useRouter} from "vue-router/dist/vue-router";

export default {
  components: {MyButton, MyTextarea, MyInput},
  setup() {
    const requestMaker = useRequestMaker()
    const router = useRouter()

    const createNewCollectionRequest = async () => {
      const response = await requestMaker.fetch('create/collection', 'POST', {
        title: form.title,
        description: form.description
      }, [200, 422, 401])

      switch (response.status) {
        case 201:
          const responseData = await response.json()
          router.push('/collection/' + responseData.id)
          break;
        case 422:

          break;
        case 401:

          break;
      }
    }

    const form = useForm({
      title: '',
      description: ''
    }, createNewCollectionRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">

  .form-new-collection {

    &__title {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      padding-top: 10px;
    }
  }

</style>
