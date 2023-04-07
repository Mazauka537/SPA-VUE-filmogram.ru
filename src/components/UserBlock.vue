<template>
  <router-link :to="'/user/' + user.id" class="user-block">

    <div class="user-block__avatar">
      <img :src="user.avatar ? 'http://127.0.0.1:8000/storage/images/avatars/' + user.avatar : '/user.jpg'"
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
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.user-block {
  padding: 15px 15px 30px 15px;
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
    color: $color-text-light
  }
}

</style>
