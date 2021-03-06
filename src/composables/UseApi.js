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

  const getClientList_by_char = async (type, value) => {
    try {
      const response = await axios.get(process.env.API_M3_GCBC, {
        params: { type, value },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getServiceList_by_char = async (type, value) => {
    try {
      const response = await axios.get(process.env.API_M3_GSBC, {
        params: { type, value },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getSupplierList_by_char = async (type, value) => {
    try {
      const response = await axios.get(process.env.API_M3_GSUC, {
        params: { type, value },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getStaffList_by_char = async (type, value) => {
    try {
      const response = await axios.get(process.env.API_M3_GSTC, {
        params: { type, value },
      });
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
      return response.data;
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

  const service_state = async (service_id, employee_id, state) => {
    try {
      const response = await axios.get(process.env.API_M3_USST, {
        params: { service_id, employee_id, state },
      });
      return response.status;
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
  const getServiceList_by_username = async (username) => {
    try {
      const response = await axios.get(process.env.API_M3_GSBCI, {
        params: { username },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getBudgetList_by_username = async (service_id) => {
    try {
      const response = await axios.get(process.env.API_M3_GBLBSI, {
        params: { service_id },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getServiceOrdersByID = async (service_id) => {
    try {
      const response = await axios.get(process.env.API_M3_GOBS, {
        params: { service_id },
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  };

  const getServiceBudgetsByID = async (service_id) => {
    try {
      const response = await axios.get(process.env.API_M3_GBBS, {
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
    getClientList_by_char,
    getServiceList_by_char,
    getSupplierList_by_char,
    getStaffList_by_char,
    getServiceList,
    service_state,
    getStaffList,
    getSupplierList,
    postClient,
    postService,
    postSupplier,
    postStaff,
    getServiceByFilter,
    getServiceHistoryByID,
    getServiceList_by_username,
    getBudgetList_by_username,
    getServiceOrdersByID,
    getServiceBudgetsByID,
  };
}
