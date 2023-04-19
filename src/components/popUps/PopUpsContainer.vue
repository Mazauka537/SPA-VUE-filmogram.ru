<template>
  <Suspense>
    <slot></slot>
    <template #fallback>
      <LoadingPanel/>
    </template>
  </Suspense>
</template>

<script>
import LoadingPanel from "@/components/LoadingPanel";

export default {
  components: {LoadingPanel}
}
</script>

<style scoped>

</style>
