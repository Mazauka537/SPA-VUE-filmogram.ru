<template>
  <PopUp title="Создание новой коллекции">
    <form class="form-new-collection">

      <div class="form-new-collection__inputs">
        <div class="form-new-collection__image">
          <MyImageInput v-model="form.image"/>
        </div>
        <div class="form-new-collection__info">
          <MyInput type="text" placeholder="Название" v-model="form.title"/>
          <MyInput class="form-new-collection__input-desc" placeholder="Описание" v-model="form.description"/>
          <MyTextarea class="form-new-collection__textarea-desc" placeholder="Описание" v-model="form.description"/><!--
   --></div>
      </div>

      <MyButton class="form-new-collection__btn" @click="form.submit" :load="form.isSending" :white="true">Создать
      </MyButton>

    </form>
  </PopUp>
</template>

<script>
import MyInput from "@/components/UI/MyInput";
import MyTextarea from "@/components/UI/MyTextarea";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";
import {useRouter} from "vue-router/dist/vue-router";
import MyImageInput from "@/components/UI/MyImageInput";
import {useStore} from "vuex";
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp, MyImageInput, MyButton, MyTextarea, MyInput},
  setup() {
    const router = useRouter()
    const store = useStore()
    const requestMaker = useRequestMaker()

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
  margin-top: 30px;

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

  &__input-desc {
    display: none;
  }

  &__textarea-desc {
    margin-top: 15px;
    height: 130px;
  }

  &__btn {
    margin-top: 25px;
    width: 140px;
  }
}

@media screen and (max-width: 560px) {
  .form-new-collection {
    text-align: center;

    &__inputs {
      text-align: center;
      display: block;
    }

    &__image {
      margin: 0 auto;
    }

    &__info {
      margin-left: 0;
      margin-top: 60px;
    }

    &__input-desc {
      display: block;
      margin-top: 35px;
    }

    &__textarea-desc {
      display: none;
    }

    &__btn {
      margin-top: 60px;
    }
  }
}

</style>
