<template>
  <PopUp title="Создание новой коллекции">
    <FormNewCollection style="margin-top: 30px;"/>
  </PopUp>
</template>

<script>
import PopUp from "@/components/PopUp";
import FormNewCollection from "@/components/forms/FormNewCollection";
export default {
  components: {FormNewCollection, PopUp}
}
</script>

<style scoped>

</style>
