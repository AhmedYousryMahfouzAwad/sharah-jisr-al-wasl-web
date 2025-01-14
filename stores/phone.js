import { defineStore } from "pinia";
export const usePhoneStore = defineStore("phone", () => {
  const { fetchData, resultData, loading } = useFetchData();
  const localePath = useLocalePath();
  const router = useRouter();
  const otpInput = ref("");
  const phone = ref("");
  const country_code = ref(966);
  //resendCode
  const resendCode = async (payload) => {
    await fetchData({
      url: `user/change-phone-resend-code`,
      method: "post",
      getSuccess: true,
      body: payload,
    });
  };

  const changeMobileNumber = async () => {
    await fetchData({
      url: `user/current-phone-send-code`,
      method: "post",
      getSuccess: true,
      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("settings-change_mobile_number"));
        }, 1000);
      },
    });
  };

  const checkOtp = async (payload) => {
    await fetchData({
      url: `user/current-phone-check-code`,
      method: "post",
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("settings-change_mobile_number_phone"));
        }, 1000);
      },
    });
  };
  const changePhone = async (payload) => {
    await fetchData({
      url: `user/change-phone-send-code`,
      method: "post",
      body: payload,

      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("settings-change_mobile_number"));
        }, 1000);
      },
    });
  };

  return {
    //STATE
    loading,
    phone,
    country_code,
    otpInput,
    //ACTIONS
    resendCode,
    checkOtp,
    changePhone,
    changeMobileNumber,
  };
});
