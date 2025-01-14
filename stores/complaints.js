import { defineStore } from "pinia";

export const useComplaintStore = defineStore("complaints", () => {
  //STATE
  const { fetchData, resultData, loading } = useFetchData();
  const complaints_list = ref([]);
  const complaint_show = ref({});
  const images = ref([]);
  const message = ref("");

  //router
  const localePath = useLocalePath();
  const router = useRouter();

  //ACTIONS
  const getComplaints = async () => {
    await fetchData({
      url: `user/complaints`,
      onSuccess: () => {
        complaints_list.value = resultData.value;
      },
    });
  };
  const getComplaintShow = async (id) => {
    await fetchData({
      url: `user/complaints-show/${id}`,
      onSuccess: () => {
        complaint_show.value = resultData.value;
        images.value = resultData.value.images;
      },
    });
  };
  const addComplaint = async (payload) => {
    await fetchData({
      url: `user/new-complaint`,
      method: "post",
      body: payload,
      headers: {
        "content-type": "multipart/form-data",
      },
      getSuccess: true,
      onSuccess: () => {
        router.push(localePath("/more/complaints_inquiries"));
        getComplaints();
      },
    });
  };
  return {
    //STATE
    complaints_list,
    complaint_show,
    images,
    loading,
    message,
    //ACTIONS
    getComplaints,
    getComplaintShow,
    addComplaint,
  };
});
