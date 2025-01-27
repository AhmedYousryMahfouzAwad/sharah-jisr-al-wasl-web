<template>
  <div class="mx-auto !mt-20">
    <div
      class="flex col-span-12 flex-col items-center relative shadow-lg p-2 rounded-lg bg-white max-w-lg mx-auto justify-center w-full z-10"
    >
      <form @submit.prevent="submit" class="text-start space-y-10 w-full">
        <!-- Header -->
        <div>
          <h1 class="md:text-3xl text-black text-base text-center font-bold">
            {{ t("pages.title_register") }}
          </h1>
          <h1
            class="font-semibold my-1 md:text-sm text-xs text-center text-gray-600"
          >
            {{ t("pages.des_register") }}
          </h1>
        </div>

        <div class="card">
          <!-- Tabs Container -->
          <div class="flex">
            <!-- Tab: Client -->
            <button
              type="button"
              @click="currentTab = 'client'"
              :class="{
                'border-b-2 border-primary-1 font-bold text-black':
                  currentTab === 'client',
                'text-gray-600': currentTab !== 'client',
              }"
              class="flex-1 text-center py-2"
            >
              {{ t("pages.client") }}
            </button>

            <!-- Tab: Provider -->
            <button
              type="button"
              @click="currentTab = 'provider'"
              :class="{
                'border-b-2 border-primary-1 font-bold text-black':
                  currentTab === 'provider',
                'text-gray-600': currentTab !== 'provider',
              }"
              class="flex-1 text-center py-2"
            >
              {{ t("pages.provider") }}
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
                  type="button"
                  @click="activeSubTab = 'individual'"
                  :class="
                    activeSubTab === 'individual'
                      ? 'bg-primary-1 text-white'
                      : 'bg-primary-2 text-gray-600'
                  "
                  class="col-span-6 text-center font-semibold rounded-full py-2"
                >
                  {{ t("pages.individual") }}
                </button>

                <!-- Sub-tab: Company -->
                <button
                  type="button"
                  @click="activeSubTab = 'company'"
                  :class="
                    activeSubTab === 'company'
                      ? 'bg-primary-1 text-white'
                      : 'bg-pr-200 text-gray-600'
                  "
                  class="col-span-6 text-center font-semibold rounded-full py-2"
                >
                  {{ t("pages.company") }}
                </button>
              </div>

              <div
                class="flex flex-col items-center mt-4 justify-center mx-auto"
              >
                <div class="flex">
                  <div class="relative">
                    <Avatar
                      :image="uploadedImage || defaultImage"
                      class="rounded-full border bg-transparent relative border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80"
                      size="xlarge"
                      shape="circle"
                    />

                    <button
                      v-if="!uploadedImage"
                      type="button"
                      @click="triggerFileInput"
                      class="absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-125 text-primary-2 cursor-pointer animate-bounce"
                    >
                      <i
                        class="pi pi-upload text-xl text-primary-1 flex justify-center items-center"
                      ></i>
                    </button>
                    <button
                      v-if="uploadedImage"
                      class="absolute top-3 left-3 transform -translate-x-1/2 -translate-y-1/2 text-red-2 rounded-full p-2 transition-transform duration-300 ease-in-out"
                      type="button"
                      @click="removeImage"
                    >
                      <i class="pi pi-times text-sm"></i>
                    </button>
                  </div>

                  <!-- Placeholder Text -->
                </div>

                <!-- Delete Button -->

                <input
                  type="file"
                  accept="image/*"
                  @change="onFileChange"
                  class="hidden"
                  ref="fileInput"
                />

                <p class="text-sm my-1">
                  {{ t("pages.profile_img") }}
                  <span class="text-gray-500"> {{ t("pages.optional") }} </span>
                </p>
              </div>

              <!-- Sub-tab Content -->
              <div v-if="activeSubTab === 'individual'" class="text-center">
                <p class="text-start my-2">
                  <span class="text-red-2">*</span>
                  {{ t("pages.name") }}
                </p>

                <!-- Name Input -->
                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Name Input -->
                  <div class="relative col-span-12">
                    <InputForm
                      name="full_name"
                      :loading="loading"
                      v-model="full_name"
                      type="text"
                      :placeholder="t('pages.name')"
                      class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/img/name.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>

                <p class="text-start my-2">
                  <span class="text-red-2">*</span>
                  {{ t("pages.mobile_number") }}
                </p>

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
                      :placeholder="t('pages.mobile_number')"
                      class="w-full pl-3 pr-3 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    />
                  </div>
                </div>

                <!-- Email -->
                <p class="text-start my-2">
                  <span class="text-red-2">*</span>
                  {{ t("pages.auth.email") }}
                </p>

                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Email -->
                  <div class="relative col-span-12">
                    <InputForm
                      name="email"
                      :loading="loading"
                      v-model="email"
                      type="text"
                      :placeholder="t('pages.auth.email')"
                      class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/img/email.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>
              </div>

              <div v-else-if="activeSubTab === 'company'" class="text-center">
                <p class="text-start my-2">
                  <span class="text-red-2">*</span>
                  {{ t("pages.mobile_number") }}
                </p>
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
              <div class="flex items-center gap-2 mt-2">
                <Checkbox
                  v-model="pizza"
                  inputId="ingredient1"
                  name="pizza"
                  value="Cheese"
                />
                <label for="ingredient1">
                  <div class="flex justify-center items-center">
                    <p>
                      <span class="text-red-2">*</span>
                      {{ t("pages.auth.agree") }}
                    </p>
                    <button
                      type="button"
                      class="text-primary-1 px-1 underline font-semibold"
                      @click="visible = true"
                    >
                      {{ t("pages.auth.terms") }}
                    </button>
                  </div>
                </label>
              </div>
            </div>
            <div v-else-if="currentTab === 'provider'">
              <p class="text-start my-2">
                <span class="text-red-2">*</span>
                {{ t("pages.mobile_number") }}
              </p>
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
            <div class="md:px-0 px-2 mt-5">
              <ButtonAuth
                :imageSrc="'/arrow.png'"
                :loading="loading"
                type="submit"
                :label="t('pages.auth.login')"
                :disabled="loading"
                class="!mx-auto !justify-center !items-center !flex !bg-primary-1 text-white font-semibold"
              />
            </div>
          </div>
        </div>

        <div class="w-[100%] md:px-0 px-2">
          <BaseDialog v-model:visible="visible" class="w-full max-w-xl mx-2">
            <template #content>
              <span
                class="text-surface-500 text-start font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl"
              >
                {{ t("pages.auth.terms") }}
              </span>
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

