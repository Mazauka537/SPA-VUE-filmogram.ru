<template>

  <div class="app">

    <div class="app__header">
      <MainHeader/>
    </div>

    <div class="app__body">

      <div class="app__nav" ref="elemNav">
        <MainNav/>
      </div>

      <div class="app__pages">
        <router-view/>
      </div>

    </div>

  </div>

</template>

<script>
import SimpleScrollbar from 'simple-scrollbar'
import {onMounted, ref} from "vue";
import MainNav from "@/components/MainNav";
import MainHeader from "@/components/MainHeader";
import ViewAuth from "@/components/views/ViewAuth";

export default {
  components: {ViewAuth, MainHeader, MainNav},
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
  flex-direction: column;
  height: 100%;

  &__header {
    height: 60px;
    flex-shrink: 0;
    background: $color-bg-side;
  }

  &__body {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    height: 100%;
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
