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
  const router = useRouter();
  const getFavorites = async (page = 1) => {
    await fetchData({
      url: `user/all-favorites`,
      params: {
        page: page,
      },
      onSuccess: () => {
        favorites.value = resultData.value.data || [];
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = page;
      },
    });
  };

  const toggleFavorite = async (payload) => {
    await fetchData({
      url: `user/favorite`,
      method: "post",
      body: { product_id: payload },

      onSuccess: async () => {
        visible_sure_add_favorite.value = true;
        setTimeout(() => {
          visible_sure_add_favorite.value = false;
        }, 1000);
        setTimeout(async () => {
          await getFavorites();
          router.push(localePath("/"));
        }, 1200);
      },
      getSuccess: true,
      onError: () => {
        visible_sure_add_favorite.value = false;
      },
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
    getFavorites,
    toggleFavorite,
    findIdx,
  };
});
