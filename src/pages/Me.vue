<template>
  <q-page class="flex flex-center">
    <div v-if="user">
      <div class="row justify-center">
        <h3>Welcome, {{ user.user_metadata.emp_id }}.</h3>
      </div>
      <div class="row justify-center">
        <div class="q-pa-md">
          <div class="q-gutter-y-xl">
            <q-card>
              <q-tabs
                v-model="tab"
                dense
                class="bg-grey-3"
                active-color="primary"
                indicator-color="primary"
                align="justify"
                narrow-indicator
              >
                <q-tab name="client_approval" label="Waiting for approval" />
                <q-tab name="todo" label="Pending to start" />
                <q-tab name="waitingorder" label="Waiting for delivery" />
                <q-tab name="budget" label="Waiting for budget" />
                <q-tab name="payment" label="Waiting for payment" />
                <q-tab name="done" label="Latest Done" />
              </q-tabs>

              <q-separator />

              <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="client_approval">
                  <div id="divTable" class="row q-mt-md">
                    <q-table
                      class="col fixed-header"
                      title=""
                      :rows="wfaList"
                      :columns="columns"
                      dense
                      :rows-per-page-options="[5, 10, 15, 20, 25]"
                      row-key="id"
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="todo">
                  <div id="divTable2" class="row q-mt-md">
                    <q-table
                      class="col fixed-header"
                      title=""
                      :rows="ptsList"
                      :columns="columnsPTS"
                      dense
                      :rows-per-page-options="[5, 10, 15, 20, 25]"
                      row-key="id"
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="waitingorder">
                  <div id="divTable3" class="row q-mt-md">
                    <q-table
                      class="col fixed-header"
                      title=""
                      :rows="wfdList"
                      :columns="columnsWFD"
                      dense
                      :rows-per-page-options="[5, 10, 15, 20, 25]"
                      row-key="id"
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="budget">
                  <div id="divTable4" class="row q-mt-md">
                    <q-table
                      class="col fixed-header"
                      title=""
                      :rows="wfbList"
                      :columns="columnsWFB"
                      dense
                      :rows-per-page-options="[5, 10, 15, 20, 25]"
                      row-key="id"
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="payment">
                  <div id="divTable6" class="row q-mt-md">
                    <q-table
                      class="col fixed-header"
                      title=""
                      :rows="wfpList"
                      :columns="columnsWFP"
                      dense
                      :rows-per-page-options="[5, 10, 15, 20, 25]"
                      row-key="id"
                    />
                  </div>
                </q-tab-panel>
                <q-tab-panel name="done">
                  <div id="divTable5" class="row q-mt-md">
                    <q-table
                      class="col fixed-header"
                      title=""
                      :rows="ldList"
                      :columns="columnsLD"
                      dense
                      :rows-per-page-options="[5, 10, 15, 20, 25]"
                      row-key="id"
                    />
                  </div>
                </q-tab-panel>
              </q-tab-panels>
            </q-card>
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="q-pa-md">
          <div class="q-gutter-y-md">
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
                name="suppliers"
                icon="archive"
                label="Suppliers"
                to="/suppliers"
                exact
              />
              <q-route-tab
                :ripple="false"
                name="staff"
                icon="work"
                label="Staff"
                to="/staff"
                exact
              />
            </q-tabs>
          </div>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import useAuthUser from "src/composables/UseAuthUser";
import useNotify from "src/composables/UseNotify";
import useApi from "src/composables/UseApi";

const columns = [
  {
    name: "id",
    label: "Service ID",
    align: "center",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "Client ID",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "Start Date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "Service Type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
];

const columnsPTS = [
  {
    name: "id",
    label: "Service ID",
    align: "center",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "Client ID",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "Start Date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "Service Type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
];

const columnsWFD = [
  {
    name: "id",
    label: "Service ID",
    align: "center",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "Client ID",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "Start Date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "Service Type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
];

const columnsWFB = [
  {
    name: "id",
    label: "Service ID",
    align: "center",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "Client ID",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "Start Date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "Service Type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
];

const columnsLD = [
  {
    name: "id",
    label: "Service ID",
    align: "center",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "Client ID",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "Start Date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "End Date",
    align: "center",
    label: "End Date",
    field: "EndDate",
    sortable: true,
  },
  {
    name: "Service Type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
];

const columnsWFP = [
  {
    name: "id",
    label: "Service ID",
    align: "center",
    field: "ServiceId",
    sortable: true,
  },
  {
    name: "Client ID",
    align: "center",
    label: "Client ID",
    field: "ClientId",
    sortable: true,
  },
  {
    name: "Start Date",
    align: "center",
    label: "Start Date",
    field: "StartDate",
    sortable: true,
  },
  {
    name: "Service Type",
    align: "center",
    label: "Type",
    field: "Type",
    sortable: true,
  },
];

export default defineComponent({
  name: "PageMe",
  setup() {
    const { user } = useAuthUser();
    const { notifyError, notifySuccess } = useNotify();
    const wfaList = ref([]);
    const ptsList = ref([]);
    const wfdList = ref([]);
    const wfbList = ref([]);
    const ldList = ref([]);
    const wfpList = ref([]);
    const { getServiceByFilter } = useApi();

    const mapWFA = async () => {
      try {
        wfaList.value = await getServiceByFilter("to_budget_approval");
      } catch (error) {
        console(error);
      }
    };
    const mapPTS = async () => {
      try {
        ptsList.value = await getServiceByFilter("to_execute");
      } catch (error) {
        console(error);
      }
    };
    const mapWFD = async () => {
      try {
        wfdList.value = await getServiceByFilter("waiting_order");
      } catch (error) {
        console(error);
      }
    };
    const mapWFB = async () => {
      try {
        wfbList.value = await getServiceByFilter("to_budget");
      } catch (error) {
        console(error);
      }
    };
    const mapLD = async () => {
      try {
        ldList.value = await getServiceByFilter("done");
      } catch (error) {
        console(error);
      }
    };
    const mapWFP = async () => {
      try {
        wfpList.value = await getServiceByFilter("waiting_payment");
      } catch (error) {
        console(error);
      }
    };
    onMounted(() => {
      mapWFA();
      mapPTS();
      mapWFD();
      mapWFB();
      mapLD();
      mapWFP();
    });
    return {
      user,
      tab: ref("mails"),
      columns,
      columnsPTS,
      columnsWFD,
      columnsWFB,
      columnsLD,
      columnsWFP,
      wfaList,
      ptsList,
      wfdList,
      wfbList,
      ldList,
      wfpList,
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
    };
  },
});
</script>
