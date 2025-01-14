import { defineStore } from "pinia";

export const useInstantStore = defineStore("instant", () => {
  const { fetchData, loading, resMsg, resultData } = useFetchData();
  // state

  const pagination = ref({
    total_items: 0,
    per_page: 10,
    total_pages: 1,
    current_page: 1,
  });
  const localePath = useLocalePath();
  const router = useRouter();
  const visible_success = ref(false);
  const list_spare_parts = ref([]);
  const list_orders = ref([]);
  const order_details_obj = ref({});
  const visible_reject = ref(false);
  const visible_Extra = ref(false);

  const getSpareParts = async () => {
    await fetchData({
      url: `user/orders/spare-parts`,
      onSuccess: () => {
        list_spare_parts.value = resultData.value;
      },
    });
  };

  const createInstant = async (payload) => {
    await fetchData({
      url: `user/create-instant-maintenance-order`,
      method: "post",
      body: payload,
      getSuccess: true,
      headers: {
        "content-type": "multipart/form-data",
      },
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
      url: `user/orders/instant-maintenance`,
      params,
      onSuccess: () => {
        list_orders.value = resultData?.value?.data || []; // تحديث قائمة الطلبات

        pagination.value = resultData?.value?.pagination || {}; // تحديث بيانات الترقيم
        pagination.value.current_page = page;
      },
      onError: () => {
        console.error("Error fetching orders");
      },
    });
  };
  const orderDetails = async (id) => {
    await fetchData({
      url: `user/order-details/instant-maintenance/${id}`,

      onSuccess: () => {
        order_details_obj.value = resultData.value;
      },
    });
  };
  const orderReject = async (payload) => {
    await fetchData({
      url: `user/orders/reject-instant-maintenance-offer`,
      method: "post",
      body: payload,
      onSuccess: () => {
        visible_reject.value = true;
        setTimeout(() => {
          visible_reject.value = false;
        }, 1000);
      },
      onError: () => {
        visible_reject.value = false;
      },
    });
  };
  const orderAccept = async (payload) => {
    await fetchData({
      url: `user/orders/accept-instant-maintenance-offer`,
      method: "post",
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        getOrder();
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

  const acceptExtra = async (payload) => {
    await fetchData({
      url: `user/orders/accept-extra-service`,
      method: "post",
      body: payload,
    });
  };
  const payExtra = async (payload) => {
    await fetchData({
      url: `user/orders/pay-extra-service`,
      method: "post",
      body: payload,

      onSuccess: () => {
        visible_Extra.value = true;
        setTimeout(() => {
          visible_Extra.value = false;
        }, 1000);
      },

      onError: () => {
        visible_Extra.value = false;
      },
    });
  };
  const rejectExtra = async (payload) => {
    await fetchData({
      url: `user/orders/reject-extra-service`,
      method: "post",
      body: payload,

      onError: () => {
        visible_Extra.value = false;
      },
    });
  };

  return {
    //STATE
    loading,

    resMsg,
    visible_success,
    list_spare_parts,
    list_orders,
    order_details_obj,
    visible_reject,
    visible_Extra,
    pagination,
    //ACTIONS
    getSpareParts,
    rejectExtra,
    acceptExtra,
    createInstant,
    getOrder,
    orderDetails,
    orderAccept,
    orderReject,
    orderPay,
    payExtra,
  };
});
