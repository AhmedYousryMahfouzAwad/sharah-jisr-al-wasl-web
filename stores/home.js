import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const categories_list = ref([]);
  const sliders_list = ref([]);
  const home = async () => {
    await fetchData({
      url: `user/home`,
      onSuccess: () => {
        categories_list.value = resultData.value.categories;
        sliders_list.value = resultData.value.sliders;
      },
    });
  };
  return {
    //STATE
    categories_list,
    sliders_list,

    //ACTIONS
    home,
  };
});
