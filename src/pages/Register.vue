<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          standout="bg-teal text-white"
          lazy-rules
          :rules="val => (val && val.length > 0) || 'Name is required!'"
          type="name"
        />
        <q-input
          label="Email"
          v-model="form.email"
          standout="bg-teal text-white"
          lazy-rules
          :rules="val => (val && val.length > 0) || 'Email is required!'"
          type="email"
        />
        <q-input
          label="Password"
          v-model="form.password"
          standout="bg-teal text-white"
          lazy-rules
          :rules="val => (val && val.length >= 6) || 'Password is required and more than 6 characters!'"
          type="password"
        />
        <q-btn
          label="Register"
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
import { useRouter } from "vue-router";
import useNotify from "src/composables/UseNotify";

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();

    const { register } = useAuthUser();

    const { notifyError, notifySuccess } = useNotify()

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        notifySuccess()
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        //console.log(error);
        notifyError(error.message)
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
