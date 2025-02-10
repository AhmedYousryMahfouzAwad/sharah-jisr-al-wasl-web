import { defineStore } from "pinia";
import sa from "@/public/img/sa.png";

export const useCountries = defineStore("countries", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const list_countries = ref([]);
  const list_cities = ref([]);
  const list_categories = ref([]);

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
        list_cities.value = resultData.value;
      },
    });
  };
  const getCategories = async () => {
    await fetchData({
      url: `api/categories`,
      method: "get",
      onSuccess: () => {
        list_categories.value = resultData.value;
      },
    });
  };

  return {
    //STATE
    list_countries,
    country,
    list_cities,
    list_categories,

    //ACTIONS
    getCountries,
    getCities,
    getCategories,
  };
});
