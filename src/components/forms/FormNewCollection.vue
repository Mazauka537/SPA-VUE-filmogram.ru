<template>
  <form class="form-new-collection">

    <div class="form-new-collection__inputs">
      <div class="form-new-collection__image">
        <MyImageInput v-model="form.image"/>
      </div>
      <div class="form-new-collection__info">
        <MyInput type="text" placeholder="Название" v-model="form.title"/>
        <MyTextarea placeholder="Описание" v-model="form.description" style="margin-top: 15px; height: 130px;"/><!--
   --></div>
    </div>

    <MyButton @click="form.submit" :load="form.isSending" :white="true" style="margin-top: 25px; width: 140px;">Создать
    </MyButton>

  </form>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyTextarea from "@/components/UI/MyTextarea";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";
import {useRouter} from "vue-router/dist/vue-router";
import MyImageInput from "@/components/UI/MyImageInput";
import {ref} from "vue";
import {useStore} from "vuex";

export default {
  components: {MyImageInput, MyButton, MyTextarea, MyInput},
  setup() {
    const requestMaker = useRequestMaker()
    const router = useRouter()
    const store = useStore()

    const createNewCollectionRequest = async () => {
      const response = await requestMaker.fetch('create/collection', 'POST', {
        title: form.title,
        description: form.description,
        image: form.image
      }, [200, 422, 401])

      switch (response.status) {
        case 201:
          const responseData = await response.json()
          router.push('/collection/' + responseData.id)
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные, убедитесь что вы задали название коллекции и что изображение имеем формат png или jpeg'
          })
          break;
        case 401:
          store.commit('notifications/addNotification', {
            text: 'Создавать коллекции могут только авторизированные пользователи'
          })
          break;
      }
    }

    const form = useForm({
      title: '',
      description: '',
      image: ''
    }, createNewCollectionRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.form-new-collection {
  text-align: right;
  max-width: 500px;

  &__inputs {
    text-align: left;
    display: flex;
  }

  &__image {
    width: 180px;
    height: 180px;
    flex-shrink: 0;
  }

  &__info {
    flex-grow: 1;
    margin-left: 15px;
  }
}

</style>
