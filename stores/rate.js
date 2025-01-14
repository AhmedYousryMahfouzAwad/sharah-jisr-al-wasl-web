import { defineStore } from "pinia";

export const useRateStore = defineStore("rate", () => {
  //STATE
  const { fetchData, resultData, resMsg } = useFetchData();

  const getRate = async (payload) => {
    await fetchData({
      url: `user/rate-products`,
      method: "post",
      body: payload,
    });
  };
  const getRateEmployee = async (payload) => {
    await fetchData({
      url: `user/rate-employee`,
      method: "post",
      body: payload,
    });
  };

  return {
    //STATE
    resMsg,

    //ACTIONS
    getRate,
    getRateEmployee,
  };
});
