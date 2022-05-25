<template>
  <q-page padding>
    <div class="row q-ml-auto" style="height: 30px" >
        <q-btn
          color="primary"
          style="height: 10%"
          label="Add New Supplier"
          @click="prompt = true"
        ></q-btn>
        <label class="q-ml-xl q-pl-xl q-mt-sm " style="margin-left: 31% ; font-size: 17px " dense>Search Supplier</label>
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
        <q-form @submit.prevent="addSupplier(sup_form)">
            <q-card-section>
              <div class="text-h6">Add Supplier</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.businessName"
                type="text"
                label="Business Name"
                :rules="nameRules"
              ></q-input>
              <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.businessType"
                type="text"
                label="Business type"
                :rules="nameRules"
              ></q-input>
              <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.nif"
                type="number"
                label="NIF"
                :rules="nameRules"
              ></q-input>
              <q-input
                dense
                clearable
                v-model="sup_form.addressline"
                type="text"
                label="Address Line"
                :rules="nameRules"
              >
              </q-input>
              <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.zipcode"
                type="text"
                label="ZIP Code"
                :rules="nameRules"
              ></q-input>
              <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.city"
                type="text"
                label="City"
                :rules="nameRules"
              ></q-input>
              <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.district"
                type="text"
                label="State"
                :rules="nameRules"
              ></q-input>
              <q-input
              autofocus
              dense
              clearable
              v-model="sup_form.country"
              type="text"
              label="Country"
              :rules="nameRules"
            ></q-input>
            <q-input
                autofocus
                dense
                clearable
                v-model="sup_form.deliveryAverage"
                type="number"
                label="Deliverty Average"
                :rules="nameRules"
              ></q-input>
          </q-card-section>

          <q-card-actions align="right" class="text-primary">
            <q-btn flat label="Cancel" v-close-popup />
            <q-btn flat label="Add Supplier" type="submit" />
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
        title="Suppliers"
        :rows="supplier_list"
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
    field: "SupplierId",
    sortable: true,
  },
  {
    name: "business_name",
    align: "center",
    label: "Business Name",
    field: "BusinessName",
    sortable: true,
  },
    {
    name: "business_type",
    align: "center",
    label: "Business Type",
    field: "BusinessType",
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
    name: "city",
    align: "center",
    label: "City",
    field: "City",
    sortable: true,
  },
    {
    name: "DeliveryAverage",
    align: "center",
    label: "Delivery Average",
    field: "DeliveryAverage",
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
    const supplier_list = ref([]);
    const { getSupplierList, postSupplier, getSupplierList_by_char } = useApi();

    const sup_form = ref({
      businessName: "",
      businessType: "",
      nif: "",
      addressline: "",
      zipcode: "",
      city: "",
      district: "",
      country: "",
      deliveryAverage: ""
    });
    const mapSupplier = async () => {
      try {
        supplier_list.value = await getSupplierList();
        if (supplier_list.value != null) notifySuccess("Clients Loaded");
      } catch (error) {
        notifyError(error);
      }
    };

    const mapSupplier_by_char = async (type, value) => {
      try {
        supplier_list.value = await getSupplierList_by_char(type, value);
      } catch (error) {
        notifyError(error);
      }
    };

    const addSupplier = async (sup_form) =>{
      try {
        console.log(sup_form)
        await postSupplier(sup_form)
        supplier_list.value = await getSupplierList()
        notifySuccess("Supplier Added!")
      } catch (error) {
        console.log(error)
      }
    }
    // When view is mounted, call methods below
    onMounted(() => {
      mapSupplier();
    });
    return {
      mapSupplier,
      mapSupplier_by_char,
      sup_form,
      columns,
      addSupplier,
      supplier_list,
      nameRules: [(val) => (val && val.length > 0) || "Filed is Required!"],
      items:[
        'Id', 'Business Name', 'Business Type', 'Nif', 'Address', 'City', 'Delivery Average'
      ],
      prompt: ref(false),
      secondDialog: ref(false),
    };
  },
  watch:{
    input(value){
      if(value != ""){
        this.mapSupplier_by_char(this.input_type , value)
      }else{
        this.mapSupplier()
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
