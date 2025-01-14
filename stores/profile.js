import { defineStore } from "pinia";
export const useProfileStore = defineStore("profile", () => {
  const localePath = useLocalePath();
  const router = useRouter();
  //STATE
  const { fetchData, resultData, loading } = useFetchData();

  const phone = ref(null);
  const id = ref(null);
  const email = ref(null);
  const name = ref(null);
  const full_phone = ref(null);
  const iban = ref(null);
  const bank_name = ref(null);
  const bank_account_name = ref(null);
  const bank_account_number = ref(null);
  const avatar = ref("");

  const uploadedImage = ref("");

  const route = useRoute();

  const getProfile = async () => {
    await fetchData({
      url: `user/profile`,
      headers: {
        "content-type": "multipart/form-data",
      },
      onSuccess: () => {
        phone.value = resultData.value.phone;
        id.value = resultData.value.id;
        email.value = resultData.value.email;
        name.value = resultData.value.name;
        full_phone.value = resultData.value.full_phone;
        iban.value = resultData.value.iban;
        bank_name.value = resultData.value.bank_name;
        bank_account_name.value = resultData.value.bank_account_name;
        bank_account_number.value = resultData.value.bank_account_number;
        avatar.value = resultData.value.avatar;

        console.log(resultData.value.iban);
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
    name,
    phone,
    id,
    email,
    full_phone,
    iban,
    bank_name,
    bank_account_name,
    bank_account_number,
    avatar,
    uploadedImage,

    //ACTIONS
    getProfile,
    updateProfile,
  };
});
