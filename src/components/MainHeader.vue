<template>
  <header class="main-header">
    <div class="main-header__inner">

      <MainLogo/>

      <div class="main-header__search">
        <!--          <GeneralSearch/>-->
      </div>

      <div class="main-header__user">
        <UserBtn v-if="$store.state.auth.user"/>
      </div>

    </div>
  </header>
</template>

<script>
import MainLogo from "@/components/MainLogo";
import UserBtn from "@/components/UserBtn";

export default {
  components: {UserBtn, MainLogo},
  setup() {

  }
}
</script>

<style scoped lang="scss">
@import 'src/assets/styles/vars';

.main-header {
  height: 100%;
  padding: 0 20px;

  &__inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  &__search {
    max-width: 500px;
    width: 100%;
  }
}
</style>
