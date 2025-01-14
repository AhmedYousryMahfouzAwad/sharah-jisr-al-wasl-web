import { defineStore } from "pinia";

// import { useCookie, useLocaleRoute, nextTick, navigateTo } from "#imports";
export const useLogoutStore = defineStore("logout", () => {
  // STATE
  const { fetchData, loading, resultData } = useFetchData();

  const localePath = useLocalePath();
  const router = useRouter();
  const { RemoveAuth } = useAuthStore();
  const { locale } = useI18n();
  // fetch country codes data

  const logOut = async () => {
    await fetchData({
      url: `user/sign-out`,
      method: "delete",
      getSuccess: true,
      onSuccess: () => {
        RemoveAuth();
        setTimeout(() => {
          router.push(localePath("auth-login"));
        }, 1000);
      },
    });
  };
  const deleteAccount = async () => {
    await fetchData({
      url: `user/delete-account`,
      method: "post",
      getSuccess: true,
      onSuccess: () => {
        RemoveAuth();
        setTimeout(() => {
          router.push(localePath("auth-login"));
        }, 1000);
      },
    });
  };

  return {
    //ACTIONS
    logOut,
    RemoveAuth,
    deleteAccount,

    //STATE
    loading,
  };
});
