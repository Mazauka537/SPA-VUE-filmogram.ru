<template>
  <div class="dialog-confirm">
    <div class="dialog-confirm__btns">
      <MyButton @click="$emit('yes')" style="width: 100px">Да</MyButton>
      <MyButton @click="$emit('no')" :white="true" style="margin-left: 30px; width: 100px;">Нет</MyButton>
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

  &__btns {
    padding: 10px 0;
  }
}

@media screen and (max-width: 560px) {
  .dialog-confirm {

    &__btns {
      padding: 60px 0;
    }
  }
}

</style>
