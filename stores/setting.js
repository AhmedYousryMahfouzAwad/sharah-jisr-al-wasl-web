import { defineStore } from "pinia";

export const useSettingStore = defineStore("setting", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const about_list = ref([]);
  const terms_list = ref([]);
  const getAbout = async () => {
    await fetchData({
      url: `user/about`,
      onSuccess: () => {
        about_list.value = resultData.value;
      },
    });
  };
  const getTerms = async () => {
    await fetchData({
      url: `user/terms`,
      onSuccess: () => {
        terms_list.value = resultData.value;
      },
    });
  };
  return {
    //STATE
    about_list,
    terms_list,

    //ACTIONS
    getAbout,
    getTerms,
  };
});
