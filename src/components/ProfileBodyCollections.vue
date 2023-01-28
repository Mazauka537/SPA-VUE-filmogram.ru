<template>
  <div class="profile-header panel">
    <router-link class="profile-header__left-btn"
                 :class="{'color-main': isLeftVisible}"
                 :to="'/user/' + user.id">
      Коллекции
    </router-link><!--
 -->
    <router-link class="profile-header__right-btn"
                 :class="{'color-main': !isLeftVisible, 'profile-header__right-btn_private': !user.is_saves_public && !$store.getters['auth/isOwner'](user.id)}"
                 :to="'/user/' + user.id + '/saves'">
      Сохраненки
    </router-link>
  </div>

  <div class="profile-body panel">
    <LoadableItemsContainer :loader="collectionsLoader" v-if="isLeftVisible">
      <router-link class="profile-body__item-block"
                   v-for="collection in collectionsLoader.items"
                   :key="collection.id"
                   :to="'/collection/' + collection.id">
        <CollectionBlock :collection="collection"
                         @toggleSaves="collectionId => toggleSave(collectionsLoader.items, collectionId)"/>
      </router-link>
    </LoadableItemsContainer>

    <LoadableItemsContainer :loader="savesLoader" v-else>
      <router-link class="profile-body__item-block"
                   v-for="collection in savesLoader.items"
                   :key="collection.id"
                   :to="'/collection/' + collection.id">
        <CollectionBlock :collection="collection"
                         @toggleSaves="collectionId => toggleSave(savesLoader.items, collectionId)"/>
      </router-link>
    </LoadableItemsContainer>
  </div>
</template>

<script>
import LoadableItemsContainer from "@/components/LoadableItemsContainer";
import CollectionBlock from "@/components/CollectionBlock";
import useCollectionsLoader from "@/composables/useCollectionsLoader";
import useSavesLoader from "@/composables/useSavesLoader";
import useToggleSave from "@/composables/useToggleSave";
import {watch} from "vue";
import {useRoute} from "vue-router/dist/vue-router";

export default {
  components: {LoadableItemsContainer, CollectionBlock},
  props: {
    isLeftVisible: Boolean,
    user: Object
  },
  setup(props) {
    const route = useRoute()
    const {collectionsLoader} = useCollectionsLoader()
    const {savesLoader} = useSavesLoader()
    const {toggleSave} = useToggleSave()

    watch(() => props.isLeftVisible, () => {
      collectionsLoader.reset()
      savesLoader.reset()
    })

    watch(() => route.params.id, () => {
      collectionsLoader.reset()
      savesLoader.reset()
    })

    return {
      collectionsLoader,
      savesLoader,
      toggleSave
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/profileBody";

.profile-header__right-btn_private {
  cursor: default;
  pointer-events: none;

  &:before {
    font-family: icomoon !important;
    font-size: 17px;
    vertical-align: top;
    content: "\e906";
  }
}
</style>
