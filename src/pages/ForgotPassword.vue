<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleForgotPassword">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input label="Email" v-model="email" standout="bg-teal text-white" />
        <q-btn
          label="Send Reset Email"
          color="black"
          class="full-width"
          type="submit"
        />
        <q-btn
          label="Back"
          color="grey"
          class="full-width"
          :to="{ name: 'login' }"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  setup() {
    const { sendPasswordResetEmail } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const email = ref("");

    const handleForgotPassword = async () => {
      try {
        await sendPasswordResetEmail(email.value);
        notifySuccess(`Password reset email sent to: ${email.value}`);
        //alert(`Password reset email sent to: ${email.value}`);
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      email,
      handleForgotPassword,
    };
  },
});
</script>
