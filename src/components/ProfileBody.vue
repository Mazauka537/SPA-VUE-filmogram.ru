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
</template>

<script>
import BlocksLine from "@/components/BlocksLine";
import CollectionBlock from "@/components/CollectionBlock";
import UserBlock from "@/components/UserBlock";
import useGetFirstCollections from "@/composables/useGetFirstCollections";
import useGetFirstSaves from "@/composables/useGetFirstSaves";
import useGetFirstSubscribers from "@/composables/useGetFirstSubscribers";
import useGetFirstSubscriptions from "@/composables/useGetFirstSubscriptions";
import {onMounted, watch} from "vue";

export default {
  components: {
    UserBlock,
    CollectionBlock,
    BlocksLine,
  },
  props: {
    user: Object
  },
  setup({user}) {
    const {collections, getCollections} = useGetFirstCollections()
    const {savedCollections, getSavedCollections} = useGetFirstSaves()
    const {subscribers, getSubscribers} = useGetFirstSubscribers()
    const {subscriptions, getSubscriptions} = useGetFirstSubscriptions()

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
      subscriptions
    }
  }
}
</script>

<style scoped>

</style>
