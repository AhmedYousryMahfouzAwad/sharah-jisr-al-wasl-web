import { defineStore } from "pinia";
export const useCartStore = defineStore("cart", () => {
  //STATE
  const { fetchData, resultData, loading } = useFetchData();
  const count = ref(1);
  const cart = ref(null);
  const cart_details = ref({});
  const countShoppingCart = ref(2);
  const visible_sure_add = ref(false);

  //router
  const localePath = useLocalePath();
  const router = useRouter();

  //actions
  //get_cart
  const getCart = async () => {
    await fetchData({
      url: `user/get-cart`,
      onSuccess: () => {
        cart.value = resultData.value?.cart || null;
        cart_details.value = resultData.value?.cart_details || null;
      },
    });
  };

  //toggle installment
  const toggleInstallment = async (id) => {
    await fetchData({
      url: `user/install-toggle/${id}`,
      method: "post",
      getSuccess: true,

      onSuccess: async () => {
        await getCart();
      },
    });
  };

  //delete cart
  const deleteCart = async (id, index) => {
    await fetchData({
      url: `user/remove-item-from-cart/${id}`,
      method: "delete",
      getSuccess: true,
      onSuccess: async () => {
        await getCart();
        // cart.value = cart.value.filter((item) => item.id !== id);
      },
    });
  };
  const addCart = async (payload) => {
    await fetchData({
      url: `user/add-to-cart`,
      method: "post",
      body: payload,
      onSuccess: async () => {
        visible_sure_add.value = true;
        await getCart();
        setTimeout(() => {
          visible_sure_add.value = false; // Hide confirmation
          router.push(localePath("/"));
        }, 1200);
      },
    });
  };
  const countCart = async () => {
    await fetchData({
      url: `user/count-cart`,

      onSuccess: async () => {
        countShoppingCart.value = resultData.value;
      },
    });
  };
  const updateCart = async (cart_id, count) => {
    await fetchData({
      url: `user/update-cart-count`,
      method: "post",
      params: {
        cart_id,
        count,
      },
      getSuccess: true,
      onSuccess: async () => {
        await getCart();
      },
    });
  };

  return {
    //STATE
    cart,
    count,
    cart_details,
    visible_sure_add,
    countShoppingCart,
    //ACTIONS
    updateCart,
    deleteCart,
    getCart,
    toggleInstallment,
    addCart,
    countCart,
  };
});
