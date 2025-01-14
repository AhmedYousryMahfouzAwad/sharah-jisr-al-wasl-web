import { defineStore } from "pinia";
export const useContactUsStore = defineStore("contact_us", () => {
  const { fetchData, resultData, loading } = useFetchData();
  const localePath = useLocalePath();
  const router = useRouter();
  const name = ref("");
  const phone = ref("");
  const message = ref("");
  const contact_info = ref("");
  const socials = ref([]);
  //resendCode

  const contactUs = async (payload) => {
    await fetchData({
      url: `user/contact-us-store`,
      method: "post",
      body: payload,
      getSuccess: true,
      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("index"));
        }, 1000);
      },
    });
  };
  const getContactUs = async () => {
    await fetchData({
      url: `user/contact-us-info`,
      onSuccess: () => {
        socials.value = resultData.value.socials;
        contact_info.value = resultData.value.contact_info;
      },
    });
  };

  return {
    //STATE
    loading,
    phone,
    name,
    message,
    socials,
    resultData,
    contact_info,
    //ACTIONS
    contactUs,
    getContactUs,
  };
});
