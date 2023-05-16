<template>
  <ScrollableBlock>
    <div class="nav-collections">
      <LoadingPanel v-if="isLoading" :size="40"/>
      <template v-else>
        <CollectionBlockMini v-for="collection in collections" :collection="collection"/>
      </template>
    </div>
  </ScrollableBlock>
</template>

<script>
import ScrollableBlock from "@/components/ScrollableBlock";
import useRequestMaker from "@/composables/useRequestMaker";
import {onMounted, ref} from "vue";
import CollectionBlockMini from "@/components/CollectionBlockMini";
import LoadingPanel from "@/components/LoadingPanel";
import MyButton from "@/components/UI/MyButton";

export default {
  components: {MyButton, LoadingPanel, CollectionBlockMini, ScrollableBlock},
  setup() {
    const requestMaker = useRequestMaker()

    const collections = ref([])
    const isLoading = ref(false)

    const getCollectionsRequest = async () => {
      isLoading.value = true

      const response = await requestMaker.fetch('get/nav/collections')

      isLoading.value = false

      return await response.json()
    }

    onMounted(async () => {
      collections.value = await getCollectionsRequest()
    })

    return {
      collections,
      isLoading
    }
  }
}
</script>

<style scoped lang="scss">
.nav-collections {
  padding: 0 23px 0 5px;
}
</style>
