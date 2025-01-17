<template>
  <div
    class="flex col-span-12 flex-col items-center relative shadow-md p-4 rounded-lg bg-white max-w-xl mx-auto justify-center mt-24 w-full z-10"
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
              <p>محتوى الفرد</p>
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

      <!-- Phone Input -->
      <div class="w-full md:px-0 px-2">
        <div class="relative w-full">
          <InputForm
            name="phone"
            :loading="loading"
            v-model="phone"
            :label="t('pages.auth.call_number')"
            type="number"
            :placeholder="t('pages.auth.call_number_placeholder')"
            class="w-full"
          >
            <template #endIcon>
              <div class="flex items-center gap-2 relative">
                <div>
                  <!-- Country Select -->
                  <Select
                    v-model="country"
                    :options="list_countries"
                    optionLabel="key"
                    :placeholder="$t('inputs.country_code.placeholder')"
                    class="!border-none text-xs bg-transparent text-gray-700 focus:outline-none cursor-pointer"
                  >
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
                        <span class="text-gray-700">{{
                          `+${slotProps.value.key}`
                        }}</span>
                      </div>
                      <span v-else class="text-gray-400">{{
                        slotProps.placeholder
                      }}</span>
                    </template>
                  </Select>
                </div>
              </div>
            </template>
          </InputForm>
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
const activeSubTab = ref("individual"); // اللسان الفرعي الافتراضي
const setActiveSubTab = (tab) => (activeSubTab.value = tab);

const submitLogin = () => {
  // عملية تسجيل الدخول
};
const tabs = [
  { name: "Client", content: "محتوى العميل" },
  { name: "Provider", content: "محتوى مقدم الخدمة" },
];
const currentTab = ref(0);
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

//hooks
// onMounted(async () => {
//   try {
//     await getCountries(); // Wait until getCountries() completes
//   } catch (error) {
//     console.error("Error fetching countries:", error);
//   } finally {
//   }
// });

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
</style>
