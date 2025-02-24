<template>
  <!-- Main Content -->
  <div
    class="grid grid-cols-12 lg:container !mx-auto justify-center items-start"
  >
    <div class="lg:col-span-3 md:col-span-5 col-span-1 mx-5 my-5">
      <ListBar />
    </div>
    <div class="lg:col-span-9 md:col-span-7 col-span-11 my-5">
      <div class="text-start space-y-10 mt-8 w-full">
        <!-- Card Container -->
        <div class="flex justify-start items-center">
          <div class="bg-white shadow-2xl rounded-xl p-4 w-full max-w-3xl">
            <!-- Header Section -->
            <div class="flex items-center justify-between border-b pb-4">
              <div class="flex items-center gap-x-2">
                <div
                  class="relative p-2 rounded-full bg-primary-2 cursor-pointer"
                >
                  <img
                    src="/wallet.svg"
                    alt="wallet"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-bold text-sm">{{ t("pages.the_wallet") }}</p>
                  <p class="font-semibold text-xs text-gray-700">
                    {{ t("pages.Check_wallet") }}
                  </p>
                </div>
              </div>
            </div>
            <div class="flex flex-col items-center space-y-3 justify-center">
              <img src="/public/img/wallet.png" alt="wallet" />

              <span class="text-center text-sm text-gray-600">{{
                t("pages.the_balance")
              }}</span>

              <span class="font-bold text-2xl text-gray-800">
                <template v-if="loading">
                  <div class="w-24 h-6 bg-gray-300 animate-pulse rounded"></div>
                </template>
                <template v-else>
                  {{ available_balance }} {{ t("pages.sar") }}
                </template>
              </span>

              <ButtonAuth
                type="button"
                @click="visible = true"
                :label="t('pages.recharge_wallet')"
                class="my-5 !w-[30%] !text-sm text-center !flex !bg-primary-1 text-white font-bold"
                :imageSrc="'/arrow.png'"
              />

              <BaseDialog
                v-model:visible="visible"
                :header="t('pages.recharge_wallet')"
                class="w-full max-w-xl mx-2"
              >
                <template #content>
                  <span
                    class="text-surface-500 font-semibold text-sm dark:text-surface-400 block my-3"
                  >
                    {{ t("pages.recharge_amount") }}
                  </span>
                  <form
                    @submit.prevent="submit"
                    class="text-start space-y-5 w-full"
                  >
                    <InputForm
                      name="balance"
                      type="number"
                      :loading="loading"
                      v-model="balance"
                      :placeholder="t('pages.enter_recharge_amount')"
                      class="w-full py-2 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    />

                    <ButtonAuth
                      type="submit"
                      :label="t('pages.Recharge')"
                      class="my-5 !text-sm text-center !flex !bg-primary-1 text-white font-bold"
                      :imageSrc="'/arrow.png'"
                      :loading="loading_btn"
                    />
                  </form>
                </template>
              </BaseDialog>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>
<script setup>
const { fetchData, resultData } = useFetchData();
import * as yup from "yup";
// i18n
const { t } = useI18n();
const available_balance = ref("");
const loading = ref(true);
const loading_btn = ref(false);
const visible = ref(false);
const balance = ref(null);

const validationSchema = yup.object({
  balance: yup.string().required(t("validation.required")),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});

const wallet = async () => {
  try {
    await fetchData({
      url: `api/wallets/show`,
      onSuccess: () => {
        available_balance.value = resultData.value.available_balance ?? 0;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    await wallet();
  } finally {
    loading.value = false; // Hide loading state after data is fetched
  }
});

const submit = handleSubmit(async () => {
  const payload = { balance: balance.value, brand_id: 2 };
  try {
    loading_btn.value = true;
    await fetchData({
      url: `api/wallets/charge`,
      method: "POST",
      body: payload,
      getSuccess: true,

      onSuccess: () => {
        visible.value = false;
        balance.value = null;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading_btn.value = false;
  }
});

// // Store
// const { getWallet } = useWalletStore();
// const { available_balance } = storeToRefs(useWalletStore());

// Reactive loading state

// // Computed formatted balance
// const formattedAvailableBalance = computed(() => {
//   return Number(available_balance.value).toFixed(2);
// });

// Fetch wallet data on component mount
// onBeforeMount(async () => {
//   try {
//     await getWallet();
//   } catch (error) {
//     console.error("Failed to fetch wallet data:", error);
//     // Optionally, show an error message to the user
//   }
// });

// Button click handler
// const handleButtonClick = () => {
//   loading_btn.value = true; // Set loading state to true
//   visible.value = true;
//   setTimeout(() => {
//     loading_btn.value = false; // Reset loading state after a delay
//     visible.value = false;
//   }, 1000);

// try {
//   const newTab = window.open(
//     "https://backend.swimmer.aait-sa.com/public/hyper-pay-form/89E4EE1987778E5DE45BE53D5675B58A.uat01-vm-tx04/2/VISA%20MASTER",
//     "_blank"
//   );

//   if (newTab) {
//     // Ensure the tab is successfully opened before resetting the loading state
//     setTimeout(() => {
//       loading_btn.value = false;
//     }, 1000);
//   } else {
//     throw new Error("Popup blocked or failed to open");
//   }
// } catch (error) {
//   loading_btn.value = false; // Reset loading state if opening the link fails
// }
// };
</script>
