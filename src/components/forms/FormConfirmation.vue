<template>
  <form class="form-confirmation">
    <div class="form-confirmation__header">
      <MainLogo style="font-size: 60px"/>
      <div class="form-confirmation__desc">
        We have sent an letter to your email, enter the code from the letter to confirm the email
      </div>
    </div>

    <MyInput type="text" placeholder="Code from letter" icon-class="icon-mail" v-model="form.code"
              style="margin-top: 33px"/>
    <MyInput type="password" placeholder="New password" icon-class="icon-lock" v-model="form.password"
              style="margin-top: 33px"/>

    <MyButton text="Sign In" @click.prevent="form.submit" :load="form.isSending" style="margin: 35px 0" >Set new password</MyButton>

  </form>
</template>

<script>
import MyButton from '../UI/MyButton'
import MyInput from '../UI/MyInput'
import MainLogo from "@/components/MainLogo";
import useRequestMaker from "@/composables/useRequestMaker";
import useForm from "@/composables/useForm";

export default {
  components: {
    MainLogo,
    MyInput,
    MyButton,
  },
  setup() {
    const requestMaker = useRequestMaker()

    const setNewPasswordRequest = async () => {
      let response = await requestMaker.fetch('set/new/password', 'POST', {
        code: form.code,
        password: form.password,
      })

      if (response.status !== 200) {
        return
      }
    }

    const form = useForm({
      code: '',
      password: '',
    }, setNewPasswordRequest)

    return {
      form
    }
  }
}
</script>

<style lang="scss">

.form-confirmation {
  width: 100%;

  &__header {
    text-align: center;
  }

  &__desc {
    letter-spacing: 0.1px;
    padding: 15px 30px 0;
  }
}
</style>
