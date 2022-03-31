<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleLogin">
      <p class="col-12 text-h5 text-center">Login</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Email"
          v-model="form.email"
          standout="bg-teal text-white"
          lazy-rules
          :rules="(val) => (val && val.length > 0) || 'Email is required!'"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          standout="bg-teal text-white"
          lazy-rules
          :rules="(val) => (val && val.length > 0) || 'Password is required!'"
          type="password"
        />
        <q-btn label="Login" color="primary" class="full-width" type="submit" />
        <q-btn
          label="Register"
          color="grey"
          class="full-width"
          type="submit"
          to="/register"
        />
        <q-btn
          label="Forgot Password?"
          color="grey"
          class="full-width"
          type="submit"
          to="/forgot-password"
        />
      </div>
    </q-form>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "PageLogin",

  setup() {
    const router = useRouter();

    const { login, isLoggedIn } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify();

    const form = ref({
      email: "",
      password: "",
    });

    onMounted(() => {
      if (isLoggedIn) {
        router.push({ name: 'me' })
      }
    })

    const handleLogin = async () => {
      try {
        await login(form.value);
        notifySuccess("Welcome!");
        router.push({ name: "me" });
      } catch (error) {
        //console.log(error.message);
        notifyError(error.message);
      }
    };

    return {
      form,
      handleLogin,
    };
  },
});
</script>
