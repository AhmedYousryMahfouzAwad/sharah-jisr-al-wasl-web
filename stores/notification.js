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
  // const switchNotification = async (payload) => {
  //   await fetchData({
  //     url: `user/switch-notify`,
  //     onSuccess: () => {
  //       getNotification();
  //     },

  //     body: payload,
  //     method: "patch",
  //     getSuccess: true,
  //   });
  // };

  //countNotification
  const countNotification = async () => {
    console.log("55555555555");

    await fetchData({
      url: `api/notifications/count-notifications`,
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

    // removeAllNotification,
    countNotification,
    // switchNotification,
    deviceNotification,
  };
});
