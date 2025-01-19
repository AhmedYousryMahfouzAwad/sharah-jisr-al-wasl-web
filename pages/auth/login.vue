<template>
  <div
    class="flex col-span-12 flex-col items-center relative shadow-md p-4 rounded-lg bg-white max-w-lg mx-auto justify-center mt-24 w-full z-10"
  >
    <form @submit.prevent="submitLogin" class="text-start space-y-10 w-full">
      <!-- Header -->
      <div>
        <h1 class="md:text-3xl text-black text-base text-center font-bold">
          {{ t("pages.auth.login") }}
        </h1>
        <h1
          class="font-semibold my-1 md:text-sm text-xs text-center text-gray-600"
        >
          {{ t("pages.welcome_back") }}
        </h1>
      </div>

      <div class="card">
        <!-- Tabs Container -->
        <div class="flex">
          <!-- Tab: Client -->
          <button
            @click="currentTab = 'client'"
            :class="{
              'border-b-2 border-primary-1 font-bold text-black':
                currentTab === 'client',
              'text-gray-600': currentTab !== 'client',
            }"
            class="flex-1 text-center py-2"
          >
            عميل
          </button>

          <!-- Tab: Provider -->
          <button
            @click="currentTab = 'provider'"
            :class="{
              'border-b-2 border-primary-1 font-bold text-black':
                currentTab === 'provider',
              'text-gray-600': currentTab !== 'provider',
            }"
            class="flex-1 text-center py-2"
          >
            مقدم خدمة
          </button>
        </div>

        <!-- Tab Content -->
        <div class="p-4">
          <div v-if="currentTab === 'client'">
            <!-- Sub-tabs -->
            <div
              class="grid grid-cols-12 w-full rounded-full bg-primary-2 p-1 items-center justify-center mb-4"
            >
              <!-- Sub-tab: Individual -->
              <button
                @click="activeSubTab = 'individual'"
                :class="
                  activeSubTab === 'individual'
                    ? 'bg-primary-1 text-white'
                    : 'bg-primary-2 text-gray-600'
                "
                class="col-span-6 text-center font-semibold rounded-full py-2"
              >
                فرد
              </button>

              <!-- Sub-tab: Company -->
              <button
                @click="activeSubTab = 'company'"
                :class="
                  activeSubTab === 'company'
                    ? 'bg-primary-1 text-white'
                    : 'bg-pr-200 text-gray-600'
                "
                class="col-span-6 text-center font-semibold rounded-full py-2"
              >
                شركة
              </button>
            </div>

            <!-- Sub-tab Content -->
            <div v-if="activeSubTab === 'individual'" class="text-center">
              <p class="text-start">{{ t("pages.mobile_number") }}</p>
              <!-- Phone Input -->
              <div class="w-full grid grid-cols-12 gap-2">
                <!-- Country Select -->
                <div class="relative col-span-3 mt-[9px]">
                  <Select
                    v-model="country"
                    :options="list_countries"
                    optionLabel="key"
                    class="w-full pl-3 pr-3 py-1 h-full items-center flex border-2 text-sm rounded-lg !bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-1"
                  >
                    <!-- Selected Value Display -->
                    <template #value="slotProps">
                      <div v-if="slotProps.value" class="flex items-center">
                        <img
                          :alt="slotProps.value.label"
                          :src="slotProps.value.image"
                          class="mr-2"
                          style="
                            width: 25px;
                            height: 15px;
                            object-fit: cover;
                            border-radius: 3px;
                          "
                        />
                        <span class="text-gray-700 font-medium">{{
                          `+${slotProps.value.key}`
                        }}</span>
                      </div>
                      <span v-else class="text-gray-400">{{
                        slotProps.placeholder
                      }}</span>
                    </template>

                    <!-- Dropdown Options -->
                    <template #option="slotProps">
                      <div
                        class="flex items-center justify-start w-full px-2 py-1 hover:bg-gray-300 cursor-pointer"
                        :key="slotProps.option.key"
                      >
                        <img
                          :alt="slotProps.option.label"
                          :src="slotProps.option.image"
                          class="mr-2"
                          style="
                            width: 25px;
                            height: 15px;
                            object-fit: cover;
                            border-radius: 3px;
                          "
                        />
                        <span class="text-gray-700 font-medium">{{
                          `+${slotProps.option.key}`
                        }}</span>
                      </div>
                    </template>
                  </Select>
                </div>

                <!-- Phone Input -->
                <div class="relative col-span-9">
                  <InputForm
                    name="phone"
                    :loading="loading"
                    v-model="phone"
                    type="text"
                    :placeholder="t('pages.auth.call_number_placeholder')"
                    class="w-full pl-3 pr-3 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                  />
                </div>
              </div>
            </div>
            <div v-else-if="activeSubTab === 'company'" class="text-center">
              <p>محتوى الشركة</p>
            </div>
          </div>
          <div v-else-if="currentTab === 'provider'">
            <p>محتوى مقدم الخدمة</p>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="md:px-0 px-2">
        <ButtonAuth
          :loading="loading"
          type="submit"
          :label="t('pages.auth.login')"
          :disabled="loading"
          class="w-full bg-primary-1 text-white font-semibold py-2 rounded-md"
        />
      </div>
    </form>
  </div>

  <!-- Background Image -->
  <img
    :src="illustration"
    class="w-full h-auto object-cover bottom-0 fixed z-0"
    alt="Login Illustration"
  />
