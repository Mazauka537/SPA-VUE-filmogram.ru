<template>
  <div class="sw-password">
    <div class="sw-password__inner">

      <form>

        <SWRow>
          <template #label>
            Старый пароль
          </template>
          <template #input>
            <MyInput type="password" v-model="form.oldPassword"/>
          </template>
        </SWRow>

        <SWRow>
          <template #label>
            Новый пароль
          </template>
          <template #input>
            <MyInput type="password" v-model="form.newPassword"/>
          </template>
        </SWRow>

        <SWRow>
          <template #label>
            Подтвердите новый пароль
          </template>
          <template #input>
            <MyInput type="password" v-model="form.newPasswordConfirmation"/>
          </template>
        </SWRow>

        <SWRow>
          <template #input>
            <MyButton style="max-width: 200px" @click.prevent.stop="form.submit" :load="form.isSending">Сменить пароль</MyButton>
          </template>
        </SWRow>

      </form>

    </div>
  </div>

</template>

<script>
import MyInput from "@/components/UI/MyInput";
import useForm from "@/composables/useForm";
import MyButton from "@/components/UI/MyButton";
import useRequestMaker from "@/composables/useRequestMaker";
import SWRow from "@/components/SWRow";

export default {
  components: {SWRow, MyButton, MyInput},
  setup() {
    const changeUserPasswordRequest = async () => {
      const response = await requestMaker.fetch('change/user/password', 'POST', {
        old_password: form.oldPassword,
        new_password: form.newPassword,
        new_password_confirmation: form.newPasswordConfirmation
      }, [200, 422, 401])
    }

    const requestMaker = useRequestMaker()
    const form = useForm({
      oldPassword: '',
      newPassword: '',
      newPasswordConfirmation: '',
    }, changeUserPasswordRequest)

    return {
      form,
    }
  }
}
</script>

<style scoped lang="scss">
@import "src/assets/styles/vars";

.sw-password {
  padding: 20px;
}

.sw-row {
  margin-top: 40px;
}
</style>
