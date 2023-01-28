<template>

  <div class="app">

    <div class="app__nav" ref="elemNav">
      <MainNav/>
    </div>

    <div class="app__pages">
      <router-view/>
    </div>

  </div>

  <div class="app__notifications">
    <NotificationContainer/>
  </div>

</template>

<script>
import SimpleScrollbar from 'simple-scrollbar'
import {onMounted, ref} from "vue";
import MainNav from "@/components/MainNav";
import MainHeader from "@/components/MainHeader";
import ViewAuth from "@/components/views/ViewAuth";
import NotificationBlock from "@/components/NotificationBlock";
import NotificationContainer from "@/components/NotificationContainer";
import {useStore} from "vuex";

export default {
  components: {NotificationContainer, NotificationBlock, ViewAuth, MainHeader, MainNav},
  props: [],
  setup() {
    const elemNav = ref()

    onMounted(() => {
      SimpleScrollbar.initEl(elemNav.value)
    })

    return {
      elemNav,
    }
  }
}

</script>

<style lang="scss">
@import "assets/styles/base";
@import "assets/styles/vars";
@import "../node_modules/simple-scrollbar/simple-scrollbar.css";
@import "assets/icons/style.css";

.app {
  font-size: 14px;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  height: 100%;

  &__notifications {
    position: fixed;
    right: 0;
    bottom: 0;
    z-index: 2;
    padding: 20px;
    width: 350px;
  }

  &__nav {
    width: 240px;
    background: $color-bg-nav;
  }

  &__pages {
    flex-grow: 1;
    min-width: 0;
    background: $color-bg-main;
  }
}
</style>
