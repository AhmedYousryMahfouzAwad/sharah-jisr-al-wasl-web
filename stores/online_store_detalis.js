import { defineStore } from "pinia";
export const useProductDetailsStore = defineStore("product_details", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();

  const products_details = ref({});

  const getProductDetails = async (id) => {
    await fetchData({
      url: `user/product-details/${id}`,
      onSuccess: () => {
        products_details.value = resultData.value;
        
      },
    });
  };

  return {
    //STATE

    products_details,

    //ACTIONS
    getProductDetails,
  };
});
