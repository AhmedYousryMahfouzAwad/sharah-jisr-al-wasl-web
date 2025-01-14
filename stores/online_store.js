import { defineStore } from "pinia";
export const useOnlineStore = defineStore("online", () => {
  //STATE
  const { fetchData, resultData } = useFetchData();
  const subCategories = ref([]);
  const products = ref([]);
  const route = useRoute();
  const pagination = ref({
    total_items: 0,
    per_page: 10,
    current_page: 1,
  });
  const getSubCategories = async () => {
    await fetchData({
      url: `user/subcategories`,
      onSuccess: () => {
        subCategories.value = resultData.value;
      },
    });
  };
  const getCategoriesProducts = async (id, page) => {
    await fetchData({
      url: `user/products/${id}`,
      params: {
        page,
      },
      onSuccess: () => {
        products.value = resultData.value.data;
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = page;
      },
    });
  };
  const getProductsFilter = async (id, rate) => {
    await fetchData({
      url: `user/products/${id}`,
      params: {
        rate,
      },
      onSuccess: () => {
        products.value = resultData.value.data;
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = page;
      },
    });
  };
  return {
    //STATE
    subCategories,
    products,
    pagination,
    //ACTIONS
    getSubCategories,
    getCategoriesProducts,
    getProductsFilter,
  };
});
