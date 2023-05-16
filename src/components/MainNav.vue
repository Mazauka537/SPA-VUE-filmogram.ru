<template>
  <nav class="main-nav" :class="{'main-nav_guest': !$store.state.auth.user}">
    <ul>
      <li>
        <router-link class="main-nav__link" :to="profileLink">
          <svg width="100%" height="100%" viewBox="0 0 768 768">
            <path
                d="M384 415.5q48 0 105 13.5t104.25 45 47.25 70.5v96h-513v-96q0-39 47.25-70.5t104.25-45 105-13.5zM384 127.5q52.5 0 90 38.25t37.5 90.75-37.5 90-90 37.5-90-37.5-37.5-90 37.5-90.75 90-38.25zM384 477q-66 0-130.5 24.75t-64.5 42.75v34.5h390v-34.5q0-18-64.5-42.75t-130.5-24.75zM384 189q-28.5 0-48 19.5t-19.5 48 19.5 47.25 48 18.75 48-18.75 19.5-47.25-19.5-48-48-19.5z"></path>
          </svg>
          <span>Профиль</span>
        </router-link>
      </li>
      <li>
        <router-link class="main-nav__link" to="/search">
          <svg width="100%" height="100%" viewBox="0 0 768 768">
            <path
                d="M513.312 507.392c-1.088 0.832-2.144 1.76-3.168 2.784s-1.92 2.048-2.784 3.168c-40.256 38.816-95.008 62.656-155.36 62.656-61.856 0-117.824-25.024-158.4-65.6s-65.6-96.544-65.6-158.4 25.024-117.824 65.6-158.4 96.544-65.6 158.4-65.6 117.824 25.024 158.4 65.6 65.6 96.544 65.6 158.4c0 60.352-23.84 115.104-62.688 155.392zM694.624 649.376l-117.6-117.6c39.392-49.28 62.976-111.776 62.976-179.776 0-79.52-32.256-151.552-84.352-203.648s-124.128-84.352-203.648-84.352-151.552 32.256-203.648 84.352-84.352 124.128-84.352 203.648 32.256 151.552 84.352 203.648 124.128 84.352 203.648 84.352c68 0 130.496-23.584 179.776-62.976l117.6 117.6c12.512 12.512 32.768 12.512 45.248 0s12.512-32.768 0-45.248z"></path>
          </svg>
          <span>Поиск</span>
        </router-link>
      </li>

      <template v-if="$store.state.auth.user">
        <li>
          <div class="main-nav__collections-title">
            Мои коллекции
            <svg width="100%" height="100%" viewBox="0 0 768 768" @click="$router.push({query: {popUp: 'newCollection'}})">
              <path
                  d="M576 320h-128v-128c0-35.328-28.672-64-64-64s-64 28.672-64 64l2.272 128h-130.272c-35.328 0-64 28.672-64 64s28.672 64 64 64l130.272-2.272-2.272 130.272c0 35.328 28.672 64 64 64s64-28.672 64-64v-130.272l128 2.272c35.328 0 64-28.672 64-64s-28.672-64-64-64z"></path>
            </svg>
          </div>
        </li>
        <li class="main-nav__collections">
          <NavCollections/>
        </li>
      </template>

      <li>
        <router-link class="main-nav__link" to="/settings">
          <svg width="100%" height="100%" viewBox="0 0 768 768">
            <path
                d="M416 160l27.36 109.44 108.448-31.072 48.032 83.2-81.12 78.368 81.12 78.432-48 83.2-108.48-31.072-27.36 109.504h-96l-27.36-109.504-108.48 31.072-48.032-83.2 81.12-78.432-81.088-78.368 48-83.2 108.48 31.072 27.36-109.44h96M416 96h-96c-29.376 0-54.976 20-62.048 48.512l-11.328 45.184-44.8-12.8c-5.888-1.696-11.808-2.496-17.664-2.496-22.4 0-43.776 11.84-55.392 32l-48 83.2c-14.688 25.472-10.144 57.664 10.944 78.016l33.504 32.352-33.536 32.48c-21.12 20.384-25.664 52.576-10.976 78.016l48.064 83.2c11.616 20.192 32.992 32 55.392 32 5.856 0 11.776-0.8 17.664-2.432l44.768-12.832 11.328 45.28c7.104 28.32 32.704 48.32 62.080 48.32h96c29.376 0 54.976-20 62.048-48.512l11.328-45.248 44.768 12.8c5.888 1.696 11.808 2.464 17.664 2.464 22.4 0 43.776-11.84 55.392-32l48-83.2c14.688-25.472 10.144-57.6-10.944-78.016l-33.504-32.416 33.504-32.416c21.12-20.384 25.632-52.608 10.944-78.016l-48-83.2c-11.68-20.192-32.992-32-55.424-32-5.888 0-11.776 0.8-17.632 2.432l-44.8 12.832-11.328-45.216c-7.040-28.288-32.64-48.288-62.016-48.288z"></path>
            <path
                d="M368 336c35.328 0 64 28.64 64 64 0 35.328-28.672 64-64 64s-64-28.672-64-64c0-35.36 28.672-64 64-64M368 304c-52.928 0-96 43.072-96 96s43.072 96 96 96 96-43.072 96-96-43.072-96-96-96z"></path>
          </svg>
          <span>
            Настройки
          </span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import {computed} from "vue";
import {useStore} from "vuex";
import NavCollections from "@/components/NavCollections";

export default {
  components: {NavCollections},
  setup() {
    const store = useStore()

    return {
      profileLink: computed(() => store.state.auth.user ? '/user/' + store.state.auth.user.id : '/auth'),
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.main-nav {
  height: 100%;

  &_guest {

    .main-nav__link {
      padding: 20px;
    }
  }

  ul {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  &__collections-title {
    position: relative;
    padding: 10px;
    font-weight: 700;
    border-top: 1px solid $color-nav-border;
    cursor: default;

    svg {
      cursor: pointer;
      position: absolute;
      top: 50%;
      right: 10px;
      transform: translateY(-50%);
      height: 20px;
      width: 20px;
      fill: $color-text;
    }
  }

  &__collections {
    overflow: hidden;
    flex-grow: 1;
    border-bottom: 1px solid $color-nav-border;
  }

  &__link {
    padding: 10px;
    display: block;

    span {
      vertical-align: middle;
      padding-left: 10px;
      font-weight: 700;
    }

    svg {
      vertical-align: middle;
      fill: $color-text;
      width: 24px;
      height: 24px;
    }

    &:hover {
      color: $color-text-light;

      svg {
        fill: $color-text-light;
      }
    }
  }
}

@media screen and (max-width: 770px) {
  .main-nav {
    padding: 0;

    ul {
      display: flex;
      justify-content: space-around;
      align-items: center;
      height: 100%;
    }

    &__link {
      padding: 0;
      display: block;

      span {
        display: none;
      }

      svg {
        vertical-align: middle;
        fill: $color-text;
      }

      &:hover {
        color: $color-text-light;

        svg {
          fill: $color-text-light;
        }
      }
    }
  }
}

</style>
