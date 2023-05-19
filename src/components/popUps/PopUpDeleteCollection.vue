<template>
  <PopUp :title="'Удалить коллекцию &quot' + collection.title + '&quot?'">
    <DialogConfirm
        @yes="deleteCollection"
        @no="$router.back()"/>
  </PopUp>
</template>

<script>
import PopUp from "@/components/popUps/PopUp";
import DialogConfirm from "@/components/DialogConfirm";
import useRequestMaker from "@/composables/useRequestMaker";
import {useRouter} from "vue-router/dist/vue-router";
import {useStore} from "vuex";

export default {
  components: {DialogConfirm, PopUp},
  props: {
    collection: Object
  },
  setup(props) {
    const requestMaker = useRequestMaker()
    const store = useStore()
    const router = useRouter()

    const deleteCollection = () => {
      const response = requestMaker.fetch('delete/collection', 'DELETE', {
        collection_id: props.collection.id,
      }, [200, 401, 403, 422])

      store.commit('collections/removeCollection', props.collection.id)

      router.replace('/user/' + props.collection.user_id)
    }

    return {
      deleteCollection
    }
  }
}
</script>

<style scoped>

</style>
