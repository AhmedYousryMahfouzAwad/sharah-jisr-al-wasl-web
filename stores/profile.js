import { defineStore } from "pinia";
export const useProfileStore = defineStore("profile", () => {
  const localePath = useLocalePath();
  const router = useRouter();
  //STATE
  const { fetchData, resultData } = useFetchData();

  const profile = ref({
    name: "",
    phone: "",
    email: "",
    avatar: "",
    country_code: "",
    image: "",
    commercial_register: "",
    commercial_register_image: null,
  });

  const getProfile = async () => {
    await fetchData({
      url: `api/user/profile`,
      headers: {
        "content-type": "multipart/form-data",
      },
      onSuccess: () => {
        profile.value = resultData.value;
      },
    });
  };

  const updateProfile = async (payload) => {
    await fetchData({
      url: `user/update-profile`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      getSuccess: true,
      body: payload,

      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("settings"));
        }, 1000);
      },
    });
  };

  return {
    //STATE

    profile,

    //ACTIONS
    getProfile,
    updateProfile,
  };
});
