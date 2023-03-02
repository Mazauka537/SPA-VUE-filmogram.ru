<template>
  <div class="info-block-user">
    <span class="info-block-user__avatar" @click="$router.push('/user/' + user.id)">
      <img :src="'http://127.0.0.1:8000/storage/images/avatars/' + user.avatar" alt="avatar" v-if="user.avatar">
      <img src="/user.jpg" alt="avatar" v-else>

      <span v-if="$store.state.auth.user && $store.state.auth.user.id === +$route.params.id"
            class="info-block-user__avatar-change"
            @click="$emit('changeAvatar')">
        сменить фото
      </span>
    </span>

    <div class="info-block-user__login">
      @{{ user.name }}
    </div>

    <div class="info-block-user__name">
      <span class="info-block-user__name-inner" :class="{'info-block-user__name-inner_hidden': isNameEditing}">
        <span class="info-block-user__name-name" @click="$router.push('/user/' + user.id)">{{ user.name }}</span>
        <span v-if="$store.state.auth.user && $store.state.auth.user.id === +$route.params.id"
              class="info-block-user__name-edit-btn icon-pen"
              @click="showEditName"></span>
      </span>
      <input class="info-block-user__name-input"
             hidden
             ref="nameInput"
             type="text"
             :value="user.name"
             @blur="(e) => {hideEditName(); $emit('changeUserName', e.target.value)}"
             @keydown="inputKeyDown">
    </div>

    <div class="info-block-user__subs">
      <router-link :to="'/user/' + user.id + '/subscribers'" class="info-block-user__followers link">{{ user.subscribers }}
        Подписчики
      </router-link>
      <span>&middot;</span>
      <router-link :to="'/user/' + user.id + '/subscriptions'" class="info-block-user__following link">{{ user.subscriptions }}
        Подписки
      </router-link>
    </div>

    <div class="info-block-user__btns" v-if="$store.getters['auth/isOwner'](user.id)">
      <MyButton style="width: 100%;" @click="$emit('newCollection')">Создать коллекцию</MyButton>
      <br>
      <MyButton style="width: 100%; margin-top: 5px" @click="$router.push('/logout')">Выйти с аккаунта
      </MyButton>
    </div>
    <div class="info-block-user__btns" v-else>
      <MyButton @click="toggleSubscription(user)" :white="user.isSubscribed">
        <template v-if="user.isSubscribed">
          Отписаться
        </template>
        <template v-else>
          Подписаться
        </template>
      </MyButton>
    </div>

    <LoadingPanel v-if="load"/>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
import useEditNameInput from "@/composables/useEditNameInput";
import useToggleSubscription from "@/composables/useToggleSubscription";
import LoadingPanel from "@/components/LoadingPanel";

export default {
  components: {LoadingPanel, MyButton},
  props: {
    user: Object,
    load: Boolean
  },
  setup(props, {emit}) {

    const {toggleSubscription} = useToggleSubscription()

    const {
      isNameEditing,
      nameInput,
      showEditName,
      hideEditName,
      inputKeyDown
    } = useEditNameInput()

    return {
      isNameEditing,
      nameInput,
      showEditName,
      hideEditName,
      inputKeyDown,
      toggleSubscription
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.info-block-user {
  text-align: center;
  position: relative;

  &__avatar {
    position: relative;
    overflow: hidden;
    height: 100px;
    width: 100px;
    border-radius: 50%;
    display: inline-block;

    &:hover {
      .info-block-user__avatar-change {
        opacity: 1;
      }
    }

    img {
      object-fit: cover;
      height: 100%;
      width: 100%;
    }
  }

  &__avatar-change {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba($color-placeholder, 0.4);
  }

  &__name {
    margin-top: 3px;
    font-size: 13px;
  }

  &__name-inner {

    &_hidden {
      display: none;
    }
  }

  &__name-name {

  }

  &__name-edit-btn {
    color: $color-placeholder;
    margin-left: 3px;
    cursor: pointer;
  }

  &__name-input {
    font-size: 13px;
    text-align: center;
    border: none;
    background: transparent;
  }

  &__login {
    margin-top: 15px;
    font-size: 14px;
  }

  &__subs {
    margin-top: 20px;
    font-size: 12px;
    display: flex;
    justify-content: space-evenly;
  }

  &__btns {
    margin-top: 20px;
  }
}

</style>
