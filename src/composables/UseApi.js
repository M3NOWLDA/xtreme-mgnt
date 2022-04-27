export default function useApi() {
  const axios = require("axios");

  const getClientList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GCLI);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  };

  const getServiceList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GSER);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  };

  const getStaffList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GSTF);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  };

  const getSupplierList = async () => {
    try {
      const response = await axios.get(process.env.API_M3_GSUP);
      return response.data;
    } catch (error) {
      console.log(error);
      return error
    }
  };

  return {
    getClientList,
    getServiceList,
    getStaffList,
    getSupplierList
  };
}
