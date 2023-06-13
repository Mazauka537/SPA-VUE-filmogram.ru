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
          <div class="view-settings__notifications-warning"
               v-if="'Notification' in window && Notification.permission !== 'granted'">
            В данный момент уведомления блокируются браузером. Если вы хотите получать уведомления на своё устройство,
            <span class="view-settings__accept-notifications" @click="notificationsAccessRequest">разрешие показ уведомлений</span>
          </div>
          <SettingsLine :with-checkbox="true"
                        :is-checked="$store.state.auth.user.is_notification_subscribe_enabled"
                        :disabled="Notification.permission !== 'granted'"
                        @click="toggleSubscribeNotifications">
            Уведомления о новых подписчиках
          </SettingsLine>
          <SettingsLine :with-checkbox="true"
                        :is-checked="$store.state.auth.user.is_notification_like_enabled"
                        :disabled="Notification.permission !== 'granted'"
                        @click="toggleLikeNotifications">
            Уведомления о лайках коллекций
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
import useRequestMaker from "@/composables/useRequestMaker";
import useFirebaseSubscribe from "@/composables/useFirebaseSubscribe";

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
    const requestMaker = useRequestMaker()
    const {subscribe} = useFirebaseSubscribe()

    const toggleSubscribeNotifications = () => {
      store.commit('auth/toggleSubscribeNotifications')

      requestMaker.fetch('toggle/subscribe/notifications', 'POST', {}, [200, 201])
    }

    const toggleLikeNotifications = () => {
      store.commit('auth/toggleLikeNotifications')

      requestMaker.fetch('toggle/like/notifications', 'POST', {}, [200, 201])
    }

    const notificationsAccessRequest = () => {
      if ('Notification' in window) {
        if (Notification.permission === 'granted') {
          subscribe()
        } else {
          Notification.requestPermission().then(permission => {
            if (Notification.permission === 'granted') {
              subscribe()
            }
          })
        }
      }
    }

    const {user, isUserLoading, getUser} = useGetUser()

    const onUserDataChanged = async () => {
      await getUser(store.state.auth.user.id)
      store.commit('auth/setUser', user.value)
      router.back()
    }

    return {
      onUserDataChanged,
      toggleSubscribeNotifications,
      toggleLikeNotifications,
      notificationsAccessRequest,
      window,
      Notification
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

  &__notifications-warning {
    font-size: 11px;
    color: $color-text-dark;
    padding: 0 0 5px;
  }

  &__accept-notifications {
    color: $color-text;
    text-decoration: underline;
    cursor: pointer;
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
