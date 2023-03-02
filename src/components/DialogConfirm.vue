<template>
  <div class="dialog-confirm">
    <div class="dialog-confirm__btns">
      <MyButton @click="$emit('yes')" style="width: 100px">Да</MyButton>
      <MyButton @click="$emit('no')" :white="true" style="margin-left: 20px; width: 100px;">Нет</MyButton>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/UI/MyButton";
export default {
  components: {MyButton},
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
