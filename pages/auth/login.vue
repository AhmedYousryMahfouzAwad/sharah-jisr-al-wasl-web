<template>
  <div class="mx-5">
    <div
      class="flex col-span-12 flex-col items-center relative shadow-lg p-2 rounded-lg bg-white max-w-lg mx-auto justify-center my-5 w-full z-10"
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
                <p class="text-start my-2">{{ t("pages.mobile_number") }}</p>
                <!-- Phone Input -->
                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Country Select -->
                  <div
                    class="relative col-span-12 sm:col-span-5 md:col-span-4 self-start"
                  >
                    <Select
                      v-model="country"
                      :options="list_countries"
                      optionLabel="key"
                      class="w-full py-1 h-full flex border-2 text-sm rounded-lg !bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-1"
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
                            `${slotProps.value.key}`
                          }}</span>
                        </div>
                        <span v-else class="text-gray-400">{{
                          slotProps.placeholder
                        }}</span>
                      </template>

                      <!-- Dropdown Options -->
                      <template #option="slotProps">
                        <div
                          class="flex items-center justify-start w-full py-1 hover:bg-gray-300 cursor-pointer"
                          :key="slotProps.option.key"
                        >
                          <img
                            :alt="slotProps.option.label"
                            :src="slotProps.option.image"
                            style="
                              width: 25px;
                              height: 15px;
                              object-fit: cover;
                              border-radius: 3px;
                            "
                          />
                          <span class="text-gray-700 font-medium">{{
                            `${slotProps.option.key}`
                          }}</span>
                        </div>
                      </template>
                    </Select>
                  </div>

                  <!-- Phone Input -->
                  <div class="relative col-span-12 sm:col-span-7 md:col-span-8">
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
            :imageSrc="'/arrow.png'"
            :loading="loading"
            type="submit"
            :label="t('pages.auth.login')"
            :disabled="loading"
            class="!w-[94%] !mx-auto !justify-center !items-center !flex !bg-primary-1 text-white font-semibold"
          />
        </div>

        <div class="w-[100%] md:px-0 px-2">
          <button
            @click="logoutGuestAuth"
            :disabled="isLoading"
            type="button"
            class="text-center flex justify-center items-center mx-auto cursor-pointer"
          >
            <p class="text-primary-1 hover:underline transition duration-200">
              {{ t("pages.auth.login_as_guest") }}
            </p>

            <span
              v-if="isLoading"
              class="text-primary-1 mx-3 hover:underline transition duration-200"
              >{{ t("pages.loading") }}</span
            >
          </button>

          <BaseDialog v-model:visible="visible" class="w-full max-w-xl mx-2">
            <template #content>
              <span
                class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl"
              >
                {{ t("pages.login_as_guest") }}
              </span>
              <img
                :src="animation"
                alt="animation_image"
                class="mx-auto justify-center items-center flex"
              />
            </template>
          </BaseDialog>
          <div
            class="text-center mt-3 mb-2 md:text-base text-xs flex justify-center items-center"
          >
            <p>{{ t("pages.auth.have_an_account") }}</p>
            <NuxtLink
              :to="localeRoute({ name: 'auth-register' })"
              class="text-center flex justify-center items-center cursor-pointer"
            >
              <p
                class="text-primary-1 hover:underline md:text-base text-xs transition duration-200 mx-2"
              >
                {{ t("pages.auth.create_a_new_account") }}
              </p>
            </NuxtLink>
          </div>
        </div>
      </form>
    </div>
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
const isLoading = ref(false);
const visible = ref(false);

const { phone } = storeToRefs(useLoginStore());
const { sendLogin } = useLoginStore();

const { list_countries, country } = storeToRefs(useCountries());
const { isAuth } = storeToRefs(useAuthStore());

const { getCountries } = useCountries();
const { logOutAuth } = useLogoutStore();

// const logoutGuestAuth = async () => {
//   if (isAuth.value) {
//     isLoading.value = true; // Start loading
//     try {
//       await logOutAuth(); // logout
//       visible.value = true;
//       setTimeout(() => {
//         visible.value = false;
//         router.push(localePath("/")); //
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
const loading = ref(false);
const validationSchema = yup.object({
  phone: yup
    .string()
    .matches(/^[0-9]+$/, t("validation.only_digits"))
    .min(9, t("validation.min_n", { min: 9 }))
    .max(10, t("validation.max_n", { max: 10 }))
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
const submitLogin = handleSubmit(async () => {
  loading.value = true;
  try {
    // Call the sendLogin function and wait for it to complete
    await sendLogin({
      phone: phone.value,
      country_code: country.value.key,
      device_id: 111,
      device_type: "web",
    });
  } catch (error) {
    console.error("Error during login:", error);
  } finally {
    loading.value = false;
  }
});
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
  font-size: 10px !important;
  color: #a0aec0;
  margin-left: 4px;
}

/* Selected Item */
.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.grid {
  align-items: center;
}

.relative {
  position: relative;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4299e1;
}
</style>
