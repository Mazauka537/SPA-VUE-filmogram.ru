<template>
  <PopUp title="Изменение сведений">
    <form class="form-edit-collection">

      <div class="form-edit-collection__inputs">
        <div class="form-edit-collection__image">
          <MyImageInput v-model="form.image"
                        @clear="isImageDeleted = true"
                        :starting-image-src="collection.image ? 'http://127.0.0.1:8000/storage/images/collections/' + collection.image : undefined"/>
        </div>
        <div class="form-edit-collection__info">
          <MyInput type="text" placeholder="Название" v-model="form.title"/>
          <MyInput class="form-edit-collection__input-desc" placeholder="Описание" v-model="form.description"/>
          <MyTextarea class="form-edit-collection__textarea-desc" placeholder="Описание" v-model="form.description"/><!--
   --></div>
      </div>

      <MyButton class="form-edit-collection__btn" @click="form.submit" :load="form.isSending" :white="true">
        Сохранить
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
import MyImageInput from "@/components/UI/MyImageInput";
import {ref} from "vue";
import {useStore} from "vuex";
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp, MyImageInput, MyButton, MyTextarea, MyInput},
  props: {
    collection: Object
  },
  setup({collection}, {emit}) {
    const requestMaker = useRequestMaker()
    const store = useStore()

    const editCollectionRequest = async () => {
      const response = await requestMaker.fetch('edit/collection', 'POST', {
        id: collection.id,
        image: form.image,
        title: form.title,
        description: form.description,
        isImageDeleted: isImageDeleted.value
      }, [200, 422, 403])

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          emit('collectionEdited', responseData)
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные'
          })
          break;
        case 403:
          store.commit('notifications/addNotification', {
            text: 'Только владелец коллекции может изменять её сведения'
          })
          break;
      }
    }

    const isImageDeleted = ref(false)
    const form = useForm({
      image: undefined,
      title: collection.title,
      description: collection.description
    }, editCollectionRequest)

    return {
      isImageDeleted,
      form,
    }
  }
}
</script>

<style scoped lang="scss">

.form-edit-collection {
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
  .form-edit-collection {
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
