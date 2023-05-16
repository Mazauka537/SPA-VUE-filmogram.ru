<template>
  <PopUp :title="'Вы действительно хотите выйти с аккаунта?'">
    <DialogConfirm
        @yes="$router.push('/logout')"
        @no="$router.back()"/>
  </PopUp>
</template>

<script>
import PopUp from "@/components/popUps/PopUp";
import DialogConfirm from "@/components/DialogConfirm";

export default {
  components: {DialogConfirm, PopUp},
}
</script>

<style scoped>

</style>
