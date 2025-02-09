import { defineStore } from "pinia";
import sa from "@/public/img/sa.png";

export const useCountries = defineStore("countries", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const list_countries = ref([]);
  const cities = ref([]);

  const country = ref({
    key: "+966", // Default country code for Saudi Arabia
    image: sa, // Correct flag image for Saudi Arabia
    iso: "SA", // ISO code for Saudi Arabia
  });
  const getCountries = async () => {
    await fetchData({
      url: `api/countries`,
      onSuccess: () => {
        list_countries.value = resultData.value;
      },
    });
  };

  const getCities = async () => {
    await fetchData({
      url: `api/cities`,
      method: "get",
      onSuccess: () => {
        cities.value = resultData.value;
      },
    });
  };

  return {
    //STATE
    list_countries,
    country,
    cities,

    //ACTIONS
    getCountries,
    getCities,
  };
});
