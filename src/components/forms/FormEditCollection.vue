<template>
  <form class="form-edit-collection">
    <div class="form-edit-collection__title">Редактирование коллекции</div>

    <MyInput type="text" placeholder="Название" v-model="form.title" style="margin-top: 30px;"/>
    <MyTextarea placeholder="Описание" v-model="form.description" style="margin-top: 30px;"/>

    <MyButton @click="form.submit" :load="form.isSending" style="margin-top: 30px; margin-bottom: 15px">Сохранить</MyButton>

  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyTextarea from "@/components/UI/MyTextarea";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";

export default {
  components: {MyButton, MyTextarea, MyInput},
  props: {
    collection: Object
  },
  setup({collection}, {emit}) {
    const requestMaker = useRequestMaker()

    const createNewCollectionRequest = async () => {
      const response = await requestMaker.fetch('edit/collection', 'POST', {
        id: collection.id,
        title: form.title,
        description: form.description
      }, [200, 422, 401])

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          emit('collectionEdited', responseData)
          break;
      }
    }

    const form = useForm({
      title: collection.title,
      description: collection.description
    }, createNewCollectionRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">

  .form-edit-collection {

    &__title {
      text-align: center;
      font-size: 16px;
      font-weight: 600;
      padding-top: 10px;
    }
  }

</style>
