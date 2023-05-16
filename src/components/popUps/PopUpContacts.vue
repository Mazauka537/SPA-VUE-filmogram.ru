<template>
  <PopUp title="Контакты">
    <div class="contacts">
      e-mail: filmogram.ru@gmail.com
    </div>
  </PopUp>
</template>

<script>
import PopUp from "@/components/popUps/PopUp";

export default {
  components: {PopUp}
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.contacts {

}

@media screen and (max-width: 560px) {
  .contacts {
    padding-top: 20px;
  }
}
</style>
