import { defineStore } from "pinia";
export const useFavoritesStore = defineStore("favorites", () => {
  //STATE
  const { fetchData, resultData, resMsg } = useFetchData();

  const favorites = ref([]);
  const visible_sure_add_favorite = ref(false);
  const pagination = ref({
    total_items: 0,
    per_page: 10,
    total_pages: 1,
    current_page: 1,
  });
  // router
  const localePath = useLocalePath();
  const route = useRoute();

  // const getFavorites = async (page = 1) => {
  //   await fetchData({
  //     url: `api/user/favorites`,
  //     params: {
  //       page: page,
  //     },
  //     onSuccess: () => {
  //       favorites.value = resultData.value.data || [];
  //       pagination.value = resultData?.value?.pagination || {};
  //       pagination.value.current_page = page;
  //     },
  //   });
  // };

  const toggleFavorite = async () => {
    await fetchData({
      url: `api/user/favorites/toggle/${route.params.id}`,
      method: "post",
    });
  };

  const findIdx = (itemId) => {
    if (!favorites.value || !Array.isArray(favorites.value)) {
      return -1;
    }

    return favorites.value.findIndex((e) => {
      if (!e || typeof e.id === "undefined") {
        return false;
      }
      if (typeof itemId === "undefined") {
        return false;
      }
      return e.id.toString() === itemId.toString();
    });
  };

  return {
    //STATE
    resMsg,
    favorites,
    visible_sure_add_favorite,
    pagination,
    //ACTIONS
    // getFavorites,
    toggleFavorite,
    findIdx,
  };
});
