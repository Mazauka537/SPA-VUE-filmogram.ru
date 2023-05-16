<template>
  <PopUp title="Служба поддержки">
    <form class="form-support">

      <MyTextarea class="form-support__textarea-q" placeholder="Ваш вопрос" v-model="form.question"/>
      <MyInput class="form-support__input-q" placeholder="Ваш вопрос" v-model="form.question"/>
      <MyInput class="form-support__input" placeholder="Ваш Email для отправки ответа" v-model="form.email"/>

      <div class="form-support__btn">
        <MyButton @click="form.submit"
                  :load="form.isSending"
                  :white="true">
          Отправить
        </MyButton>
      </div>

    </form>
  </PopUp>
</template>

<script>
import PopUp from "@/components/popUps/PopUp";
import MyTextarea from "@/components/UI/MyTextarea";
import MyInput from "@/components/UI/MyInput";
import MyButton from "@/components/UI/MyButton";
import useForm from "@/composables/useForm";
import useRequestMaker from "@/composables/useRequestMaker";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";

export default {
  components: {MyButton, MyInput, MyTextarea, PopUp},
  setup() {
    const store = useStore()
    const router = useRouter()
    const requestMaker = useRequestMaker()

    const sendLetterToSupport = async () => {
      const response = await requestMaker.fetch('add/question', 'POST', {
        question: form.question,
        email: form.email
      }, [200, 422])

      switch (response.status) {
        case 200:
          store.commit('notifications/addNotification', {
            text: 'Вопрос успешно создан. Ответ придет на указанный Email в течении 2 дней.'
          })
          router.back()
          break;
        case 422:
          store.commit('notifications/addNotification', {
            text: 'Введены не корректные данные, убедитесь что Email аддрес введен правильно'
          })
          break;
      }
    }

    const form = useForm({
      question: '',
      email: '',
    }, sendLetterToSupport)

    return {
      form
    }
  }
}
</script>

<style scoped lang="scss">
.form-support {

  &__textarea-q {
    margin-top: 10px;
  }

  &__input-q {
    display: none;
    margin-top: 60px;
  }

  &__input {
    margin-top: 20px;
  }

  &__btn {
    margin-top: 20px;
    text-align: right;
  }
}

@media screen and (max-width: 560px) {
  .form-support {

    &__textarea-q {
      display: none;
    }

    &__input-q {
      display: block;
    }

    &__input {
      margin-top: 40px;
    }

    &__btn {
      margin-top: 60px;
      text-align: center;
    }
  }
}
</style>
