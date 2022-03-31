<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handlePasswordReset">
      <p class="col-12 text-h5 text-center">Reset Password</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="New Password"
          v-model="password"
          standout="bg-teal text-white"
          lazy-rules
          :rules="
            (val) =>
              (val && val.length >= 6) ||
              'Password is required and more than 6 characters!'
          "
          type="password"
        />
        <q-btn
          label="Reset Password"
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
import { useRouter, useRoute } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageResetPassword",
  setup() {
    const { resetPassword } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const router = useRouter();

    const route = useRoute();
    const token = route.query.token;

    const password = ref("");

    const handlePasswordReset = async () => {
      try {
        await resetPassword(token, password.value);
        notifySuccess('Password changed!');
        router.push({ name: "login" });
      } catch (error) {
        notifyError(error.message);
      }
    };

    return {
      password,
      handlePasswordReset,
    };
  },
});
</script>
