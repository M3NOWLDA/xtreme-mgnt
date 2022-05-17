<template>
  <q-page padding>
    <div class="row">
      <q-btn
        color="primary"
        label="Add New Client"
        @click="prompt = true"
      ></q-btn>

      <q-space />
      <q-input
        outlined
        dense
        debounce="300"
        v-model="filter"
        placeholder="Search"
        class="q-mr-sm"
      >
        <template v-slot:append>
          <q-icon name="mdi-magnify" />
        </template>
      </q-input>
    </div>
    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit.prevent="addClient(cliForm)">
          <q-card-section>
            <div class="text-h6">Add Client</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.username"
              type="text"
              label="User Name"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.firstname"
              type="text"
              label="First Name"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.surname"
              type="text"
              label="Surname"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.email"
              type="email"
              label="Email"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.phone"
              type="number"
              label="Phone"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.nif"
              type="number"
              label="NIF"
              :rules="nameRules"
            ></q-input>
            <q-input
              dense
              clearable
              v-model="cliForm.addressline"
              type="text"
              label="Address Line"
              :rules="nameRules"
            >
            </q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.zipcode"
              type="text"
              label="ZIP Code"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.city"
              type="text"
              label="City"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.district"
              type="text"
              label="State"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="cliForm.country"
              type="text"
              label="Country"
              :rules="nameRules"
            ></q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Client" type="submit"/>
          </q-card-actions>
        </q-form>

      </q-card>
    </q-dialog>
    <q-dialog
      v-model="secondDialog"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="bg-teal text-white" style="width: 300px">
        <q-card-section>
          <div class="text-h6">Persistent</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Click/Tap on the backdrop.
        </q-card-section>

        <q-card-actions align="right" class="bg-white text-teal">
          <q-btn flat label="OK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <div id="divTable" class="row q-mt-md">
      <q-table
        class="col fixed-header"
        title="Clients"
        :rows="clientList"
        :columns="columns"
        dense
        :rows-per-page-options="[50, 75, 100, 150, 200]"
        row-key="id"
      />
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useNotify from "src/composables/UseNotify";
import useApi from "src/composables/UseApi";
const columns = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "FirstName",
    align: "center",
    label: "First Name",
    field: "FirstName",
    sortable: true,
  },
  {
    name: "Surname",
    align: "center",
    label: "Surname",
    field: "Surname",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "NIF",
    field: "Nif",
    sortable: true,
  },
  {
    name: "email",
    align: "center",
    label: "Email",
    field: "Email",
    sortable: true,
  },
  {
    name: "phome",
    align: "center",
    label: "Phone",
    field: "Phone",
    sortable: true,
  },
];
export default defineComponent({
  name: "ClientPage",
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const clientList = ref([]);
    const { getClientList, postClient } = useApi();
    // Reactive form for client data inputs
    const cliForm = ref({
      username: "",
      firstname: "",
      surname: "",
      email: "",
      phone: "",
      nif: "",
      addressline: "",
      zipcode: "",
      city: "",
      district: "",
      country: "",
    });
    const mapClients = async () => {
      try {
        clientList.value = await getClientList();
        if (clientList.value != null) notifySuccess("Clients Loaded");
      } catch (error) {
        notifyError(error);
      }
    };
    const addClient = async (cliForm) => {
      try {
        await postClient(cliForm)
        clientList.value = await getClientList()
        notifySuccess("Client Added!")
      } catch (error) {
        console.log(error)
      }
    };
    const updateClient = () => {};
    // When view is mounted, call methods below
    onMounted(() => {
      mapClients();
    });
    return {
      cliForm,
      columns,
      clientList,
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
      addClient,
      updateClient,
      prompt: ref(false),
      secondDialog: ref(false),
    };
  },
});
</script>

<style lang="sass">
.fixed-header
  height: 700px
  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    background-color: white
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0
  &.q-table--loading thead tr:last-child th
    top: 48px
</style>
