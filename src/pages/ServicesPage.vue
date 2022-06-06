<template>
  <q-page padding>
    <div class="row q-ml-auto" style="height: 30px">
      <q-btn
        class="q-ml-md"
        color="primary"
        style="height: 10%"
        label="Add New Service"
        @click="prompt = true"
      ></q-btn>

      <label
        class="q-ml-xl q-pl-xl q-mt-sm"
        style="margin-left: 30%; font-size: 17px"
        dense
        >Search Service</label
      >
      <q-input
        filled
        class="q-ml-lg"
        style="width: 300px"
        v-model="input"
        dense
        @input="isTyping = true"
        type="text"
        label="Value"
        required
      >
      </q-input>
      <q-select
        filled
        style="width: 300px"
        class="q-ml-md"
        dense
        v-model="input_type"
        :options="items_aux"
        :rules="nameRules"
        label="Item"
        required
      >
      </q-select>
    </div>

    <q-space />

    <q-dialog v-model="bar2" persistent full-width>
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

    <q-dialog v-model="bar3" persistent full-width>
      <q-card>
        <q-card-section class="row items-right q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-table
          class="col fixed-header"
          title="Orders History"
          :rows="ordersList"
          :columns="columns3"
          dense
          :rows-per-page-options="[5, 10, 15]"
          row-key="id"
        />
      </q-card>
    </q-dialog>

    <q-space />

    <q-dialog v-model="bar4" persistent full-width>
      <q-card>
        <q-card-section class="row items-right q-pb-none">
          <q-btn icon="close" flat round dense v-close-popup />
        </q-card-section>
        <q-table
          class="col fixed-header"
          title="Budget History"
          :rows="budgetList"
          :columns="columns4"
          dense
          :rows-per-page-options="[5, 10, 15]"
          row-key="id"
        />
      </q-card>
    </q-dialog>

    <q-dialog v-model="prompt" persistent>
      <q-card style="min-width: 350px">
        <q-form @submit.prevent="addService(s_form)">
          <q-card-section>
            <div class="text-h6">Add Service</div>
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
          </q-card-section>
          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn
              v-if="
                s_form.startDate != '' &&
                s_form.observations != '' &&
                s_form.status != '' &&
                s_form.clientId != '' &&
                s_form.type != ''
              "
              flat
              label="Add Service"
              type="submit"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </q-dialog>

    <div class="q-pa-md q-mt-sm">
      <q-table
        title="All Services Register"
        :rows="serviceList"
        :columns="columns"
        dense
        :rows-per-page-options="[50, 75, 100, 150, 200]"
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
              <div class="row text-left q-mt-sm q-mb-sm">
                <q-btn
                  @click="
                    bar2 = true;
                    stack;
                    mapServicesHistory(props.row.ServiceId);
                  "
                  label="History"
                ></q-btn>
                <q-btn
                  @click="
                    bar3 = true;
                    stack;
                    mapServicesOrders(props.row.ServiceId);
                  "
                  label="Orders"
                ></q-btn>
                <q-btn
                  @click="
                    bar4 = true;
                    stack;
                    mapServicesBudgets(props.row.ServiceId);
                  "
                  label="Budgets"
                ></q-btn>

                <q-btn
                  v-if="props.row.State != 'done'"
                  text-color="black"
                  style="margin-left: auto"
                  stack
                  glossy
                  color="yellow"
                  icon="paid"
                  @click="
                    change_state(
                      props.row.ServiceId,
                      user.user_metadata.emp_id,
                      'to_budget'
                    )
                  "
                ></q-btn>
                <q-btn
                  v-if="props.row.State != 'done'"
                  text-color="black"
                  class="q-ml-sm"
                  stack
                  glossy
                  color="blue"
                  icon="hourglass_bottom"
                  @click="
                    change_state(
                      props.row.ServiceId,
                      user.user_metadata.emp_id,
                      'to_budget_approval'
                    )
                  "
                ></q-btn>
                <q-btn
                  v-if="props.row.State != 'done'"
                  text-color="black"
                  class="q-ml-sm"
                  stack
                  glossy
                  color="orange"
                  icon="local_shipping"
                  @click="
                    change_state(
                      props.row.ServiceId,
                      user.user_metadata.emp_id,
                      'waiting_order'
                    )
                  "
                ></q-btn>
                <q-btn
                  v-if="props.row.State != 'done'"
                  text-color="black"
                  class="q-ml-sm"
                  stack
                  glossy
                  color="red"
                  icon="pending"
                  @click="
                    change_state(
                      props.row.ServiceId,
                      user.user_metadata.emp_id,
                      'to_execute'
                    )
                  "
                ></q-btn>
                <q-btn
                  v-if="props.row.State != 'done'"
                  text-color="black"
                  class="q-ml-sm"
                  stack
                  glossy
                  color="green"
                  icon="fact_check"
                  @click="
                    change_state(
                      props.row.ServiceId,
                      user.user_metadata.emp_id,
                      'to_pickup'
                    )
                  "
                ></q-btn>
                <q-btn
                  v-if="props.row.State != 'done'"
                  text-color="black"
                  class="q-ml-sm"
                  stack
                  glossy
                  color="green"
                  icon="verified"
                  @click="
                    change_state(
                      props.row.ServiceId,
                      user.user_metadata.emp_id,
                      'done'
                    )
                  "
                ></q-btn>
              </div>
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useNotify from "src/composables/UseNotify";
import useApi from "src/composables/UseApi";
import useAuthUser from "src/composables/UseAuthUser";
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
const columns3 = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "orderid",
    align: "center",
    label: "Order ID",
    field: "OrderId",
    sortable: true,
  },
  {
    name: "itemid",
    align: "center",
    label: "Item ID",
    field: "ItemId",
    sortable: true,
  },
  {
    name: "orderdate",
    align: "center",
    label: "Order Date",
    field: "OrderDate",
    sortable: true,
  },
  {
    name: "orderqty",
    align: "center",
    label: "Order Qty",
    field: "OrderQty",
    sortable: true,
  },
  {
    name: "orderqty",
    align: "center",
    label: "Order Amount",
    field: "OrderAmount",
    sortable: true,
  },
  {
    name: "orderstatus",
    align: "center",
    label: "Order Status",
    field: "OrderStatus",
    sortable: true,
  },
  {
    name: "recpdate",
    align: "center",
    label: "Reception Date",
    field: "ReceptionDate",
    sortable: true,
  },
];
const columns4 = [
  {
    name: "id",
    label: "ID",
    align: "left",
    field: "Id",
    sortable: true,
  },
  {
    name: "cli_id",
    align: "center",
    label: "Service ID",
    field: "ServiceId",
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
    name: "report",
    align: "center",
    label: "Report",
    field: "Report",
    sortable: true,
  },
];
export default defineComponent({
  name: "ServicesPage",

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
    const ordersList = ref([]);
    const budgetList = ref([]);
    const { user } = useAuthUser();
    const {
      getServiceHistoryByID,
      getServiceList,
      postService,
      service_state,
      getServiceList_by_char,
      getServiceOrdersByID,
      getServiceBudgetsByID,
    } = useApi();

    // Reactive form for client data inputs
    const s_form = ref({
      typeId: "",
      type: "",
      clientId: "",
      status: "",
      state: "to_budget",
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

    const mapServices_by_char = async (type, value) => {
      try {
        serviceList.value = await getServiceList_by_char(type, value);
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

    const mapServicesOrders = async (service_id) => {
      console.log(service_id);
      try {
        ordersList.value = await getServiceOrdersByID(service_id);
      } catch (error) {
        notifyError(error);
      }
    };

    const mapServicesBudgets = async (service_id) => {
      console.log(service_id);
      try {
        budgetList.value = await getServiceBudgetsByID(service_id);
      } catch (error) {
        notifyError(error);
      }
    };

    const addService = async (s_form) => {
      s_form.endDate = "2000-01-01";
      if (s_form.type == "Reparação Equip") s_form.typeId = 1;
      else if (s_form.type == "Diagnóstico") s_form.typeId = 2;
      else if (s_form.type == "Manutenção Equip") s_form.typeId = 3;
      else if (s_form.type == "Montagem Equip") s_form.typeId = 4;

      if (s_form.status == "Active") s_form.status = 1;
      else if (s_form.status == "Inactive") s_form.status = 0;
      try {
        console.log(s_form);
        const status = await postService(s_form);
        if (status == 200) {
          serviceList.value = await getServiceList();
          notifySuccess("New Service Registered!");
        } else notifyError("Error in Register New Service!");
      } catch (error) {
        notifyError("Internal Error Aplication");
      }
    };

    const change_state = async (service_id, emp_id, state) => {
      console.log(service_id, state);
      try {
        const code_resp = await service_state(service_id, emp_id, state);
        if (code_resp == 200) {
          serviceList.value = await getServiceList();
          notifySuccess("state updated!");
        } else {
          notifyError("Error in change state");
        }
      } catch (error) {
        console.log(error);
      }
    };

    // When view is mounted, call methods below
    onMounted(() => {
      mapServices();
    });
    return {
      user,
      mapServices,
      mapServices_by_char,
      mapServicesHistory,
      mapServicesOrders,
      mapServicesBudgets,
      s_form,
      columns,
      filter: ref([]),
      serviceList,
      historyList,
      ordersList,
      budgetList,
      addService,
      change_state,
      bar2: ref(false),
      bar3: ref(false),
      bar4: ref(false),
      columns2,
      columns3,
      columns4,
      items: [
        "Manutenção Equip",
        "Reparação Equip",
        "Diagonóstico",
        "Montagem Equip",
      ],
      items_2: ["Active", "Inactive"],
      items_aux: [
        "Id",
        "Client Id",
        "Status",
        "Start Date",
        "End Date",
        "Type",
        "State",
      ],
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
      prompt: ref(false),
      MyPagination: {
        rowsPerPage: 50,
      },
    };
  },
  watch: {
    input(value) {
      if (value != "") {
        this.mapServices_by_char(this.input_type, value);
      } else {
        this.mapServices();
      }
    },
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
