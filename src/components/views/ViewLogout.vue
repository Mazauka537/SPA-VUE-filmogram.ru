<template>
  <div>

  </div>
</template>

<script>
  import {useRouter} from "vue-router/dist/vue-router";
  import {useStore} from "vuex";

  export default {
    setup() {
      const router = useRouter()
      const store = useStore()

      localStorage.removeItem('token')
      store.commit('auth/setUser', undefined)
      store.dispatch('collections/loadCollections')
      router.replace('/auth')
    }
  }
</script>

<style scoped>

</style>
