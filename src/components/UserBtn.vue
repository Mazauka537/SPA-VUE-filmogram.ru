<template>
  <div class="user-btn" ref="elemUserBtn">
    <div class="user-btn__btn" @click="isPanelVisible = true">
      <span>{{ $store.state.auth.user.login }}</span>
      <img :src="$store.state.auth.user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + $store.state.auth.user.avatar : '/user.jpg'" alt="avatar">
    </div>

    <div class="user-btn__panel" v-if="isPanelVisible">
      <ul>
        <li @click="$router.push('/logout')">Выход</li>
      </ul>
    </div>
  </div>
</template>

<script>
import {onMounted, ref} from "vue";

export default {
  setup() {
    const isPanelVisible = ref(false)
    const elemUserBtn = ref()

    const hidePanel = e => {
      const isTargetInUserBtn = !!Array.from(e.path).find(element => element === elemUserBtn.value)

      if (!isTargetInUserBtn) {
        isPanelVisible.value = false
      }
    }

    onMounted(() => {
      window.addEventListener('click', hidePanel)
    })

    return {
      elemUserBtn,
      isPanelVisible
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.user-btn {
  position: relative;

  &__btn {
    cursor: pointer;

    span {
      display: inline-block;
      vertical-align: middle;
      padding-right: 15px;
    }

    img {
      vertical-align: middle;
      height: 40px;
      width: 40px;
      border-radius: 50%;
    }
  }

  &__panel {
    position: absolute;
    top: 60px;
    right: 0;
    background: $color-bg-nav;
    width: 200px;

    li {
      padding: 20px;
      cursor: pointer;

      &:hover {
        color: $color-text-light;
      }
    }
  }
}
</style>
