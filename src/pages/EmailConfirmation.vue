<template>
  <q-page padding>
    <p>Check your e-mail inbox to confirm the account.</p>
    <p>
      <strong>EMAIL: {{ $route.query.email }}</strong>
    </p>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
