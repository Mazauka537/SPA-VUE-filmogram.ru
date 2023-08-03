<template>
  <BlocksLine v-if="collections.length > 0"
              style="margin-top: 30px;"
              :title="$store.getters['auth/isOwner'](user.id) ? 'Мои коллекции' : 'Открытые коллекции'"
              :link="'/user/' + user.id + '/collections'"
              :items="collections"
              :is-users="false">
  </BlocksLine>

  <BlocksLine v-if="savedCollections.length > 0"
              style="margin-top: 30px;"
              title="Сохраненные коллекции"
              :link="'/user/' + user.id + '/saves'"
              :items="savedCollections"
              :is-users="false">
  </BlocksLine>

  <div id="media-del">
    <BlocksLine v-if="subscriptions.length > 0"
                style="margin-top: 30px;"
                title="Подписки"
                :link="'/user/' + user.id + '/subscriptions'"
                :items="subscriptions">
    </BlocksLine>

    <BlocksLine v-if="subscribers.length > 0"
                style="margin-top: 30px;"
                title="Подписчики"
                :link="'/user/' + user.id + '/subscribes'"
                :items="subscribers">
    </BlocksLine>
  </div>

  <div class="profile-body__load" v-if="isCollectionsLoading || isSavedCollectionsLoading || isSubscribersLoading || isSubscriptionsLoading">
    <LoadingPanel :size="50"/>
  </div>
</template>

<script>
import BlocksLine from "@/components/BlocksLine";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import useGetFirstCollections from "@/composables/useGetFirstCollections";
import useGetFirstSaves from "@/composables/useGetFirstSaves";
import useGetFirstSubscribers from "@/composables/useGetFirstSubscribers";
import useGetFirstSubscriptions from "@/composables/useGetFirstSubscriptions";
import {computed, onMounted, watch} from "vue";
import LoadingPanel from "@/components/LoadingPanel";

export default {
  components: {
    LoadingPanel,
    UserBlock,
    CollectionBlock,
    BlocksLine,
  },
  props: {
    user: Object
  },
  setup({user}) {
    const {collections, isCollectionsLoading, getCollections} = useGetFirstCollections()
    const {savedCollections, isSavedCollectionsLoading, getSavedCollections} = useGetFirstSaves()
    const {subscribers, isSubscribersLoading, getSubscribers} = useGetFirstSubscribers()
    const {subscriptions, isSubscriptionsLoading, getSubscriptions} = useGetFirstSubscriptions()

    watch(() => user, () => {
      collections.value = []
      savedCollections.value = []
      subscribers.value = []
      subscriptions.value = []
      getCollections(user.id)
      getSavedCollections(user.id)
      getSubscribers(user.id)
      getSubscriptions(user.id)
    })

    onMounted(() => {
      collections.value = []
      savedCollections.value = []
      subscribers.value = []
      subscriptions.value = []
      getCollections(user.id)
      getSavedCollections(user.id)
      getSubscribers(user.id)
      getSubscriptions(user.id)
    })

    return {
      collections,
      savedCollections,
      subscribers,
      subscriptions,
      isCollectionsLoading,
      isSavedCollectionsLoading,
      isSubscribersLoading,
      isSubscriptionsLoading
    }
  }
}
</script>

<style scoped lang="scss">

.profile-body__load {
  position: relative;
  height: 100px;
}

@media screen and (max-width: 560px) {
  #media-del {
    display: none;
  }
}
</style>
