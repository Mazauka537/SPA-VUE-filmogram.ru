<template>
  <div class="dialog-confirm">
    <div class="dialog-confirm__question" v-html="question"></div>
    <div class="dialog-confirm__btns">
      <MyButtonMini @click="$emit('yes')" style="width: 60px">Да</MyButtonMini>
      <MyButtonMini @click="$emit('no')" style="margin-left: 20px; width: 60px;">Нет</MyButtonMini>
    </div>
  </div>
</template>

<script>
import MyButtonMini from "@/components/UI/MyButtonMini";
export default {
  components: {MyButtonMini},
  props: {
    question: String
  }
}
</script>

<style scoped lang="scss">

.dialog-confirm {
  text-align: center;

  &__question {

  }

  &__btns {
    margin-top: 20px;
  }
}

</style>
