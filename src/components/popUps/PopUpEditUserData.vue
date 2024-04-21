<template>
  <PopUp title="Данные профиля">
    <form class="form-edit-user-data">

      <div class="form-edit-user-data__inputs">

        <div class="form-edit-user-data__avatar">
          <MyImageInput v-model="form.image"
                        @clear="isImageDeleted = true"
                        :is-circle="true"
                        :starting-image-src="$store.state.auth.user.avatar ? env.VUE_APP_AVATARS_PATH + $store.state.auth.user.avatar : undefined"/>
        </div>

        <div class="form-edit-user-data__info">

          <MyInput type="text" placeholder="Имя" v-model="form.name"/>

          <div class="form-edit-user-data__btn">
            <MyButton @click="form.submit"
                      :load="form.isSending"
                      :white="true">
              Сохранить
            </MyButton>
          </div>

        </div>

      </div>

    </form>
  </PopUp>
</template>

<script>
import MyImageInput from "@/components/UI/MyImageInput";
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import MyInput from "@/components/UI/MyInput";
import {ref} from "vue";
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp, MyInput, MyButton, MyImageInput},
  setup(_, {emit}) {
    const editUserDataRequest = async () => {
      const response = await requestMaker.fetch('edit/user/data', 'POST', {
        image: form.image,
        name: form.name,
        isImageDeleted: isImageDeleted.value
      }, [200, 422, 401])

      switch (response.status) {
        case 200:
          emit('userDataChanged')
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные, убедитесь что вы не забыли указать имя'
          })
          break;
        case 401:
          store.commit('notifications/addNotification', {
            text: 'Для изменения информации профиля необходима авторизация'
          })
          break;
      }
    }

    const store = useStore()
    const requestMaker = useRequestMaker()
    const form = useForm({
      image: undefined,
      name: store.state.auth.user.name
    }, editUserDataRequest)
    const isImageDeleted = ref(false)

    return {
      isImageDeleted,
      form,
      env: process.env
    }
  }
}
</script>

<style scoped lang="scss">

.form-edit-user-data {
  text-align: right;
  max-width: 500px;

  &__inputs {
    display: flex;
    align-items: center;
  }

  &__avatar {
    width: 180px;
    height: 180px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  &__info {
    flex-grow: 1;
    margin-left: 25px;
  }

  &__btn {
    margin-top: 30px;
  }
}

@media screen and (max-width: 560px) {
  .form-edit-user-data {
    text-align: center;
    margin-top: 30px;

    &__inputs {
      text-align: center;
      display: block;
    }

    &__avatar {
      margin: 0 auto;
    }

    &__info {
      margin-left: 0;
      margin-top: 60px;
    }

    &__btn {
      margin-top: 60px;
    }
  }
}

</style>
