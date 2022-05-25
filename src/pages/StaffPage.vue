<template>
  <q-page padding>
<div class="row q-ml-auto" style="height: 30px" >
        <q-btn
          color="primary"
          style="height: 10%"
          label="Add New Staff"
          @click="prompt = true"
        ></q-btn>
        <label class="q-ml-xl q-pl-xl q-mt-sm " style="margin-left: 31.8% ; font-size: 17px " dense>Search Employee</label>
        <q-input
            filled
            class="q-ml-lg"
            style="width: 300px"
            v-model="input"
            dense
            @input="isTyping = true"
            type="text"
            label="Value"
            required>
        </q-input>
        <q-select
            filled
            style="width: 300px"
            class="q-ml-md"
            dense
            v-model="input_type"
            :options="items"
            :rules="nameRules"
            label="Item"
            required>
        </q-select>
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

    <div id="divTable" class="row q-mt-lg">
      <q-table
        class="col fixed-header"
        title="Staff"
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

  data(){
    return{
      input: '',
      input_type: '',
    }
  },

  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const staff_list = ref([]);
    const { getStaffList, postStaff, getStaffList_by_char } = useApi();

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
        if (staff_list.value != null) notifySuccess("Staff List Loaded");
      } catch (error) {
        notifyError(error);
      }
    };

    const mapStaff_by_char = async (type, value) => {
      try {
        staff_list.value = await getStaffList_by_char(type, value);
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
      mapStaff,
      mapStaff_by_char,
      staff_form,
      columns,
      addStaff,
      staff_list,
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
      items:[
        'Id', 'Username', 'First Name', 'Surname', 'Job Tittle','Nif', 'Email', 'Phone', 'Address', 'City', 'State', 'Country'
      ],
      prompt: ref(false),
      secondDialog: ref(false),
    };
  },
  watch:{
    input(value){
      if(value != ""){
        this.mapStaff_by_char(this.input_type , value)
      }else{
        this.mapStaff()
      }
    }
  }
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
