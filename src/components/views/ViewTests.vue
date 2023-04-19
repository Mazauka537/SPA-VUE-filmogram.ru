<template>
  <div class="view-tests">

    <div class="view-tests__container">
      <MyButton @click="$router.push({name: 'tests', query: {test: '123'}})">add queries</MyButton>
<!--      <MySelect placeholder="Выберите значение" :options="options" v-model="selectedValue"/>-->
      <div class="div" style="height: 50px; width: 50px; background: red" v-if="$route.query.test === '123'"></div>
    </div>

  </div>
</template>

<script>
import MySelect from "@/components/UI/MySelect";
import {ref} from "vue";
import MyButton from "@/components/UI/MyButton";

export default {
  components: {MyButton, MySelect},
  props: {
    title: String
  },
  setup() {
    // const selectedValue = ref(undefined)
    //
    // const options = [
    //   {name: 'option 1', value: 1},
    //   {name: 'option 2', value: 2},
    //   {name: 'option 3 option 3 option 3 option 3 option 3 option 3 option 3 option 3 option 3', value: 3},
    //   {name: 'option 4', value: 4},
    //   {name: 'option 5', value: 5},
    //   {name: 'option 6', value: 6},
    // ]

    return {
      // options,
      // selectedValue
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
