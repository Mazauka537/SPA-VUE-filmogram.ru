<template>
  <ScrollableBlock v-if="user">
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
            <router-link :to="'/user/' + user.id" id="collections-count">{{ user.public_collections }} открытых
              коллекций
            </router-link>
            <span id="collections-count-space">&nbsp;&bull;&nbsp;</span>
            <router-link :to="'/user/' + user.id + '/subscribers'">{{ user.subscribers }} подписчиков</router-link>&nbsp;&bull;
            <router-link :to="'/user/' + user.id + '/subscriptions'">{{ user.subscriptions }} подписок</router-link>
          </div>
        </div>
      </div>

      <div class="view-profile__body">
        <div class="view-profile__ctrl-panel">
          <span v-if="!$store.getters['auth/isOwner'](user.id)" class="view-profile__btn">
          <MyButton @click="toggleSubscription(user)">
            {{ user.isSubscribed ? 'Отписаться' : 'Подписаться' }}
          </MyButton>
          </span>
          <span v-else class="view-profile__btn">
          <MyButton @click="$router.push('/user/' + $route.params.id + '/new/collection')">
            Создать коллецию
          </MyButton>
          </span>
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
  </ScrollableBlock>

  <router-view/>

  <!--  <PopUp :pop-up-controller="popUpNewCollection" title="Создание новой коллекции">-->
  <!--    <FormNewCollection style="margin-top: 30px;"/>-->
  <!--  </PopUp>-->

  <!--  <PopUp :pop-up-controller="popUpEditUserData" title="Данные профиля">-->
  <!--    <FormEditUserData style="margin-top: 30px;" :user="user" @changed="onUserDataChanged"/>-->
  <!--  </PopUp>-->

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
import MyButton from "@/components/UI/MyButton";
import useToggleSubscription from "@/composables/useToggleSubscription";
import MoreBtn from "@/components/UI/MoreBtn";
import ShareBtn from "@/components/UI/ShareBtn";
import FormEditUserData from "@/components/forms/FormEditUserData";
import ProfileBody from "@/components/ProfileBody";
import ScrollableBlock from "@/components/ScrollableBlock";

export default {
  components: {
    ScrollableBlock,
    ProfileBody,
    FormEditUserData,
    ShareBtn,
    MoreBtn,
    MyButton,
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
    flex-shrink: 0;

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

  &__btn {
    margin-right: 25px;
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

@media screen and (max-width: 1260px) {
  .view-profile {

    &__avatar {
      height: 180px;
      width: 180px;
    }
  }
}

@media screen and (max-width: 560px) {
  .view-profile {
    background: $color-bg-header-media;

    &__header {
      padding: 15px 15px 0 15px;
      align-items: center;
    }

    &__avatar {
      height: 100px;
      width: 100px;
    }

    &__user-info {
      padding-left: 15px;
    }

    &__user-name {
      font-size: 26px;
      color: $color-text-light;
      font-weight: 700;
      padding: 0 0 5px 0;
    }

    &__body {
      background: none;
      padding: 15px;
    }

    &__btn {
      margin-right: 15px;
    }

    &__more-btn, &__share-btn {
      height: 36px;
      width: 36px;
    }

    &__share-btn {
      margin-right: 10px;
    }
  }

  #collections-count {
    display: none;
  }
  #collections-count-space {
    display: none;
  }
}
</style>
