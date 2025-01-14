import { defineStore } from "pinia";

export const usePackageStore = defineStore("package", () => {
  //STATE
  const { fetchData, resultData, loading } = useFetchData();
  const list_packages = ref([]);
  const visible = ref(false);
  const visible_sure_delete = ref(false);

  const getPackages = async () => {
    await fetchData({
      url: `user/packages`,
      onSuccess: () => {
        list_packages.value = resultData.value;
      },
    });
  };
  const deleteVisit = async (id) => {
    await fetchData({
      url: `user/visit/${id}`,
      method: "delete",
      // getSuccess: true,

      onSuccess: () => {
        getPackages();
      },
    });
  };

  const deletePackage = async (id) => {
    await fetchData({
      url: `user/packages/${id}`,
      method: "delete",
      onSuccess: () => {
        getPackages();
      },
    });
  };

  return {
    //STATE
    list_packages,
    loading,
    visible,
    visible_sure_delete,
    //ACTIONS
    getPackages,
    deleteVisit,
    deletePackage,
  };
});
