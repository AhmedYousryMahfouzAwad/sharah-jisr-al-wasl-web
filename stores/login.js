import { defineStore } from "pinia";

import { useCookie, useLocaleRoute, nextTick, navigateTo } from "#imports";
export const useLoginStore = defineStore("login", () => {
  // STATE
  const { fetchData, loading, resultData } = useFetchData();
  const localePath = useLocalePath();
  const localeRoute = useLocaleRoute();
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const { locale } = useI18n();
  const token = ref("");
  const device_type = ref("web");
  const phone = ref(null || useCookie("phone").value);
  const code = ref(null);
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
  const macCookie = useCookie("macAddress", {
    maxAge: 60 * 60 * 24 * 7, // Cookie expires in 7 days
    secure: true, // Ensures secure transmission over HTTPS
    httpOnly: false, // Accessible from JavaScript
  });

  const generateRandomMacAddress = () => {
    return Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
    ).join(":");
  };

  //mac address
  if (!macCookie.value) {
    macCookie.value = generateRandomMacAddress();
    console.log("New MAC Address cookie set:", macCookie.value);
  } else {
    console.log("Existing MAC Address cookie found:", macCookie.value);
  }

  //user login
  const sendLogin = async (data) => {
    const url =
      data.type === "provider" ? `api/provider/login` : `api/user/login`;
    await fetchData({
      url,
      method: "post",
      body: data.payload,
      getSuccess: true,
      onSuccess: () => {
        setTimeout(() => {
          useCookie("country_code").value = data.payload.country_code;
          useCookie("phone").value = resultData.value.phone;

          if (data.type === "provider") {
            router.push(localePath({ name: "auth-otp-provider" }));
          } else {
            router.push(localePath("auth-Otp"));
          }
        }, 1000);
      },
      onNeedActive: () => {
        router.push(localePath("auth-Otp"));
      },
    });
  };

  //sendOtp
  const sendOtp = async (payload) => {
    await fetchData({
      url: `api/user/verify-login`,
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
          setTimeout(() => {
            navigateTo(localeRoute({ name: "index" }), {
              replace: true,
            });
            otpInput.value = "";
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
  const sendOtpProvider = async (payload) => {
    await fetchData({
      url: `api/provider/verify-login`,
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
          setTimeout(() => {
            navigateTo(localeRoute({ name: "home_provider" }), {
              replace: true,
            });
            otpInput.value = "";
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

  return {
    //ACTIONS
    sendLogin,
    sendOtp,
    generateRandomMacAddress,
    sendOtpProvider,

    //STATE
    loading,
    code,
    device_type,
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
    macCookie,
  };
});
