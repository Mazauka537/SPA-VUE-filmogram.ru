<template>
  <router-link :to="'/user/' + user.id" class="user-block">

    <div class="user-block__avatar">
      <img :src="user.avatar ? env.VUE_APP_AVATARS_PATH + user.avatar : '/img/user.jpg'"
           alt="avatar">
    </div>

    <div class="user-block__name">
      {{ user.name }}
    </div>

  </router-link>
</template>

<script>
export default {
  props: {
    user: Object
  },
  setup() {
    return {
      env: process.env
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.user-block {
  padding: 15px;
  width: 180px;
  height: 227px;
  background: $color-bg-side;
  display: inline-block;
  border-radius: 7px;

  &:hover {
    background: $color-bg-input;
  }

  &__avatar {

    img {
      height: 150px;
      width: 150px;
      border-radius: 50%;
    }
  }

  &__name {
    margin-top: 15px;
    font-weight: 700;
    color: $color-text-light;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }
}

@media screen and (max-width: 1460px) {
  .user-block {
    width: 150px;
    height: 190px;

    &__avatar {

      img {
        height: 120px;
        width: 120px;
      }
    }

    &__name {
      font-weight: 700;
      font-size: 12px;
    }
  }
}

@media screen and (max-width: 560px) {
  .user-block {
    width: 100%;
    height: auto;
    padding: 0;
    background: transparent;
    white-space: nowrap;
    overflow: hidden;
    border-radius: 0;

    &:hover {
      background: transparent;
    }

    &__avatar {
      display: inline-block;
      vertical-align: middle;

      img {
        height: 60px;
        width: 60px;
      }
    }

    &__name {
      display: inline-block;
      vertical-align: middle;
      margin-top: 0;
      margin-left: 10px;
      font-weight: 400;
    }
  }
}

</style>
