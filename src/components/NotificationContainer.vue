<template>
  <div class="notification-container" v-if="$store.state.notifications.notifications.length > 0"
       @mouseenter="$store.commit('notifications/stopFading')"
       @mouseleave="$store.commit('notifications/startFading')">
    <button class="notification-block__close-all"
            :class="{'notification-block__close-all_visible': $store.getters['notifications/isMoreThenTwoClosable']}"
            ref="elemCloseAllBtn"
            @click="$store.commit('notifications/removeAll')">
      Закрыть все
    </button>
    <NotificationBlock v-for="notification in $store.state.notifications.notifications"
                       :key="notification.id"
                       :notification="notification"
                       @close="$store.commit('notifications/removeNotification', notification.id)"/>
  </div>
</template>

<script>
import NotificationBlock from "@/components/NotificationBlock";

export default {
  components: {NotificationBlock},
  setup() {

  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.notification-block {

  &__close-all {
    opacity: 0;
    transition: opacity 0.2s;
    background: $color-bg-nav;
    padding: 10px;
    color: $color-text;
    width: 100%;
    pointer-events: none;

    &_visible {
      pointer-events: all;
      opacity: 1;
    }
  }
}

@media screen and (max-width: 560px) {
  .notification-block {

    &__close-all {
      display: none;
    }
  }
}
</style>
