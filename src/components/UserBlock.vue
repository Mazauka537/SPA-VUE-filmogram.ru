<template>
  <div class="user-block">

    <div class="user-block__image">
      <img :src="'http://127.0.0.1:8000/storage/images/avatars/' + user.avatar" alt="avatar" v-if="user.avatar">
      <img src="/user.jpg" alt="avatar" v-else>
    </div>

    <div class="user-block__names">
      <div class="user-block__login">
        @{{ user.login }}
      </div>
      <div class="user-block__name">
        {{ user.name }}
      </div>
    </div>

    <div class="user-block__sub" v-if="!$store.getters['auth/isOwner'](user.id)">
      <MyButtonMini @click.stop.prevent="toggleSubscription(user)" style="width: 110px" :white="user.isSubscribed">
        <template v-if="user.isSubscribed">
          Отписаться
        </template>
        <template v-else>
          Подписаться
        </template>
      </MyButtonMini>
    </div>

  </div>
</template>

<script>
import MyButtonMini from "@/components/UI/MyButtonMini";
import useToggleSubscription from "@/composables/useToggleSubscription";

export default {
  components: {MyButtonMini},
  props: {
    user: Object
  },
  setup() {
    const {toggleSubscription} = useToggleSubscription()

    return {
      toggleSubscription
    }
  }
}
</script>

<style scoped lang="scss">

.user-block {
  display: flex;
  align-items: center;

  &__image {

    img {
      height: 70px;
      width: 70px;
      border-radius: 50%;
    }
  }
  &__names {
    flex-grow: 1;
    min-width: 0;
    padding: 0 20px;
  }
  &__sub {

  }
}

</style>
