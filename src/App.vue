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
import MainNav from "@/components/MainNav";
import ViewAuth from "@/components/views/ViewAuth";
import NotificationBlock from "@/components/NotificationBlock";
import NotificationContainer from "@/components/NotificationContainer";

export default {
  components: {NotificationContainer, NotificationBlock, ViewAuth, MainNav},
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
    right: 20px;
    bottom: 20px;
    z-index: 6;
    width: 350px;
  }

  &__nav {
    width: 240px;
    min-width: 240px;
    background: $color-bg-nav;
  }

  &__pages {
    flex-grow: 1;
    min-width: 0;
    background: $color-bg-main;
  }
}

@media screen and (max-width: 1460px) {
  .app {

    &__nav {
      width: 200px;
      min-width: 200px;
    }
  }
}

@media screen and (max-width: 770px) {
  .app {

    &__nav {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 50px;
      z-index: 4;
      background: $color-bg-nav-media;
    }

    &__pages {
      padding-bottom: 50px;
    }
  }
}
</style>
