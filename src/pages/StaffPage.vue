<template>
  <q-page padding>
    <div class="row">
      <q-btn
        color="primary"
        label="Add New Staff"
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
        <q-form @submit.prevent="addStaff(staff_form)">
          <q-card-section>
            <div class="text-h6">Add Staff</div>
          </q-card-section>

          <q-card-section class="q-pt-none">
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.username"
              type="text"
              label="Username"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.firstname"
              type="text"
              label="First Name"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.surname"
              type="text"
              label="Surname"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.email"
              type="text"
              label="Email"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.phone"
              type="text"
              label="Phone"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.nif"
              type="number"
              label="NIF"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.jobTitle"
              type="text"
              label="Job Title"
              :rules="nameRules"
            ></q-input>
            <q-input
              dense
              clearable
              v-model="staff_form.addressline"
              type="text"
              label="Address Line"
              :rules="nameRules"
            >
            </q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.zipcode"
              type="text"
              label="ZIP Code"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.city"
              type="text"
              label="City"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.district"
              type="text"
              label="State"
              :rules="nameRules"
            ></q-input>
            <q-input
              autofocus
              dense
              clearable
              v-model="staff_form.country"
              type="text"
              label="Country"
              :rules="nameRules"
            ></q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Staff" type="submit" />
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
        title="Suppliers"
        :rows="staff_list"
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
    name: "EmployeeId",
    label: "ID",
    align: "left",
    field: "EmployeeId",
    sortable: true,
  },
  {
    name: "Username",
    align: "center",
    label: "Username",
    field: "Username",
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
    name: "JobTitle",
    align: "center",
    label: "Job Title",
    field: "JobTitle",
    sortable: true,
  },
  {
    name: "nif",
    align: "center",
    label: "NIF",
    field: "Nif",
    sortable: true,
  },
  {
    name: "address",
    align: "center",
    label: "Address",
    field: "Addressline",
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
    name: "city",
    align: "center",
    label: "Local",
    field: "City",
    sortable: true,
  },
  {
    name: "District",
    align: "center",
    label: "State",
    field: "District",
    sortable: true,
  },
  {
    name: "country",
    align: "center",
    label: "Country",
    field: "Country",
    sortable: true,
  },
];
export default defineComponent({
  name: "OrdersPage",
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const staff_list = ref([]);
    const { getStaffList, postStaff } = useApi();

    const staff_form = ref({
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
      jobTitle: "",
    });
    const mapStaff = async () => {
      try {
        staff_list.value = await getStaffList();
        if (staff_list.value != null) notifySuccess("Clients Loaded");
      } catch (error) {
        notifyError(error);
      }
    };

    const addStaff = async (staff_form) => {
      try {
        console.log(staff_form);
        await postStaff(staff_form);
        staff_list.value = await getStaffList();
        notifySuccess("Staff Added!");
      } catch (error) {
        console.log(error);
      }
    };
    // When view is mounted, call methods below
    onMounted(() => {
      mapStaff();
    });
    return {
      staff_form,
      columns,
      addStaff,
      staff_list,
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
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
