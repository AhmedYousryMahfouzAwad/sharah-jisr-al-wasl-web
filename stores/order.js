import { defineStore } from "pinia";
export const useCreateOrderStore = defineStore("createOrder", () => {
  const { fetchData, loading, resMsg, resultData } = useFetchData();
  const localePath = useLocalePath();
  const router = useRouter();
  const visible_success = ref(false);
  const list_orders = ref([]);
  const order_details_list = ref([]);
  const products = ref([]);
  const order_details_obj = ref({});
  const pagination = ref({
    total_items: 0,
    per_page: 10,
    total_pages: 1,
    current_page: 1,
  });

  const createOrder = async (payload) => {
    await fetchData({
      url: `user/create-order`,
      method: "post",
      body: payload,

      onSuccess: () => {
        visible_success.value = true;
        setTimeout(() => {
          router.push(localePath("index"));
          visible_success.value = false;
        }, 1000);
      },
      onError: () => {
        visible_success.value = false;
      },
    });
  };
  const getOrder = async (status = null, page = 1) => {
    await fetchData({
      url: `user/orders/e-commerce`,
      params: {
        status: status,
        page: page,
      },
      onSuccess: () => {
        list_orders.value = resultData?.value?.data || [];
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = page;
      },
      onError: () => {
        console.error("Error fetching orders");
      },
    });
  };

  const orderDetails = async (id) => {
    await fetchData({
      url: `user/order-details/e-commerce/${id}`,
      onSuccess: () => {
        order_details_obj.value = resultData.value;
        order_details_list.value = resultData.value.items;
      },
    });
  };
  const reOrder = async (payload) => {
    await fetchData({
      url: `user/orders/re-order`,
      method: "post",
      body: payload,

      getSuccess: true,
    });
  };
  const orderEvaluation = async (id) => {
    await fetchData({
      url: `user/orders/get-order-products/${id}`,
      onSuccess: () => {
        products.value = resultData.value;
      },
    });
  };

  return {
    //STATE
    loading,
    visible_success,
    list_orders,
    resMsg,
    order_details_obj,
    order_details_list,
    products,
    pagination,

    //ACTIONS
    createOrder,
    orderDetails,
    getOrder,
    reOrder,
    orderEvaluation,
  };
});
