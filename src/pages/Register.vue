<template>
  <q-page padding>
    <q-form class="row justify-center" @submit.prevent="handleRegister">
      <p class="col-12 text-h5 text-center">Register</p>
      <div class="col-md-4 col-sm-6 col-xs-10 q-gutter-y-md">
        <q-input
          label="Name"
          v-model="form.name"
          standout="bg-teal text-white"
        />
        <q-input
          label="Email"
          v-model="form.email"
          standout="bg-teal text-white"
        />
        <q-input
          label="Password"
          v-model="form.password"
          standout="bg-teal text-white"
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

export default defineComponent({
  name: "RegisterPage",

  setup() {
    const router = useRouter();
    const { register } = useAuthUser();

    const form = ref({
      name: "",
      email: "",
      password: "",
    });

    const handleRegister = async () => {
      try {
        await register(form.value);
        router.push({
          name: "email-confirmation",
          query: { email: form.value.email },
        });
      } catch (error) {
        console.log(error);
      }
    };

    return {
      form,
      handleRegister,
    };
  },
});
</script>
