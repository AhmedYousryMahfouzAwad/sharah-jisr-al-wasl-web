import { defineStore } from "pinia";
export const useProfileProviderStore = defineStore("profile", () => {
  const localePath = useLocalePath();
  const router = useRouter();
  //STATE
  const { fetchData, resultData } = useFetchData();

  const profile = ref({
    name: "", // بدلاً من null لمنع الأخطاء في v-model
    phone: "",
    email: "",
    avatar: "", // بدلًا من null حتى لا يحدث خطأ عند تحميل الصورة
    country_code: "",
    commercial_register: "",
    commercial_register_image: "",
    imagePreview: "",
    image: "", // هنا يمكن أن يكون `""` كقيمة افتراضية لتجنب الأخطاء
    bank_name: "",
    account_name: "",
    account_number: "",
    iban: "",
    lat: 0, // يفضل أن يكون رقمًا افتراضيًا
    lng: 0, // نفس الشيء هنا
    map_desc: "",
    city: {
      id: 0, // لتجنب قراءة `null`
      name: "",
      country: {
        id: 0,
        name: "",
        key: "",
        flag: "", // لكي لا يحدث خطأ عند محاولة تحميل صورة العلم
      },
    },
    category: {
      id: 0, // تجنب أن يكون `null`
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
