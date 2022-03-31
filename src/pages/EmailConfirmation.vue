<template>
  <q-page padding>
    <div class="row justify-center">
      <div class="col-md4 col-sm6 col-xs-10 q-gutter-y-md">
        <p>Check your e-mail inbox to confirm the account.</p>
        <p>
          <strong>EMAIL: {{ $route.query.email }}</strong>
        </p>
        <q-btn
          label="Back"
          color="grey"
          class="full-width"
          :to="{ name: 'login' }"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "PageEmailConfirmation",
});
</script>
