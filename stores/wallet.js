import { defineStore } from "pinia";

export const useWalletStore = defineStore("wallet", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const available_balance = ref(0);

  const getWallet = async () => {
    await fetchData({
      url: `user/show-wallet`,
      onSuccess: () => {
        available_balance.value = resultData.value.available_balance;
      },
    });
  };
  const chargeWallet = async () => {
    await fetchData({
      url: `user/charge-wallet`,
      onSuccess: () => {
        available_balance.value = resultData.value.available_balance;
      },
    });
  };

  return {
    //STATE
    available_balance,
    //ACTIONS
    getWallet,
    chargeWallet,
  };
});
