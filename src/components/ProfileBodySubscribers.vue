<template>
  <div class="profile-header panel">
    <router-link class="profile-header__left-btn"
                 :class="{'color-main': isLeftVisible}"
                 :to="'/user/' + user.id + '/subscribers'">
      Подписчики
    </router-link><!--
 --><router-link class="profile-header__right-btn"
                 :class="{'color-main': !isLeftVisible}"
                 :to="'/user/' + user.id + '/subscriptions'">
      Подписки
    </router-link>
  </div>

  <div class="profile-body panel">
    <LoadableItemsContainer :loader="subscribersLoader" v-if="isLeftVisible">
      <router-link class="profile-body__item-block"
                   v-for="user in subscribersLoader.items"
                   :key="user.id"
                   :to="'/user/' + user.id">
        <UserBlock :user="user"/>
      </router-link>
    </LoadableItemsContainer>

    <LoadableItemsContainer :loader="subscriptionsLoader" v-else>
      <router-link class="profile-body__item-block"
                   v-for="user in subscriptionsLoader.items"
                   :key="user.id"
                   :to="'/user/' + user.id">
        <UserBlock :user="user"/>
      </router-link>
    </LoadableItemsContainer>
  </div>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import UserBlock from "@/components/UserBlock";
import useSubscribersLoader from "@/composables/useSubscribersLoader";
import useSubscriptionsLoader from "@/composables/useSubscriptionsLoader";
import {watch} from "vue";
import {useRoute} from "vue-router/dist/vue-router";

export default {
  components: {UserBlock, LoadableItemsContainer},
  props: {
    isLeftVisible: Boolean,
    user: Object
  },
  setup(props) {
    const route = useRoute()
    const {subscribersLoader} = useSubscribersLoader()
    const {subscriptionsLoader} = useSubscriptionsLoader()

    watch(() => props.isLeftVisible, () => {
      subscribersLoader.reset()
      subscriptionsLoader.reset()
    })

    watch(() => route.params.id, () => {
      subscribersLoader.reset()
      subscriptionsLoader.reset()
    })

    return {
      subscribersLoader,
      subscriptionsLoader,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/profileBody";
</style>