</template>

<script setup>
import illustration from "../../public/img/Illustration.png";
const activeSubTab = ref("individual");
const setActiveSubTab = (tab) => (activeSubTab.value = tab);
const currentTab = ref("client");

// const submitLogin = () => {
//   // عملية تسجيل الدخول
// };
const tabs = [
  { name: "Client", content: "محتوى العميل" },
  { name: "Provider", content: "محتوى مقدم الخدمة" },
];
const localeRoute = useLocaleRoute();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false); // حالة التحميل

const { phone } = storeToRefs(useLoginStore());
const { list_countries, country } = storeToRefs(useCountries());
const { isAuth } = storeToRefs(useAuthStore());
const { getCountries } = useCountries();
const { logOutAuth } = useLogoutStore();
const visible = ref(false);

// const logoutGuestAuth = async () => {
//   if (isAuth.value) {
//     isLoading.value = true; // Start loading
//     try {
//       await logOutAuth(); // قم باستدعاء logout
//       visible.value = true;
//       setTimeout(() => {
//         visible.value = false;
//         router.push(localePath("/")); // الانتقال بعد انتهاء الطلب
//         isLoading.value = false; // Stop loading
//       }, 1000);
//     } catch (error) {
//       console.error("Logout failed:", error);
//       isLoading.value = false; // Stop loading even on error
//     }
//   } else {
//     router.push(localePath("/"));
//   }
// };

const { t } = useI18n();
import * as yup from "yup";
const { sendLogin } = useLoginStore();
const loading = ref(false);
const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]+$/, t("validation.only_digits"))
    .min(9, t("validation.min", { min: 9 }))
    .max(10, t("validation.max", { max: 10 }))
    .required(t("validation.required")),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});

// Lifecycle hooks;
onMounted(async () => {
  try {
    await getCountries(); // Wait until getCountries() completes
  } catch (error) {
    console.error("Error fetching countries:", error);
  } finally {
  }
});

// Wrapping the submit logic
// const submitLogin = handleSubmit(async () => {
//   loading.value = true; // Start the loading state
//   try {
//     // Call the sendLogin function and wait for it to complete
//     await sendLogin({
//       phone: phone.value,
//       country_code: country.value.key,
//       iso: country.value.iso,
//     });
//   } catch (error) {
//     // Handle errors (e.g., show error message)
//     console.error("Error during login:", error);
//   } finally {
//     // Ensure the loading state is reset no matter what
//     loading.value = false;
//   }
// });
</script>

<style scoped>
/* Ensure white background is applied */
.bg-white {
  background-color: #ffffff !important;
}

/* Disable interaction with background image */
img.z-0 {
  pointer-events: none;
}

/* Adjust button style */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.p-tab-active {
  @apply !border-primary-1 !text-primary-1;
}

::v-root .active-bar-color {
  background-color: #c69e73 !important;
}

.active-tab {
  background-color: #c69e73;
  color: white;
}
.inactive-tab {
  background-color: #f3f3f3;
  color: black;
}

/* Dropdown Container */
.select-container {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dropdown Option */
.select-option {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
}

.select-option:hover {
  background-color: #f9fafb;
}

.select-option img {
  width: 25px;
  height: 15px;
  border-radius: 3px;
  object-fit: cover;
  margin-right: 8px;
}

.select-option span {
  font-size: 14px;
  color: #1a202c;
}

/* Arrow Styling */
.dropdown-arrow {
  font-size: 12px;
  color: #a0aec0;
  margin-left: auto;
}

/* Selected Item */
.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
</style>
