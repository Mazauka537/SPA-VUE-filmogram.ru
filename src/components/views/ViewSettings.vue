<template>
  <ScrollableBlock>
    <div class="view-settings">

      <HeadBar title="Настройки"/>

      <h2 class="view-settings__title">Настройки</h2>

      <p class="view-settings__auth" v-if="!$store.state.auth.user">
        Для доступа к найстройкам аккаунта необходимо
        <router-link to="/auth">авторизоваться</router-link>
      </p>

      <template v-else>

        <SettingsSection title="Аккаунт">
          <SettingsLine @click="$router.push({query: {popUp: 'editUser'}})">
            Данные профиля
          </SettingsLine>
          <SettingsLine @click="$router.push({query: {popUp: 'editEmail'}})">
            Смена Email
          </SettingsLine>
          <SettingsLine @click="$router.push({query: {popUp: 'newPassword'}})">
            Новый пароль
          </SettingsLine>
          <SettingsLine @click="$router.push({query: {popUp: 'logout'}})">
            Выйти с аккаунта
          </SettingsLine>
        </SettingsSection>

        <SettingsSection title="Уведомления">
          <SettingsLine :with-checkbox="true" :is-checked="settings.notices" @click="toggleNoticesSettings">
            Уведомления
          </SettingsLine>
        </SettingsSection>

      </template>

      <SettingsSection title="Дополнительно">
        <SettingsLine @click="$router.push({query: {popUp: 'about'}})">
          О проекте
        </SettingsLine>
        <SettingsLine @click="$router.push({query: {popUp: 'contacts'}})">
          Контакты разработчика
        </SettingsLine>
        <SettingsLine @click="$router.push({query: {popUp: 'support'}})">
          Служба поддержки
        </SettingsLine>
      </SettingsSection>

    </div>
  </ScrollableBlock>

  <PopUpsContainer>
    <PopUpEditUserData v-if="$route.query.popUp === 'editUser'" @userDataChanged="onUserDataChanged"/>
    <PopUpEditEmail v-else-if="$route.query.popUp === 'editEmail'" @emailChanged="onUserDataChanged"/>
    <PopUpNewPassword v-else-if="$route.query.popUp === 'newPassword'"/>
    <PopUpLogout v-else-if="$route.query.popUp === 'logout'"/>
    <PopUpSupport v-else-if="$route.query.popUp === 'support'"/>
    <PopUpAbout v-else-if="$route.query.popUp === 'about'"/>
    <PopUpContacts v-else-if="$route.query.popUp === 'contacts'"/>


  </PopUpsContainer>

</template>

<script>
import {defineAsyncComponent, reactive, ref} from "vue";
import ScrollableBlock from "@/components/ScrollableBlock";
import SettingsSection from "@/components/SettingsSection";
import SettingsLine from "@/components/SettingsLine";
import PopUpsContainer from "@/components/popUps/PopUpsContainer";
import useGetUser from "@/composables/useGetUser";
import {useStore} from "vuex";
import {useRouter} from "vue-router/dist/vue-router";
import HeadBar from "@/components/HeadBar";

export default {
  components: {
    HeadBar,
    PopUpEditUserData: defineAsyncComponent(() => import('@/components/popUps/PopUpEditUserData')),
    PopUpEditEmail: defineAsyncComponent(() => import('@/components/popUps/PopUpEditEmail')),
    PopUpNewPassword: defineAsyncComponent(() => import('@/components/popUps/PopUpNewPassword')),
    PopUpLogout: defineAsyncComponent(() => import('@/components/popUps/PopUpLogout')),
    PopUpSupport: defineAsyncComponent(() => import('@/components/popUps/PopUpSupport')),
    PopUpAbout: defineAsyncComponent(() => import('@/components/popUps/PopUpAbout')),
    PopUpContacts: defineAsyncComponent(() => import('@/components/popUps/PopUpContacts')),
    PopUpsContainer, SettingsLine, SettingsSection, ScrollableBlock
  },

  setup() {
    const store = useStore()
    const router = useRouter()

    const settings = reactive({})
    settings.notices = true

    const {user, isUserLoading, getUser} = useGetUser()


    const toggleNoticesSettings = () => {
      settings.notices = !settings.notices
    }

    const onUserDataChanged = async () => {
      await getUser(store.state.auth.user.id)
      store.commit('auth/setUser', user.value)
      router.back()
    }

    return {
      settings,
      toggleNoticesSettings,
      onUserDataChanged
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.view-settings {
  padding: 30px 48px 60px 30px;
  max-width: 900px;
  margin: 0 auto;

  &__title {
    color: $color-text-light;
    padding-bottom: 20px;
  }

  &__auth {
    padding-bottom: 30px;

    a {
      color: $color-text-light;
      text-decoration: underline;
    }
  }
}

@media screen and (max-width: 1030px) {
  .view-settings {
    padding: 15px 33px 60px 15px;
  }
}

@media screen and (max-width: 560px) {
  .view-settings {
    padding-top: 50px;

    &__title {
      display: none;
    }

    &__auth {
      padding: 30px 0 20px;
    }
  }
}

</style>
