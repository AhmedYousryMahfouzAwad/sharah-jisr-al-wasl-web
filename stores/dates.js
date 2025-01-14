import { defineStore } from "pinia";

export const useDatesStore = defineStore("dates", () => {
  const { fetchData, resultData, loading, pagination, resMsg } = useFetchData();

  // State
  const selectedDates = ref([]);

  // Actions
  const setSelectedDates = (dates) => {
    selectedDates.value = dates;
    console.log(selectedDates.value);
  };
  
  // const logOut = async () => {
  //   await fetchData({
  //     url: `user/sign-out`,
  //     method: "post",
  //     getSuccess: true,
  //     onSuccess: () => {
  //       logout();
  //     },
  //   });
  // };
  return {
    selectedDates,
    loading,
    setSelectedDates,
  };
});
