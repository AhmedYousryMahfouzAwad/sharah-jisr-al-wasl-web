import { defineStore } from "pinia";

import { useCookie, useLocaleRoute, nextTick, navigateTo } from "#imports";
export const useLoginStore = defineStore("login", () => {
  // STATE
  const { fetchData, loading, resultData } = useFetchData();
  const localePath = useLocalePath();
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { locale } = useI18n();
  const token = ref("");
  const device_type = ref("web");
  const country_code = ref(966);
  const code = ref(null);
  const phone = ref(null);
  const otpInput = ref("");
  const uploadedImage = ref("");
  const email = ref("");
  const bank_account_number = ref("");
  const bank_name = ref("");
  const name = ref("");
  const bank_account_name = ref("");
  const lang = ref(locale.value);
  const iban = ref("");
  const timerActive = ref(false);
  // fetch country codes data

  const sendLogin = async (payload) => {
    await fetchData({
      url: `api/user/login`,
      method: "post",
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("auth-Otp"));
        }, 1000);
      },
    });
  };

  //sendOtp
  const sendOtp = async (payload) => {
    await fetchData({
      url: `user/check-code`,
      method: "post",
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        timerActive.value = true;

        const authCookie = useCookie("auth", {
          watch: true,
          sameSite: "lax",
          maxAge: 365 * 24 * 60 * 60,
        });

        authCookie.value = resultData.value;
        token.value = resultData.value.token;
        nextTick(async () => {
          setAuth();
          setTimeout(() => {
            router.push(localePath("index"));
          }, 1000);
        });
      },

      onNeedActive: () => {
        if (phone.value === null) {
          setTimeout(() => {
            router.push(localePath("auth-login"));
          }, 1000);
        }
      },
    });
  };
  //resendOtp
  const resendOtp = async (payload) => {
    await fetchData({
      url: `user/resend-code`,
      method: "post",
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        timerActive.value = true;
      },
    });
  };

  const register = async (payload) => {
    await fetchData({
      url: `user/sign-up`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("auth-login"));
        }, 1000);
      },
    });
  };

  return {
    //ACTIONS
    sendLogin,
    sendOtp,
    resendOtp,
    register,
    //STATE
    loading,
    code,
    device_type,
    country_code,
    phone,
    otpInput,
    email,
    bank_account_number,
    bank_name,
    bank_account_name,
    lang,
    name,
    iban,
    uploadedImage,
    token,
    timerActive,
  };
});
