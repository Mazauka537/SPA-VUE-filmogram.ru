<template>
  <SinglePage v-if="user">
    <div class="view-profile">
      <div class="view-profile__header">
        <div class="view-profile__avatar">
          <img :src="user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + user.avatar : '/user.jpg'"
               alt="avatar">
        </div>
        <div class="view-profile__user-info">
          <div class="view-profile__user-name">{{ user.login }}</div>
          <div class="view-profile__main-info">
            <router-link :to="'/user/' + user.id">{{ user.collections_count }} открытых коллекций</router-link>&nbsp;&bull;
            <router-link :to="'/user/' + user.id + '/subscribers'">{{ user.subscribers }} подписчиков</router-link>&nbsp;&bull;
            <router-link :to="'/user/' + user.id + '/subscriptions'">{{ user.subscriptions }} подписок</router-link>
          </div>
        </div>
      </div>

      <div class="view-profile__body">
        <div class="view-profile__nav">
          <router-link class="view-profile__nav-item"
                       :to="'/user/' + user.id"
                       :class="{'view-profile__nav-item_active': $route.name === 'profile'}">
            Коллекции
          </router-link>
          <router-link class="view-profile__nav-item"
                       :to="'/user/' + user.id + '/saves'"
                       style="margin-left: 60px"
                       :class="{'view-profile__nav-item_active': $route.name === 'saves'}">
            Сохранёнки
          </router-link>
        </div>

        <router-view/>
      </div>
    </div>

    <PopUp :pop-up-controller="popUpNewCollection">
      <FormNewCollection/>
    </PopUp>

    <PopUp :pop-up-controller="popUpChangeAvatar">
      <FormChangeAvatar @avatarChanged="response => {changeAvatar(response); popUpChangeAvatar.hide()}"/>
    </PopUp>

  </SinglePage>
</template>

<script>
import InfoBlockUser from "@/components/InfoBlockUser";
import PopUp from "@/components/PopUp";
import FormNewCollection from "@/components/forms/FormNewCollection";
import FormChangeAvatar from "@/components/forms/FormChangeAvatar";
import DialogConfirm from "@/components/DialogConfirm";
import usePopUp from "@/composables/usePopUp";
import {useRoute} from "vue-router";
import {defineAsyncComponent, onMounted, watch} from "vue";
import useEditUser from "@/composables/useEditUser";
import useGetUser from "@/composables/useGetUser";
import SinglePage from "@/components/views/SinglePage";

export default {
  components: {
    SinglePage,
    ProfileBodySubscribers: defineAsyncComponent(() => import('@/components/ProfileBodySubscribers')),
    ProfileBodyCollections: defineAsyncComponent(() => import('@/components/ProfileBodyCollections')),
    FormChangeAvatar,
    FormNewCollection,
    DialogConfirm,
    PopUp,
    InfoBlockUser,
  },
  setup() {
    const route = useRoute()
    const popUpNewCollection = usePopUp()
    const popUpChangeAvatar = usePopUp()
    const {user, isUserLoading, getUser} = useGetUser()
    const {changeUserName, changeAvatar} = useEditUser(user)

    watch(() => route.params.id, () => {
      getUser()
    })

    onMounted(() => {
      getUser()
    })

    return {
      user,
      isUserLoading,
      popUpNewCollection,
      popUpChangeAvatar,
      changeUserName,
      changeAvatar
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

  &__body {
    background: $color-bg-body;
    height: 100%;
    padding: 0 30px 30px 30px;
  }

  &__avatar {
    height: 230px;
    width: 230px;

    img {
      border-radius: 50%;
      height: 100%;
      width: 100%;
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

  &__nav {
    display: flex;
  }

  &__nav-item {
    font-size: 22px;
    font-weight: 700;
    padding: 20px 0;

    &_active {
      color: $color-text-light;
    }
  }
}
</style>
