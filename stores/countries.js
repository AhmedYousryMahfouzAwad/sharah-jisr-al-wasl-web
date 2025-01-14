import { defineStore } from "pinia";
export const useCountries = defineStore("countries", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const list_countries = ref([]);
  const country = ref(null);

  const getCountries = async () => {
    await fetchData({
      url: `user/countries`,
      onSuccess: () => {
        list_countries.value = resultData.value;
      },
    });
  };

  return {
    //STATE
    list_countries,
    country,

    //ACTIONS
    getCountries,
  };
});
