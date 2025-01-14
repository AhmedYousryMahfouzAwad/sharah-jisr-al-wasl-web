import { defineStore } from "pinia";
export const useNotification = defineStore("notification", () => {
  //STATE
  const { fetchData, resultData, loading } = useFetchData();
  const count = ref(0);
  const list_notifications = ref(null);
  const the_notify = ref(false);
  const pagination = ref({
    total_items: 0,
    per_page: 10,
    total_pages: 1,
    current_page: 1,
  });

  //getNotification
  const getNotification = async (page = 1) => {
    await fetchData({
      url: `user/notifications`,
      params: {
        page: page,
      },
      onSuccess: () => {
        list_notifications.value = resultData.value?.notifications.data;
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = page;
      },
    });
  };
  //removeNotification
  const removeNotification = async (id) => {
    await fetchData({
      url: `user/delete-notification/${id}`,

      onSuccess: () => {
        getNotification();
      },

      method: "delete",
      getSuccess: true,
    });
  };
  //removeAllNotification
  const removeAllNotification = async () => {
    await fetchData({
      url: `user/delete-notifications`,
      onSuccess: () => {
        getNotification();
      },
      method: "delete",
      getSuccess: true,
    });
  };

  //deviceNotification
  const deviceNotification = async (device_id, device_type) => {
    await fetchData({
      url: `user/device`,
      params: {
        device_id: 2,
        device_type: "web",
      },
      onSuccess: () => {
        the_notify.value = resultData.value?.is_notify;
      },
    });
  };
  //switchNotification
  const switchNotification = async (payload) => {
    await fetchData({
      url: `user/switch-notify`,
      onSuccess: () => {
        getNotification();
      },

      body: payload,
      method: "patch",
      getSuccess: true,
    });
  };

  //countNotification
  const countNotification = async () => {
    await fetchData({
      url: `user/count-notifications`,
      onSuccess: () => {
        count.value = resultData.value?.count;
      },
    });
  };

  return {
    //STATE
    list_notifications,
    count,
    loading,
    count,
    the_notify,
    pagination,
    //ACTIONS
    getNotification,
    removeNotification,
    removeAllNotification,
    countNotification,
    switchNotification,
    deviceNotification,
  };
});
