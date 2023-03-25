<template>
  <SinglePage v-if="user">
    <div class="view-profile">
      <div class="view-profile__header">
        <div class="view-profile__avatar">
          <img ref="elemAvatarImg"
               :src="(user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + user.avatar : '/user.jpg') + '?=1'"
               alt="avatar">
        </div>
        <div class="view-profile__user-info">
          <div class="view-profile__user-name">{{ user.name }}</div>
          <div class="view-profile__main-info">
            <router-link :to="'/user/' + user.id">{{ user.public_collections }} открытых коллекций</router-link>&nbsp;&bull;
            <router-link :to="'/user/' + user.id + '/subscribers'">{{ user.subscribers }} подписчиков</router-link>&nbsp;&bull;
            <router-link :to="'/user/' + user.id + '/subscriptions'">{{ user.subscriptions }} подписок</router-link>
          </div>
        </div>
      </div>

      <div class="view-profile__body">
        <div class="view-profile__ctrl-panel">
          <MyButton v-if="!$store.getters['auth/isOwner'](user.id)"
                    @click="toggleSubscription(user)"
                    style="margin-right: 25px;">
            {{ user.isSubscribed ? 'Отписаться' : 'Подписаться' }}
          </MyButton>
          <MyButton v-else
                    @click="popUpNewCollection.show"
                    style="margin-right: 25px;">
            Создать коллецию
          </MyButton>
          <button class="view-profile__share-btn">
            <ShareBtn :link="window.location.origin + '/user/' + user.id"/>
          </button>
          <button class="view-profile__more-btn" v-if="$store.getters['auth/isOwner'](user.id)">
            <MoreBtn :options="moreBtnOptions"/>
          </button>
        </div>

        <ProfileBody :user="user"/>
      </div>
    </div>

    <PopUp :pop-up-controller="popUpNewCollection" title="Создание новой коллекции">
      <FormNewCollection style="margin-top: 30px;"/>
    </PopUp>

    <PopUp :pop-up-controller="popUpEditUserData" title="Данные профиля">
      <FormEditUserData style="margin-top: 30px;" :user="user" @changed="onUserDataChanged"/>
    </PopUp>

  </SinglePage>
</template>

<script>
import PopUp from "@/components/PopUp";
import FormNewCollection from "@/components/forms/FormNewCollection";
import DialogConfirm from "@/components/DialogConfirm";
import usePopUp from "@/composables/usePopUp";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import useEditUser from "@/composables/useEditUser";
import useGetUser from "@/composables/useGetUser";
import SinglePage from "@/components/views/SinglePage";
import MyButton from "@/components/UI/MyButton";
import useToggleSubscription from "@/composables/useToggleSubscription";
import MoreBtn from "@/components/UI/MoreBtn";
import ShareBtn from "@/components/UI/ShareBtn";
import FormEditUserData from "@/components/forms/FormEditUserData";
import ProfileBody from "@/components/ProfileBody";

export default {
  components: {
    ProfileBody,
    FormEditUserData,
    ShareBtn,
    MoreBtn,
    MyButton,
    SinglePage,
    FormNewCollection,
    DialogConfirm,
    PopUp,
  },
  setup() {
    const route = useRoute()
    const popUpNewCollection = usePopUp()
    const {toggleSubscription} = useToggleSubscription()
    const {user, isUserLoading, getUser} = useGetUser()
    const {popUpEditUserData, changeUserName, changeAvatar} = useEditUser(user)

    const moreBtnOptions = [{
      text: () => 'Изменить сведения',
      onClick: () => {
        popUpEditUserData.show()
      }
    }]

    const elemAvatarImg = ref(undefined)

    const onUserDataChanged = async () => {
      await getUser(route.params.id)
      elemAvatarImg.value.src += '1'
      popUpEditUserData.hide()
    }

    watch(() => route.params.id, () => {
      user.value = undefined
      getUser(route.params.id)
    })

    onMounted(() => {
      getUser(route.params.id)
    })

    return {
      elemAvatarImg,
      moreBtnOptions,
      user,
      isUserLoading,
      popUpNewCollection,
      popUpEditUserData,
      onUserDataChanged,
      changeUserName,
      changeAvatar,
      toggleSubscription,
      window
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.view-profile {
  background: $color-bg-header;
  height: 100%;

  &__header {
    display: flex;
    justify-content: left;
    align-items: end;
    padding: 30px 30px 24px 30px;
  }

  &__avatar {
    height: 230px;
    width: 230px;

    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
      object-fit: cover;
      background: $color-bg-side;
    }
  }

  &__user-info {
    padding-left: 25px;
  }

  &__user-name {
    font-size: 72px;
    color: $color-text-light;
    font-weight: 700;
    padding: 50px 0;
  }

  &__main-info {
    color: $color-text-light;

    a:hover {
      text-decoration: underline;
    }
  }

  &__body {
    background: $color-bg-body;
    height: 100%;
    padding: 30px;
  }

  &__ctrl-panel {

    * {
      vertical-align: middle;
    }
  }

  &__more-btn, &__share-btn {
    display: inline-block;
    height: 40px;
    width: 40px;
    cursor: pointer;

    svg {
      fill: $color-text-light;
    }
  }

  &__share-btn {
    margin-right: 20px;
  }
}
</style>
