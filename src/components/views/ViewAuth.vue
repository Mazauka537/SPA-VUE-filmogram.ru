<template>
  <SinglePage>
    <div class="view-auth">
      <div class="view-auth__form">
        <FormLogin v-if="displayedForm === 'login'" @switchForm="switchForm"/>
        <FormRegister v-if="displayedForm === 'register'" @switchForm="switchForm"/>
        <FormRestore v-if="displayedForm === 'restore'" @switchForm="switchForm"/>
        <FormConfirmation v-if="displayedForm === 'confirmation'" @switchForm="switchForm"/>
      </div>
    </div>
  </SinglePage>
</template>

<script>
import FormLogin from "@/components/forms/FormLogin";
import FormRegister from "@/components/forms/FormRegister";
import FormRestore from "@/components/forms/FormRestore";
import FormConfirmation from "@/components/forms/FormConfirmation";
import {ref} from "vue";
import SinglePage from "@/components/views/SinglePage";

export default {
  components: {SinglePage, FormLogin, FormRegister, FormRestore, FormConfirmation},
  setup() {
    const displayedForm = ref('login')

    const switchForm = formName => {
      displayedForm.value = formName
    }

    return {
      displayedForm,
      switchForm
    }
  }
}
</script>

<style scoped lang="scss">

.view-auth {
  height: 100%;

  &__form {
    width: 100%;
    margin: 0 auto;
    padding: 100px 0;
    max-width: 340px;
  }
}

</style>
