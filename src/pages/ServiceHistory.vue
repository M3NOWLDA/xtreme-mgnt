<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md q-gutter-sm">
      <q-btn
        label="BUTÃO PARA CONSULTAR HISTORICO"
        color="primary"
        @click="bar = true"
      />

      <q-dialog v-model="bar" persistent>
        <q-card>
          <q-bar>
            <div>SERVICE ID</div>

            <q-space />

            <q-btn dense flat icon="close" v-close-popup>
              <q-tooltip>Close</q-tooltip>
            </q-btn>
          </q-bar>

          <q-card-section>
            <div class="q-pa-md">
              <q-table
                grid
                title="Service History"
                :rows="rows"
                :columns="columns"
                row-key="name"
                :filter="filter"
                hide-header
              >
                <template v-slot:top-right>
                  <q-input
                    borderless
                    dense
                    debounce="300"
                    v-model="filter"
                    placeholder="Search"
                  >
                    <template v-slot:append>
                      <q-icon name="search" />
                    </template>
                  </q-input>
                </template>
              </q-table>
            </div>
          </q-card-section>
        </q-card>
      </q-dialog>
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
    name: "calories",
    align: "center",
    label: "Time Consumed",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
  },
];

export default {
  setup() {
    return {
      filter: ref(""),
      columns,
      rows,
      bar: ref(false),
    };
  },
};
</script>
