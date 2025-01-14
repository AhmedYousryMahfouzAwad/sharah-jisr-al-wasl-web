import { defineStore } from "pinia";
export const useOrderPackageStore = defineStore("packages", () => {
  const { fetchData, loading, resMsg, resultData } = useFetchData();
  const localePath = useLocalePath();
  const router = useRouter();
  const visible_success = ref(false);
  const visible_price_package = ref(false);
  const visible_accept = ref(false);

  const list_packages_orders = ref([]);
  // const list_payment = ref([]);
  const order_id = ref("");
  const remain_visits = ref("");
  const list_orders = ref([]);
  const order_details_obj = ref({});

  const pagination = ref({
    total_items: 0,
    per_page: 10,
    total_pages: 1,
    current_page: 1,
  });
  const getOrder = async (statuses = [], page = 1) => {
    const params = {
      page, // استخدم الصفحة كما هي
    };

    statuses.forEach((status, index) => {
      params[`status[${index}]`] = status;
    });

    await fetchData({
      url: `user/orders/package`,
      params,
      onSuccess: () => {
        list_orders.value = resultData?.value?.data;
        pagination.value = resultData?.value?.pagination;
        pagination.value.current_page = page;
      },
      onError: () => {
        console.error("Error fetching orders");
      },
    });
  };
  const orderDetails = async (id) => {
    await fetchData({
      url: `user/order-details/package/${id}`,
      onSuccess: () => {
        order_details_obj.value = resultData.value;
      },
    });
  };
  const getAllPackages = async () => {
    await fetchData({
      url: `user/all-packages`,
      onSuccess: () => {
        list_packages_orders.value = resultData.value;
      },
    });
  };

  // const getPayTypes = async () => {
  //   await fetchData({
  //     url: `user/pay-types`,
  //     onSuccess: () => {
  //       list_payment.value = resultData.value;
  //     },
  //   });
  // };
  const createPayTypes = async (payload) => {
    await fetchData({
      url: `user/create-package-order`,

      body: payload,
      method: "post",

      onSuccess: async () => {
        visible_accept.value = true;
        order_id.value = resultData.value.id;
        remain_visits.value = resultData.value.remain_visits;
      },
      onError: () => {
        visible_price_package.value = true;
        setTimeout(() => {
          router.push(localePath("index"));
          visible_price_package.value = false;
        }, 1500);
      },
    });
  };

  const createVisits = async (payload) => {
    await fetchData({
      url: `user/package-visits`,
      getSuccess: true,
      body: payload,
      method: "post",

      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("index"));
        }, 1500);
      },
    });
  };

  return {
    //STATE
    loading,
    visible_success,
    list_packages_orders,
    visible_price_package,
    // list_payment,
    order_id,
    list_orders,
    order_details_obj,
    remain_visits,
    pagination,
    visible_accept,
    resMsg,

    //ACTIONS
    getAllPackages,
    // getPayTypes,
    createPayTypes,
    createVisits,
    getOrder,
    orderDetails,
  };
});
