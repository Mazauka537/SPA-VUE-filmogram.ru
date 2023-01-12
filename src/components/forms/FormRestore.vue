<template>
  <form class="form-restore">
    <div class="form-restore__header">
      <MainLogo style="font-size: 60px"/>
      <div class="form-restore__desc">
        enter your e-mail to recover your password
      </div>
    </div>

    <MyInput type="email" placeholder="Email" icon-class="icon-mail" v-model="form.email"
              style="margin-top: 33px"/>

    <MyButton text="Sign In" @click.prevent="form.submit" :load="form.isSending" style="margin-top: 35px" >Send Mail</MyButton>

    <div class="form-restore__login">
      Remember a password?
      <a class="form-restore__login-link" @click.prevent="$emit('switchForm', 'login')">Login</a>
    </div>
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
  setup(_, {emit}) {
    const requestMaker = useRequestMaker()

    const sendMailRequest = async () => {
      emit('switchForm', 'confirmation')

      let response = await requestMaker.fetch('restore', 'POST', {
        email: form.email,
      })

      if (response.status !== 200) {
        return
      }
    }

    const form = useForm({
      email: '',
    }, sendMailRequest)

    return {
      form
    }
  }
}
</script>

<style lang="scss">
@import "../../assets/styles/vars";

.form-restore {
  width: 100%;

  &__header {
    text-align: center;
  }

  &__desc {
    font-size: 14px;
    letter-spacing: 0.1px;
    padding: 15px 30px 0;
  }

  &__login {
    width: 100%;
    text-align: center;
    font-size: 14px;
    margin-top: 60px;
  }

  &__login-link {
    color: $color-text-light;
    cursor: pointer;
    font-size: 14px;
  }
}
</style>
