<template>
  <PopUp title="Изменение Email">
    <form class="form-edit-email">

      <MyInput type="text" placeholder="Email" v-model="form.email"/>

      <div class="form-edit-email__btn">
        <MyButton @click="form.submit"
                  :load="form.isSending"
                  :white="true">
          Сохранить
        </MyButton>
      </div>

    </form>
  </PopUp>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import MyInput from "@/components/UI/MyInput";
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp, MyInput, MyButton},
  setup(_, {emit}) {
    const editEmailRequest = async () => {
      const response = await requestMaker.fetch('edit/email', 'POST', {
        email: form.email,
      }, [200, 422, 401, 406])

      switch (response.status) {
        case 200:
          store.commit('notifications/addNotification', {
            text: 'Email успешно изменен'
          })
          emit('emailChanged')
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные, убедитесь что Email аддрес введен правильно'
          })
          break;
        case 401:
          store.commit('notifications/addNotification', {
            text: 'Для изменения Email необходима авторизация'
          })
          break;
        case 406:
          store.commit('notifications/addNotification', {
            text: 'Данный Email уже используется'
          })
          break;
      }
    }

    const store = useStore()
    const requestMaker = useRequestMaker()

    const form = useForm({
      email: store.state.auth.user.email,
    }, editEmailRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">

.form-edit-email {
  padding-top: 10px;
  min-width: 350px;
  text-align: right;

  &__btn {
    margin-top: 20px;
  }
}

@media screen and (max-width: 560px) {
  .form-edit-email {
    text-align: center;
    margin-top: 60px;
    min-width: auto;

    &__btn {
      margin-top: 70px;
    }
  }
}

</style>
