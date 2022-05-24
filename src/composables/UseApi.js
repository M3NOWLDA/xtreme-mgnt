export default function useApi() {
  const axios = require("axios");

  const getClientList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GCLI);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getServiceList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GSER);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getStaffList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GSTF);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getSupplierList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GSUP);
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const postClient = async (cliform) => {
    try {
      const resp = await axios.post(process.env.API_M3_NCLI, cliform);
    } catch (error) {
      console.log(error);
    }
  };

  const postService = async (s_form) => {
    try {
      const response = await axios.post(process.env.API_M3_NSER, s_form);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const postSupplier = async (sup_form) => {
    try {
      const response = await axios.post(process.env.API_M3_NSUP, sup_form);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };
  const postStaff = async (st_form) => {
    try {
      const response = await axios.post(process.env.API_M3_NSTF, st_form);
      return response.status;
    } catch (error) {
      console.log(error);
    }
  };

  const getServiceByFilter = async (filter) => {
    try {
      const response = await axios.get(process.env.API_M3_SBF, {
        params: { filter },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getServiceHistoryByID = async (service_id) => {
    try {
      const response = await axios.get(process.env.API_M3_SHBI, {
        params: { service_id },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  return {
    getClientList,
    getServiceList,
    getStaffList,
    getSupplierList,
    postClient,
    postService,
    postSupplier,
    postStaff,
    getServiceByFilter,
    getServiceHistoryByID,
  };
}
