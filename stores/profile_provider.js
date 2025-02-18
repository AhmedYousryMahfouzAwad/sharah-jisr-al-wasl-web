import { defineStore } from "pinia";
export const useProfileProviderStore = defineStore("profile", () => {
  const localePath = useLocalePath();
  const router = useRouter();
  //STATE
  const { fetchData, resultData } = useFetchData();

  const profile = ref({
    name: null,
    phone: null,
    email: null,
    avatar: null,
    country_code: null,
    commercial_register: null,
    commercial_register_image: null,
    imagePreview: null,
    image: null,
    bank_name: null,
    account_name: null,
    account_number: null,
    iban: null,
    lat: null,
    lng: null,
    map_desc: null,
    city: {
      id: null,
      name: null,
      country: {
        id: null,
        name: null,
        key: null,
        flag: null,
      },
    },
    category: {
      id: null,
      name: "",
      image: "",
    },
  });

  const getProfileProvider = async () => {
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

  const updateProfileProvider = async (payload) => {
    await fetchData({
      url: `api/provider/profile/update`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      getSuccess: true,
      body: payload,

      onSuccess: () => {
        setTimeout(() => {
          router.push(localePath("settings-provider"));
        }, 1000);
      },
    });
  };

  return {
    //STATE

    profile,

    updateProfileProvider,
    getProfileProvider,
  };
});
