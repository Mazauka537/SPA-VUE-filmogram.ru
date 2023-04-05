<template>
  <div class="view-tests">

    <div class="view-tests__container">

      <MySelect placeholder="Выберите значение" :options="options" v-model="selectedValue"/>

    </div>

  </div>
</template>

<script>
import MySelect from "@/components/UI/MySelect";
import {ref} from "vue";

export default {
  components: {MySelect},

  setup() {
    const selectedValue = ref(undefined)

    const options = [
      {name: 'option 1', value: 1},
      {name: 'option 2', value: 2},
      {name: 'option 3 option 3 option 3 option 3 option 3 option 3 option 3 option 3 option 3', value: 3},
      {name: 'option 4', value: 4},
      {name: 'option 5', value: 5},
      {name: 'option 6', value: 6},
    ]

    return {
      options,
      selectedValue
    }
  }
}
</script>

<style scoped lang="scss">

.view-tests {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__container {
    padding: 20px;
    width: 500px;
  }
}
</style>
