<template>
  <Suspense>
    <transition name="fade-slide">
      <slot></slot>
    </transition>
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
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.15s;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
}

@media screen and (max-width: 560px) {
  .fade-slide-enter-active,
  .fade-slide-leave-active {
    transition: margin-top 0.3s ease, opacity 0.15s;
  }

  .fade-slide-enter-from,
  .fade-slide-leave-to {
    margin-top: 300px;
    opacity: 0;
  }
}

</style>
