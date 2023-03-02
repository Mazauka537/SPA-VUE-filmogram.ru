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

        <BlocksLine :title="$store.getters['auth/isOwner'](user.id) ? 'Мои коллекции' : 'Открытые коллекции'"
                    style="margin-top: 30px;"
                    :link="'/user/' + user.id + '/collections'"
                    v-if="collections.length > 0">
          <template v-for="collection in collections">
            <CollectionBlock :collection="collection"
                             :class="'blocks-line__block'"/>
          </template>
        </BlocksLine>

        <BlocksLine title="Сохраненные коллекции"
                    style="margin-top: 30px;"
                    :link="'/user/' + user.id + '/saves'"
                    v-if="savedCollections.length > 0">
          <template v-for="collection in savedCollections">
            <CollectionBlock :collection="collection"
                             :class="'blocks-line__block'"/>
          </template>
        </BlocksLine>

        <BlocksLine title="Подписки"
                    style="margin-top: 30px;"
                    :link="'/user/' + user.id + '/subscriptions'"
                    v-if="subscriptions.length > 0">
          <template v-for="subscription in subscriptions">
            <UserBlock :user="subscription"
                       :class="'blocks-line__block'"/>
          </template>
        </BlocksLine>

        <BlocksLine title="Подписчики"
                    style="margin-top: 30px;"
                    :link="'/user/' + user.id + '/subscribes'"
                    v-if="subscribers.length > 0">
          <template v-for="subscriber in subscribers">
            <UserBlock :user="subscriber"
                       :class="'blocks-line__block'"/>
          </template>
        </BlocksLine>
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
import InfoBlockUser from "@/components/InfoBlockUser";
import PopUp from "@/components/PopUp";
import FormNewCollection from "@/components/forms/FormNewCollection";
import DialogConfirm from "@/components/DialogConfirm";
import usePopUp from "@/composables/usePopUp";
import {useRoute} from "vue-router";
import {onMounted, ref, watch} from "vue";
import useEditUser from "@/composables/useEditUser";
import useGetUser from "@/composables/useGetUser";
import SinglePage from "@/components/views/SinglePage";
import BlocksLine from "@/components/BlocksLine";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import useToggleSubscription from "@/composables/useToggleSubscription";
import MoreBtn from "@/components/MoreBtn";
import ShareBtn from "@/components/ShareBtn";
import FormEditUserData from "@/components/forms/FormEditUserData";

export default {
  components: {
    FormEditUserData,
    ShareBtn,
    MoreBtn,
    UserBlock,
    CollectionBlock,
    MyButton,
    BlocksLine,
    SinglePage,
    FormNewCollection,
    DialogConfirm,
    PopUp,
    InfoBlockUser,
  },
  setup() {
    const requestMaker = useRequestMaker()
    const route = useRoute()
    const popUpNewCollection = usePopUp()
    const popUpEditUserData = usePopUp()
    const {user, isUserLoading, getUser} = useGetUser()
    const {changeUserName, changeAvatar} = useEditUser(user)
    const {toggleSubscription} = useToggleSubscription()

    const moreBtnOptions = [{
      text: () => 'Изменить сведения',
      onClick: () => {
        popUpEditUserData.show()
      }
    }]

    const collections = ref([])
    const savedCollections = ref([])
    const subscribers = ref([])
    const subscriptions = ref([])
    const elemAvatarImg = ref(undefined)

    watch(() => route.params.id, () => {
      user.value = undefined
      collections.value = []
      savedCollections.value = []
      subscribers.value = []
      subscriptions.value = []
      getUser()
      getCollections()
      getSavedCollections()
      getSubscribers()
      getSubscriptions()
    })

    const onUserDataChanged = async () => {
      await getUser()
      elemAvatarImg.value.src += '1'
      popUpEditUserData.hide()
      console.log(elemAvatarImg.value)
    }

    const getCollections = async () => {
      const response = await requestMaker.fetch('get/collections', 'GET', {
        user_id: route.params.id,
        page: 1
      }, [200, 422, 404])

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          collections.value = responseData.items
          if (collections.value.length > 0)
            collections.value.unshift(collections.value.pop())
          break;
      }
    }

    const getSavedCollections = async () => {
      const response = await requestMaker.fetch('get/saves', 'GET', {
        user_id: route.params.id,
        page: 1
      }, [200, 422, 404])

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          savedCollections.value = responseData.items
          break;
      }
    }

    const getSubscribers = async () => {
      const response = await requestMaker.fetch('get/subscribers', 'GET', {
        user_id: route.params.id,
        page: 1
      }, [200, 422, 404])

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          subscribers.value = responseData.items
          break;
      }
    }

    const getSubscriptions = async () => {
      const response = await requestMaker.fetch('get/subscriptions', 'GET', {
        user_id: route.params.id,
        page: 1
      }, [200, 422, 404])

      switch (response.status) {
        case 200:
          const responseData = await response.json()
          subscriptions.value = responseData.items
          break;
      }
    }

    onMounted(() => {
      getUser()
      getCollections()
      getSavedCollections()
      getSubscribers()
      getSubscriptions()
    })

    return {
      elemAvatarImg,
      moreBtnOptions,
      collections,
      savedCollections,
      subscriptions,
      subscribers,
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
