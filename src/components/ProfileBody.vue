<template>
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