const { macCookie } = storeToRefs(useLoginStore());
const { sendLogin } = useLoginStore();

const { list_countries, country } = storeToRefs(useCountries());
const { isAuth } = storeToRefs(useAuthStore());

const { getCountries } = useCountries();
const { logOutAuth } = useLogoutStore();

const phone = ref("");
const full_name = ref("");
const email = ref("");

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
import defaultImg from "/public/img/Avatar.png";
const loading = ref(false);
const validationSchema = yup.object({
  phone: yup
    .string()
    .trim()
    .required(t("validation.required"))
    .matches(/^[0-9]+$/, t("validation.only_digits"))
    .min(9, t("validation.min_n", { min: 9 }))
    .max(10, t("validation.max_n", { max: 10 })),
  full_name: yup
    .string()
    .trim()
    .required(t("validation.required"))
    .min(3, t("validation.min", { min: 3 }))
    .max(250, t("validation.max", { max: 250 })),

  email: yup
    .string()
    .email(t("validation.email"))
    .trim()
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net)$/,
      t("validation.emailDomain")
    ),
});

const fileInput = ref(null);
const defaultImage = ref(defaultImg);
const uploadedImage = ref("");

const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    uploadedImage.value = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

const removeImage = () => {
  uploadedImage.value = null;
};

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});
const pizza = ref();

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
const submit = handleSubmit(async () => {
  loading.value = true;
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
