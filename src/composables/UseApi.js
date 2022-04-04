export default function useApi() {
  const axios = require("axios");

  const getClientList = async () => {
    try {
      const response = await axios.get(process.env.API_VNA_GCLI);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  return {
    getClientList,
  };
}
