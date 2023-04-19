<template>
  <div class="sw-profile">
    <div class="sw-profile__inner">

      <SWRow>
        <template #label>
          <img class="sw-profile__avatar"
               ref="elemAvatarImg"
               :src="($store.state.auth.user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + $store.state.auth.user.avatar : '/user.jpg') + '?=1'"
               alt="avatar">
        </template>
        <template #input>
          <div class="sw-profile__username">{{ $store.state.auth.user.name }}</div>
          <div class="sw-profile__email">{{ $store.state.auth.user.email }}</div>
        </template>
      </SWRow>

      <form>

        <SWRow>
          <template #label>
            Аватар
          </template>
          <template #input>
            <div class="sw-profile__avatar2">
              <div class="sw-profile__avatar-image">
                <MyImageInput v-model="form.image"
                              @clear="isImageDeleted = true"
                              :starting-image-src="'http://127.0.0.1:8000/storage/images/avatars/' +  $store.state.auth.user.avatar"/>
              </div>

              <span class="sw-profile__avatar-desc">
                Выберите фото по которому вас смогут узнать другие пользователи
              </span>
            </div>
          </template>
          <template #sub>
          </template>
        </SWRow>

        <SWRow>
          <template #label>
            Имя
          </template>
          <template #input>
            <MyInput v-model="form.name"/>
          </template>
          <template #sub>
            Используйте имя, под которым вас знают: ваше имя и фамилию, никнейм или название компании.
          </template>
        </SWRow>

        <SWRow>
          <template #label>
            Email
          </template>
          <template #input>
            <MyInput type="email" v-model="form.email"/>
          </template>
          <template #sub>
            Email используется для входа в учетную запись, отправки уведомлений, если они включены, а также для
            восстановления пароля в случае его утери.
          </template>
        </SWRow>

        <SWRow>
          <template #input>
            <MyButton style="max-width: 150px" @click.prevent.stop="form.submit" :load="form.isSending">Сохранить
            </MyButton>
          </template>
        </SWRow>

      </form>

    </div>
  </div>

</template>

<script>
import MyInput from "@/components/UI/MyInput";
import {useStore} from "vuex";
import useForm from "@/composables/useForm";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import SWRow from "@/components/SWRow";
import MyImageInput from "@/components/UI/MyImageInput";
import {ref} from "vue";

export default {
  components: {MyImageInput, SWRow, MyButton, MyInput},
  setup() {
    const editUserDataRequest = async () => {
      const response = await requestMaker.fetch('edit/user/data', 'POST', {
        image: form.image,
        name: form.name,
        email: form.email,
        isImageDeleted: isImageDeleted.value
      }, [200, 422, 401])

      const responseData = await response.json()

      switch (response.status) {
        case 200:
          store.commit('auth/setUser', responseData)
          elemAvatarImg.value.src += '1'
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

    const elemAvatarImg = ref(undefined)

    const form = useForm({
      image: store.state.auth.user.image,
      name: store.state.auth.user.name,
      email: store.state.auth.user.email
    }, editUserDataRequest)
    const isImageDeleted = ref(false)

    return {
      isImageDeleted,
      form,
      elemAvatarImg
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.sw-profile {
  padding: 20px;

  &__avatar {
    height: 50px;
    width: 50px;
    border-radius: 50%;
  }

  &__avatar2 {
    display: flex;
    align-items: center;
  }

  &__avatar-image {
    width: 140px;
    height: 140px;
    border-radius: 7px;
    flex-shrink: 0;
    overflow: hidden;
  }

  &__avatar-desc {
    padding-left: 10px;
  }

  &__username {
    font-size: 28px;
    font-weight: 300;
  }

  &__change-avatar {
    color: $color-main;
  }
}

.sw-row {
  margin-top: 40px;
}
</style>
