<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn label="MY SERVICES" color="primary" @click="bar = true" />

      <q-dialog
        v-model="bar"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-table
            title="Your Services"
            :rows="serviceList"
            :columns="columns"
            dense
            :rows-per-page-options="[5, 10, 15]"
            row-key="id"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    color="accent"
                    round
                    dense
                    @click="props.row.expand = !props.row.expand"
                    :icon="props.row.expand ? 'remove' : 'add'"
                  />
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.row.expand" :props="props">
                <q-td colspan="100%">
                  <div class="row text-center q-mt-sm q-mb-sm">
                    <q-btn
                      @click="
                        bar2 = true;
                        mapServicesHistory(props.row.ServiceId);
                      "
                      label="Info"
                    ></q-btn>
                    <q-btn
                      class="q-ml-sm"
                      @click="
                        bar3 = true;
                        mapBudgets_by_serviceid(props.row.ServiceId);
                      "
                      label="Budgets"
                    ></q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </q-dialog>

      <q-space />

      <q-dialog v-model="bar2" persistent>
        <q-card>
          <q-card-section class="row items-right q-pb-none">
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-table
            class="col fixed-header"
            title="Service History"
            :rows="historyList"
            :columns="columns2"
            dense
            :rows-per-page-options="[5, 10, 15]"
            row-key="id"
          />
        </q-card>
      </q-dialog>

      <q-space />

      <q-dialog
        v-model="bar3"
        persistent
        :maximized="maximizedToggle"
        transition-show="slide-up"
        transition-hide="slide-down"
      >
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-table
            title="Your Budgets"
            :rows="budgetList"
            :columns="columns3"
            dense
            :rows-per-page-options="[5, 10, 15]"
            row-key="id"
          >
            <template v-slot:header="props">
              <q-tr :props="props">
                <q-th auto-width />
                <q-th v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.label }}
                </q-th>
              </q-tr>
            </template>

            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td auto-width>
                  <q-btn
                    size="sm"
                    color="accent"
                    round
                    dense
                    @click="props.row.expand = !props.row.expand"
                    :icon="props.row.expand ? 'remove' : 'add'"
                  />
                </q-td>
                <q-td v-for="col in props.cols" :key="col.name" :props="props">
                  {{ col.value }}
                </q-td>
              </q-tr>
              <q-tr v-show="props.row.expand" :props="props">
                <q-td colspan="100%">
                  <div class="row text-center q-mt-sm q-mb-sm">
                    <q-btn
                      v-if="props.row.State != 'done'"
                      text-color="black"
                      class="q-ml-sm"
                      stack
                      glossy
                      color="red"
                      icon="pending"
                      @click="change_state(props.row.Service_id, 'to_execute')"
                    ></q-btn>
                    <q-btn
                      v-if="props.row.State != 'done'"
                      text-color="black"
                      class="q-ml-sm"
                      stack
                      glossy
                      color="green"
                      icon="verified"
                      @click="change_state(props.row.Service_id, 'done')"
                    ></q-btn>
                  </div>
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </q-card>
      </q-dialog>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useNotify from "src/composables/UseNotify";
import useApi from "src/composables/UseApi";

const columns3 = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "Id",
    sortable: true,
  },
  {
    name: "serviceid",
    align: "center",
    label: "Service ID",
    field: "Service_id",
    sortable: true,
  },
  {
    name: "cost",
    align: "center",
    label: "Cost",
    field: "Cost",
    sortable: true,
  },
  {
    name: "Report",
    align: "center",
    label: "Report",
    field: "Report",
    sortable: true,
  },
];

const columns2 = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "username",
    align: "center",
    label: "Employee",
    field: "EmployeeId",
    sortable: true,
  },
  {
    name: "FirstName",
    align: "center",
    label: "Report",
    field: "Report",
    sortable: true,
  },
  {
    name: "Surname",
    align: "center",
    label: "Time Consumption",
    field: "TimeConsumption",
    sortable: true,
  },
];
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
    name: "state",
    align: "center",
    label: "Service_State",
    field: "State",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "date",
    align: "center",
    label: "End Date",
    field: "EndDate",
    sortable: true,
  },
];
export default defineComponent({
  name: "ClientWebPage",

  data() {
    return {
      input: "",
      input_type: "",
    };
  },
  setup() {
    const { notifyError, notifySuccess } = useNotify();
    const serviceList = ref([]);
    const historyList = ref([]);
    const budgetList = ref([]);
    const open_table = ref(false);
    var value = "mmacgilfoylenx";
    const {
      getServiceHistoryByID,
      getServiceList_by_username,
      getBudgetList_by_username,
      getServiceList,
      service_state,
    } = useApi();

    const change_state = async (service_id, state) => {
      console.log(service_id, state);
      try {
        const code_resp = await service_state(service_id, state);
        if (code_resp == 200) {
          serviceList.value = await getServiceList();
          notifySuccess("State updated!");
        } else {
          notifyError("Error in change state");
        }
      } catch (error) {
        console.log(error);
      }
    };

    const mapServices_by_username = async (service_id) => {
      console.log(value);
      try {
        serviceList.value = await getServiceList_by_username(service_id);
      } catch (error) {
        notifyError(error);
      }
    };

    const mapBudgets_by_serviceid = async (value) => {
      console.log(value);
      try {
        budgetList.value = await getBudgetList_by_username(value);
      } catch (error) {
        notifyError(error);
      }
    };

    const mapServicesHistory = async (service_id) => {
      console.log(service_id);
      try {
        historyList.value = await getServiceHistoryByID(service_id);
      } catch (error) {
        notifyError(error);
      }
    };

    // When view is mounted, call methods below
    onMounted(() => {
      mapServices_by_username(value);
    });
    return {
      mapServicesHistory,
      mapServices_by_username,
      mapBudgets_by_serviceid,
      change_state,
      columns,
      bar: ref(false),
      bar2: ref(false),
      bar3: ref(false),
      maximizedToggle: ref(true),
      filter: ref([]),
      serviceList,
      historyList,
      budgetList,
      columns2,
      columns3,
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
      prompt: ref(false),
      MyPagination: {
        rowsPerPage: 50,
      },
      value,
      open_table,
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
