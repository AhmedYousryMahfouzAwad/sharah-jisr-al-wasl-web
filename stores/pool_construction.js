import { defineStore } from "pinia";

export const useBoolConstructionStore = defineStore("pool_construction", () => {
  const { fetchData, loading, resMsg, resultData } = useFetchData();

  const pagination = ref({
    total_items: 0,
    per_page: 10,
    total_pages: 1,
    current_page: 1,
  });
  const localePath = useLocalePath();
  const router = useRouter();

  const list_color = ref([]);
  const list_images = ref([]);
  const visible_reject = ref(false);
  const loading_btn = ref(false);
  const list_orders = ref([]);
  const order_details_obj = ref({});
  const visible_success = ref(false);
  const status = [
    1, // wait_for_price
    2, // wait_payment
    3, // new
    4, // going_to_client
    5, // arrived
    6, // visit_finished
    7, // cancelled
    8, // refused
    9, // completed
    10, // preparing
    11, // delivering
    12, // delivered
  ];

  const statuses = ref([]);
  const getDesignImages = async () => {
    await fetchData({
      url: `user/designs`,

      onSuccess: () => {
        list_color.value = resultData.value || [];
      },
    });
  };
  const getDesignDetails = async (id) => {
    await fetchData({
      url: `user/design-images/${id}`,

      onSuccess: () => {
        list_images.value = resultData.value || [];

        visible_success.value = true;
        setTimeout(() => {
          visible_success.value = false;
        }, 1000);
      },
    });
  };
  const createConstruction = async (payload) => {
    await fetchData({
      url: `user/create-pool-construction-order`,
      method: "post",
      body: payload,
      getSuccess: true,
    });
  };

  const getOrder = async (statuses = [], page = 1) => {
    const params = {
      page, // استخدم الصفحة كما هي
    };

    statuses.forEach((status, index) => {
      params[`status[${index}]`] = status;
    });

    await fetchData({
      url: `user/orders/pool-construction`,
      params,
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
      url: `user/order-details/pool-construction/${id}`,
      method: "get",
      onSuccess: () => {
        order_details_obj.value = resultData.value;
      },
    });
  };
  const orderReject = async (payload) => {
    await fetchData({
      url: `user/orders/reject-pool-construction-offer`,
      method: "post",
      body: payload,
      onSuccess: () => {
        visible_reject.value = true;
        setTimeout(() => {
          visible_reject.value = false;
          router.push(localePath("index"));
        }, 1000);
      },
      onError: () => {
        visible_reject.value = false;
      },
    });
  };
  const orderAccept = async (payload) => {
    await fetchData({
      url: `user/orders/accept-pool-construction-offer`,
      method: "post",
      body: payload,
      onSuccess: () => {
        loading.value = true;
        setTimeout(() => {
          router.push(localePath("index"));
        }, 1000);
      },
    });
  };

  const orderPay = async (payload) => {
    await fetchData({
      url: `user/orders/pay`,
      method: "post",
      body: payload,

      onSuccess: () => {
        visible_reject.value = true;
        setTimeout(() => {
          visible_reject.value = false;
        }, 1500);
      },
      onError: () => {
        visible_reject.value = false;
      },
    });
  };

  return {
    //STATE
    loading,
    list_color,
    list_images,
    resMsg,
    list_orders,
    order_details_obj,
    status,
    statuses,
    visible_reject,
    loading_btn,
    visible_success,
    pagination,
    //ACTIONS
    orderPay,
    orderDetails,
    orderAccept,
    getDesignImages,
    createConstruction,
    getOrder,
    getDesignDetails,
    orderReject,
  };
});
