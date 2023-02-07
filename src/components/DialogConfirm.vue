<template>
  <div class="dialog-confirm">
    <div class="dialog-confirm__question" v-html="question"></div>
    <div class="dialog-confirm__btns">
      <MyButton @click="$emit('yes')" style="width: 60px">Да</MyButton>
      <MyButton @click="$emit('no')" style="margin-left: 20px; width: 60px;">Нет</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {MyButton},
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
