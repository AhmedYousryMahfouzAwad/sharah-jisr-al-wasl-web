import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
  const router = useRouter();

  //STATE

  const isAuth = ref(false);
  const userInfo = ref(null);

  // fetch country codes data

  const setAuth = async () => {
    isAuth.value = true;
    userInfo.value = useCookie("auth").value;
    // permissions.value = useCookie("permissions").value;
  };

  const RemoveAuth = () => {
    isAuth.value = false;
    useCookie("auth").value = null;
    userInfo.value = {};
  };

  return {
    isAuth,
    userInfo,
    setAuth,
    RemoveAuth,
  };
});
