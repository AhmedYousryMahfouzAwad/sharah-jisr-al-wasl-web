<template>
  <!-- Main content -->
  <div
    class="flex col-span-12 flex-col items-center relative shadow-md p-4 rounded-lg bg-white max-w-xl mx-auto justify-center mt-24 w-full z-10"
  >
    <form @submit.prevent="submitLogin" class="text-start space-y-10 w-full">
      <div>
        <h1 class="md:text-3xl text-black text-base text-center font-bold">
          {{ t("pages.auth.login") }}
        </h1>
        <h1
          class="font-semibold my-1 md:text-sm text-xs text-center text-black"
        >
          {{ t("pages.welcome_back") }}
        </h1>
      </div>

      <div class="card">
        <Tabs v-model="currentTab" value="0">
          <TabList>
            <div class="grid grid-cols-12 w-full justify-center items-center">
              <!-- First Tab -->
              <div class="col-span-6 flex justify-center">
                <Tab value="0" class="w-full text-center">{{
                  t("pages.client")
                }}</Tab>
              </div>
              <!-- Second Tab -->
              <div class="col-span-6 flex justify-center">
                <Tab value="1" class="w-full text-center">Header 2</Tab>
              </div>
            </div>
          </TabList>

          <TabPanels>
            <TabPanel value="0">
              <!-- Sub-tabs inside first tab -->
              <div
                class="grid grid-cols-12 w-full rounded-full items-center p-1 bg-gray-100"
              >
                <!-- First Sub-tab -->
                <div
                  class="col-span-6 flex rounded-full justify-center cursor-pointer"
                  :class="{
                    'bg-primary-1 text-white': activeSubTab === 2,
                    'text-gray-600': activeSubTab !== 2,
                  }"
                  @click="setActiveSubTab(2)"
                >
                  <Tab value="2" class="w-full text-center font-bold py-2">
                    {{ t("pages.company") }}
                  </Tab>
                </div>
                <!-- Second Sub-tab -->
                <div
                  class="col-span-6 flex rounded-full justify-center cursor-pointer"
                  :class="{
                    'bg-primary-1 text-white': activeSubTab === 3,
                    'text-gray-600': activeSubTab !== 3,
                  }"
                  @click="setActiveSubTab(3)"
                >
                  <Tab value="3" class="w-full text-center font-bold py-2">
                    {{ t("pages.individual") }}
                  </Tab>
                </div>
              </div>

              <!-- Sub-tab content -->
              <div class="w-full text-center mt-4">
                <div v-show="activeSubTab === 2" class="p-4 text-gray-800">
                  Content for Sub-tab: Company
                </div>
                <div v-show="activeSubTab === 3" class="p-4 text-gray-800">
                  Content for Sub-tab: Individual
                </div>
              </div>
            </TabPanel>

            <TabPanel value="1">
              <p class="m-0">
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae
                vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia
                voluptas sit aspernatur aut odit aut fugit, sed quia
                consequuntur magni dolores eos qui ratione voluptatem sequi
                nesciunt. Consectetur, adipisci velit, sed quia non numquam eius
                modi.
              </p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>

      <!-- Input and Button -->
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
                  <!-- Select Component -->
                  <Select
                    v-model="country"
                    :options="list_countries"
                    optionLabel="key"
                    :placeholder="$t('inputs.country_code.placeholder')"
                    class="!border-none text-xs appearance-none bg-transparent text-gray-700 focus:outline-none cursor-pointer"
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

const localeRoute = useLocaleRoute();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
const isLoading = ref(false); // حالة التحميل

// State for managing the active tab
const activeTab = ref(2); // Default to Tab 2

// Function to change the active tab
const setActiveTab = (tab) => {
  activeTab.value = tab;
};
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
</style>
