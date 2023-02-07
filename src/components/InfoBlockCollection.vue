<template>
  <div class="info-block-collection">
    <div class="info-block-collection__title">{{ collection.title }}</div>
    <div class="info-block-collection__author">
      Автор:
      <router-link class="link" :to="'/user/' + collection.user_id">
        @{{ collection.user.login }}
      </router-link>
    </div>
    <div class="info-block-collection__films">
      {{ filmsCount }}
    </div>
    <div class="info-block-collection__desc">
      {{ collection.description }}
    </div>
    <div class="info-block-collection__delete" v-if="$store.getters['auth/isOwner'](collection.user_id)">
      <MyButton @click="$emit('edit')" style="width: 100px; margin-right: 20px;">Изменить</MyButton>
      <MyButton @click="$emit('delete')" style="width: 100px">Удалить</MyButton>
    </div>
  </div>
</template>

<script>
import useFilmsCount from "@/composables/useFilmsCount";
import MyButton from "@/components/UI/MyButton";

export default {
  components: {MyButton},
  props: {
    collection: Object
  },
  setup(props) {
    const {filmsCount} = useFilmsCount(props)

    return {
      filmsCount
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.info-block-collection {
  text-align: center;

  &__title {
    font-weight: 700;
  }

  &__author, &__films {
    font-size: 13px;
  }

  &__author {

  }

  &__films {

  }

  &__desc {
    margin-top: 15px;
  }

  &__delete {
    margin-top: 20px;
    text-align: center;
  }
}
</style>
