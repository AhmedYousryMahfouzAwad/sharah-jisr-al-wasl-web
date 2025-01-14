import { ref } from "vue";
import { useToast } from "primevue/usetoast";

export const useFetchData = () => {
  const { showSuccess, showError, showWarning, showInfo } = usePrimeToast();
  const { locale } = useI18n();

  const { isAuth, userInfo } = storeToRefs(useAuthStore());

  // Setup
  const toast = useToast();
  const axios = useNuxtApp().$axios;
  const resultData = ref({});
  const pagination = ref(null);
  const loading = ref(false);
  const noData = ref(false);
  const resMsg = ref(undefined);
  const status = ref(undefined);

  // Helper to handle success response
  const handleSuccess = (res, options, key) => {
    resMsg.value = res.msg;

    // Handle pagination
    if (res.data?.pagination) {
      pagination.value = res.data.pagination;
    }

    // Assign data
    resultData.value = res.data;

    // Handle empty data
    noData.value = resultData.value?.data?.length === 0;
    if (options.getSuccess) {
      showSuccess(resMsg.value);
    }
    // Trigger specific callbacks based on key
    if (key === "success" && options.onSuccess) {
      options.onSuccess();
    } else if (key === "needCompleteInfo" && options.onNeedCompleteInfo) {
      options.onNeedCompleteInfo();
    } else if (key === "needActive" && options.onNeedActive) {
      options.onNeedActive();
    }
  };

  // Fetch data
  const fetchData = async (options) => {
    loading.value = true;

    try {
      const response = await axios({
        // external url
        url: options.url,

        // external method
        method: options.method || "GET",

        // headers
        headers: {
          "Content-Type":
            options.headers?.content_type ||
            "application/x-www-form-urlencoded",

          lang: locale.value, // put your current lang from i18n here

          // addtional external headers options
          ...options.headers,
          Authorization: isAuth.value
            ? `Bearer ${userInfo.value?.token}`
            : null,
        },
        credentials: "include", // if cookies are needed
        // external params
        params: { ...options.params },
        // external body data
        data: options.body,
      });

      // response
      const res = response.data;
      status.value = response.data.key;

      // result message
      resMsg.value = res.msg;

      // response ststus code
      if (response.status === 200) {
        // Handle different keys from the response
        if (["success", "needCompleteInfo", "needActive"].includes(res.key)) {
          handleSuccess(res, options, res.key);
        } else if (res.key === "blocked" || res.key === "unauthenticated") {
          // Handle unauthorized/blocking cases
          // logout();

          showError(resMsg.value);
        } else {
          throw new Error(resMsg.value);
        }
      } else {
        throw new Error(resMsg.value);
      }
    } catch (error) {
      console.error(error);
      showError(resMsg.value);
      if (options.onError) options.onError();
    } finally {
      loading.value = false;
    }
  };

  return { fetchData, resultData, pagination, loading, noData, resMsg, status };
};
