<template>
  <div class="view-settings">

    <div class="view-settings__left-wrapper">
      <div class="view-settings__left">

        <router-link class="view-settings__option"
             v-if="$store.state.auth.user"
             :class="{'view-settings__option_selected': selectedOption === 'profile'}"
             to="/settings/profile">
          Настройки профиля
        </router-link>
        <router-link class="view-settings__option"
                     :class="{'view-settings__option_selected': selectedOption === 'notices'}"
                     to="/settings/notices">
          Уведомления
        </router-link>
        <router-link class="view-settings__option"
                     :class="{'view-settings__option_selected': selectedOption === 'password'}"
                     to="/settings/password">
          Смена пароля
        </router-link>

      </div>
    </div>

    <div class="view-settings__right-wrapper">
      <div class="view-settings__right">

        <router-view></router-view>

      </div>
    </div>

  </div>
</template>

<script>
import {computed, ref} from "vue";
import {useRoute} from "vue-router";

export default {
  setup() {
    const route = useRoute()
    const selectedOption = computed(() => {
      const separatedPath = route.path.split('/')
      return separatedPath[separatedPath.length - 1]
    })

    return {
      selectedOption
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.view-settings {
  min-height: 100%;
  max-width: 1000px;
  margin: 50px auto;
  border: 1px solid $color-bg-input;
  border-radius: 3px;
  display: flex;

  &__left-wrapper {
    max-width: 240px;
    width: 100%;
    border-right: 1px solid $color-bg-input;
  }

  &__right-wrapper {
    flex-grow: 1;
  }

  &__left {

  }

  &__right {
    padding: 20px 20px 60px 20px;
  }

  &__option {
    padding: 20px;
    cursor: pointer;
    display: block;

    &_selected {
      font-weight: 700;
      border-left: 2px solid $color-main;
      color: $color-text-light;
    }
  }
}

</style>
