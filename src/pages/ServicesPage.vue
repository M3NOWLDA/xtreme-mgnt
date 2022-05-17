<template>
  <q-page padding>
    <div class="row">
      <q-btn
        color="primary"
        label="Register New Service"
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
      <q-form @submit.prevent="addService(s_form)">
        <q-card-section>
          <div class="text-h6">Add Services</div>
        </q-card-section>
        <q-card-section class="q-pt-none">
          <q-select
            filled
            dense
            clearable
            v-model="s_form.type"
            :options="items"
            label="Service Type"
            :rules="nameRules"
          ></q-select>
          <q-input
            autofocus
            dense
            clearable
            v-model="s_form.clientId"
            type="number"
            label="Client ID"
            :rules="nameRules"
          ></q-input>
          <q-select
            filled
            dense
            clearable
            v-model="s_form.status"
            :options="items_2"
            label="Status"
            :rules="nameRules"
          ></q-select>
          <q-input
            autofocus
            dense
            clearable
            v-model="s_form.observations"
            type="text"
            label="Observations"
            :rules="nameRules"
          ></q-input>
          <q-input
            autofocus
            dense
            clearable
            v-model="s_form.startDate"
            type="date"
            hint="Start Date"
            :rules="nameRules"
          ></q-input>
          <q-input
            autofocus
            dense
            clearable
            v-model="s_form.endDate"
            type="date"
            hint="End Date"
            :rules="nameRules"
          ></q-input>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Cancel" v-close-popup />
          <q-btn flat label="Add Service"  type="submit" v-close-popup />
        </q-card-actions>
      </q-form>

      </q-card>
    </q-dialog>

    <div id="divTable" class="row q-mt-md">
      <q-table
        class="col fixed-header"
        title="Services"
        :rows="serviceList"
        :columns="columns"
        dense
        :pagination="MyPagination"
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
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "cli_id",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
  {
    name: "status",
    align: "center",
    label: "Status",
    field: "Status",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
];
export default defineComponent({
  name: "ServicesPage",
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const serviceList = ref([]);
    const { getServiceList, postService } = useApi();

    // Reactive form for client data inputs
    const s_form = ref({
      typeId: "",
      type: "",
      clientId: "",
      status: "",
      observations: "",
      startDate: "",
      endDate: "",
    });
    const mapServices = async () => {
      try {
        serviceList.value = await getServiceList();
        if (serviceList.value != null) notifySuccess("Services Loaded");
      } catch (error) {
        notifyError(error);
      }
    };

    const addService = async (s_form) =>{
      if     (s_form.type == 'Reparação Equip')      s_form.typeId = 1;
      else if(s_form.type == 'Diagnóstico') s_form.typeId = 2;
      else if(s_form.type == 'Manutenção Equip')  s_form.typeId = 3;
      else if(s_form.type == 'Montagem Equip')    s_form.typeId = 4;

      if(s_form.status == 'Active') s_form.status = 1
      else if (s_form.status == 'Inactive') s_form.status = 0
      try {
        console.log(s_form)
        const status = await postService(s_form)
        if(status == 200){
          serviceList.value = await getServiceList()
          notifySuccess("New Service Registered!")
        }
        else notifyError("Error in Register New Service!")
      } catch (error) {
        notifyError("Internal Error Aplication")
      }
    }

    // When view is mounted, call methods below
    onMounted(() => {
      mapServices();
    });
    return {
      s_form,
      columns,
      serviceList,
      addService,
      items:[
        'Manutenção Equip', 'Reparação Equip', 'Diagonóstico', 'Montagem Equip'
      ],
      items_2:[
        'Active', 'Inactive'
      ],
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
      prompt: ref(false),
      MyPagination: {
        rowsPerPage: 50,
      },
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
