<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <h3>Bem-vindo, {{ user.user_metadata.name }}.</h3>
      <div class="q-pa-md">
        <div class="q-gutter-y-md" style="max-width: 600px">
          <q-tabs
            v-model="tab"
            narrow-indicator
            dense
            align="justify"
            class="text-primary"
          >
            <q-route-tab
              :ripple="false"
              name="clients"
              icon="group"
              label="Clients"
              to="/clients"
              exact
            />
            <q-route-tab
              :ripple="false"
              name="services"
              icon="build"
              label="Services"
              to="/services"
              exact
            />
            <q-route-tab
              :ripple="false"
              name="users"
              icon="person_search"
              label="Users"
              to="/users"
              exact
            />
          </q-tabs>
          <q-tabs
            v-model="tab"
            narrow-indicator
            dense
            align="justify"
            class="text-primary"
          >
            <q-route-tab
              :ripple="false"
              name="orders"
              icon="archive"
              label="Orders"
              to="/orders"
              exact
            />
          </q-tabs>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref } from "vue";
import useAuthUser from "src/composables/UseAuthUser";

export default defineComponent({
  name: "PageMe",
  setup() {
    const { user } = useAuthUser();

    return {
      user,
      tab: ref("mails"),
    };
  },
});
</script>
