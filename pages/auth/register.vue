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
            class="font-bold my-1 md:text-sm text-xs text-center text-gray-600"
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
                <!--   Individual -->
                <button
                  type="button"
                  @click="activeSubTab = 'person'"
                  :class="
                    activeSubTab === 'person'
                      ? 'bg-primary-1 text-white'
                      : 'bg-primary-2 text-gray-600'
                  "
                  class="col-span-6 text-center font-bold rounded-full py-2"
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
                  class="col-span-6 text-center font-bold rounded-full py-2"
                >
                  {{ t("pages.company") }}
                </button>
              </div>

              <div
                class="flex flex-col items-center mt-4 justify-center mx-auto"
              >
                <div class="flex">
                  <!-- Profile Image -->
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

              <!--  individual -->
              <div v-if="activeSubTab === 'person'" class="text-center">
                <p class="text-start my-2">
                  <span class="text-red-2">*</span>
                  {{ t("pages.name") }}
                </p>

                <!-- Name Input individual -->
                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Name Input individual -->
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

                <!-- Phone Input  individual-->
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

                <!-- Email individual -->
                <p class="text-start my-2">
                  <span class="text-red-2">*</span>
                  {{ t("pages.auth.email") }}
                </p>

                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Email individual -->
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

              <!--company-->
              <div v-else-if="activeSubTab === 'company'" class="text-center">
                <p class="text-start my-2">
                  <span class="text-red-2 font-bold">*</span>
                  {{ t("pages.name") }}
                </p>

                <!-- Name Input individual -->
                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Name Input individual -->
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
                  <span class="text-red-2 font-bold">*</span>
                  {{ t("pages.mobile_number") }}
                </p>

                <!-- Phone Input  company-->
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

                <!-- Email company -->
                <p class="text-start my-2">
                  <span class="text-red-2 font-bold">*</span>
                  {{ t("pages.auth.email") }}
                </p>

                <div class="w-full grid grid-cols-12 gap-2">
                  <!-- Email co -->
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

                <p class="text-start my-2">
                  <span class="text-red-2 font-bold">*</span>
                  {{ t("pages.commercial_register") }}
                </p>

                <div class="w-full grid grid-cols-12 gap-2">
                  <div class="relative col-span-12">
                    <InputForm
                      name="commercial_register"
                      :loading="loading"
                      v-model="commercial_register"
                      type="text"
                      :placeholder="t('pages.commercial_register')"
                      class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/report.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>

                <div class="w-full">
                  <p class="text-start my-2">
                    <span class="text-red-2 font-bold">*</span>
                    {{ t("pages.Commercial_Register_Image") }}
                  </p>

                  <div
                    class="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                    @dragover.prevent
                    @drop="handleDrop"
                    @click="triggerFileInputCompany"
                  >
                    <input
                      type="file"
                      ref="fileInputCompany"
                      class="hidden"
                      @change="handleFileUpload"
                      accept="image/*"
                    />

                    <template v-if="imagePreview">
                      <img
                        :src="imagePreview"
                        class="w-full max-h-40 object-contain rounded-lg"
                      />
                      <button
                        @click.stop="removeImageCompany"
                        class="mt-2 px-4 py-1 bg-red-500 text-white rounded-md"
                      >
                        {{ t("pages.remove") }}
                      </button>
                    </template>

                    <template v-else>
                      <svg
                        width="23"
                        height="22"
                        viewBox="0 0 23 22"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M18.25 1.0625C18.25 0.648286 17.9142 0.3125 17.5 0.3125C17.0858 0.3125 16.75 0.648286 16.75 1.0625V4.3125H13.5C13.0858 4.3125 12.75 4.64829 12.75 5.0625C12.75 5.47671 13.0858 5.8125 13.5 5.8125H16.75V9.0625C16.75 9.47671 17.0858 9.8125 17.5 9.8125C17.9142 9.8125 18.25 9.47671 18.25 9.0625V5.8125H21.5C21.9142 5.8125 22.25 5.47671 22.25 5.0625C22.25 4.64829 21.9142 4.3125 21.5 4.3125H18.25V1.0625Z"
                          fill="#757575"
                        />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M11 1.3125L10.9428 1.3125C8.75212 1.31249 7.03144 1.31248 5.68802 1.49309C4.31137 1.67818 3.21911 2.06521 2.36091 2.92341C1.50272 3.78161 1.11568 4.87387 0.930594 6.25052C0.749976 7.59394 0.749987 9.31462 0.75 11.5053V11.6197C0.749987 13.8104 0.749976 15.5311 0.930594 16.8745C1.11568 18.2511 1.50272 19.3434 2.36091 20.2016C3.21911 21.0598 4.31137 21.4468 5.68802 21.6319C7.03144 21.8125 8.7521 21.8125 10.9428 21.8125H11.0572C13.2479 21.8125 14.9686 21.8125 16.312 21.6319C17.6886 21.4468 18.7809 21.0598 19.6391 20.2016C20.4973 19.3434 20.8843 18.2511 21.0694 16.8745C21.25 15.5311 21.25 13.8104 21.25 11.6197V11.0625C21.25 10.6483 20.9142 10.3125 20.5 10.3125C20.0858 10.3125 19.75 10.6483 19.75 11.0625V11.5625C19.75 12.8315 19.7495 13.8985 19.7198 14.8084C18.7948 14.4801 17.8458 14.3118 16.8875 14.3126C15.2587 14.3065 13.6642 14.7833 12.1681 15.6904C11.8405 15.3754 11.4922 15.0776 11.1244 14.7989C8.92785 13.1345 6.17813 12.2577 3.36512 12.3152C2.99284 12.3145 2.6209 12.3291 2.25036 12.359C2.25002 12.1026 2.25 11.8373 2.25 11.5625C2.25 9.30213 2.25159 7.6823 2.41722 6.4504C2.57994 5.24007 2.88853 4.51712 3.42157 3.98407C3.95462 3.45103 4.67757 3.14244 5.8879 2.97972C7.1198 2.81409 8.73963 2.8125 11 2.8125C11.4142 2.8125 11.75 2.47671 11.75 2.0625C11.75 1.64829 11.4142 1.3125 11 1.3125ZM13.1997 16.8244C14.0153 17.8523 14.6408 19.0088 15.043 20.2456C15.43 20.2217 15.7847 20.1893 16.1121 20.1453C17.3224 19.9826 18.0454 19.674 18.5784 19.1409C19.1115 18.6079 19.4201 17.8849 19.5828 16.6746C19.5958 16.5778 19.6078 16.4787 19.6189 16.377C18.715 15.9987 17.7994 15.8116 16.8872 15.8126L16.8835 15.8126C15.6513 15.8077 14.4099 16.1421 13.1997 16.8244ZM10.2185 15.9945C11.721 17.133 12.8403 18.6275 13.4728 20.3005C12.7445 20.3122 11.926 20.3125 11 20.3125C8.73963 20.3125 7.1198 20.3109 5.8879 20.1453C4.67757 19.9826 3.95462 19.674 3.42157 19.1409C2.88853 18.6079 2.57994 17.8849 2.41722 16.6746C2.31416 15.9081 2.27461 14.9914 2.25944 13.8636C2.62838 13.8304 2.99909 13.8142 3.37022 13.8152L3.38794 13.815C5.87572 13.7624 8.2965 14.5381 10.2185 15.9945Z"
                          fill="#757575"
                        />
                      </svg>
                    </template>
                  </div>
                </div>
              </div>
              <div class="w-full gap-2 mt-5">
                <div class="flex items-center gap-2">
                  <Checkbox
                    v-model="check_box"
                    inputId="ingredient1"
                    name="check_box"
                    :value="true"
                  />

                  <label
                    for="ingredient1"
                    class="text-start text-sm font-bold my-2 flex"
                  >
                    <span class="text-red-2 px-1 flex">*</span>
                    {{ t("pages.auth.agree") }}
                    <button
                      type="button"
                      @click="visible = true"
                      class="text-primary-1 px-2"
                    >
                      {{ t("pages.terms_conditions") }}
                    </button>
                  </label>
                </div>
              </div>
              <div class="md:px-0 px-2 mt-5">
                <ButtonAuth
                  :imageSrc="'/arrow.png'"
                  :loading="loading"
                  type="submit"
                  :label="t('pages.auth.login')"
                  :disabled="loading"
                  class="!mx-auto !justify-center !items-center !flex !bg-primary-1 text-white font-bold"
                />
              </div>
              <div class="w-[100%] md:px-0 px-2">
                <BaseDialog
                  v-model:visible="visible"
                  :header="t('pages.auth.terms')"
                  class="w-full max-w-xl mx-2"
                >
                  <template #content>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quae expedita nesciunt excepturi harum similique eos
                    assumenda odit, delectus debitis, eaque fugit et mollitia
                    minus incidunt! Inventore maxime alias neque exercitationem.
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
            </div>

            <div v-else-if="currentTab === 'provider'">
              <RegisterProvider />
            </div>
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
// import
import illustration from "../../public/img/Illustration.png";
const { fetchData, resultData } = useFetchData();
import { useCookie, useLocaleRoute, nextTick, navigateTo } from "#imports";

import { Field, useForm } from "vee-validate";
import * as yup from "yup";
import defaultImage from "/public/img/Avatar.png";

//store
const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();

//router
const localeRoute = useLocaleRoute();

// i18n
const { t } = useI18n();

const activeSubTab = ref("person");
const currentTab = ref("client");
const check_box = ref(false);
const visible = ref(false);
const phone = ref("");
const full_name = ref("");
const email = ref("");
const commercial_register = ref("");
const fileInput = ref(null);
const uploadedImage = ref(null);
const fileInputCompany = ref(null);
const imagePreview = ref(null);
const loading = ref(false);

const validationSchema = computed(() => {
  return yup.object({
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

    commercial_register:
      activeSubTab.value === "company"
        ? yup.string().trim().required(t("validation.required"))
        : yup.string().notRequired(),
  });
});

// Image Upload
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

const triggerFileInputCompany = () => {
  fileInputCompany.value.click();
};

const handleFileUpload = async (event) => {
  const file = event.target.files[0];

  if (file) {
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      imagePreview.value = reader.result;
    };
    reader.readAsDataURL(file);

    const formData = new FormData();
    formData.append("commercial_register_image", file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => (imagePreview.value = reader.result);
    reader.readAsDataURL(file);
  }
};

const removeImageCompany = () => {
  imagePreview.value = null;
};

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
  if (!check_box.value) {
    alert("يجب الموافقة على الشروط والأحكام.");
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.value.files[0] || "");
  formData.append("phone", phone.value || "");
  formData.append("name", full_name.value || "");
  formData.append("email", email.value || "");
  formData.append("country_code", country.value?.key || "+20");
  formData.append("type", activeSubTab.value);
  formData.append("is_terms", Boolean(check_box.value));
  formData.append("device_id", "111");
  formData.append("device_type", "web");

  if (activeSubTab.value === "company" && fileInputCompany.value.files[0]) {
    formData.append("commercial_register", commercial_register.value || "");
    formData.append(
      "commercial_register_image",
      fileInputCompany.value.files[0]
    );
  }

  try {
    loading.value = true;

    await fetchData({
      url: `api/user/register`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData,
      getSuccess: true,

      onSuccess: () => {
        useCookie("country_code").value = country.value.key;
        useCookie("phone").value = phone.value;

        const authCookie = useCookie("auth", {
          watch: true,
          sameSite: "lax",
          maxAge: 365 * 24 * 60 * 60,
        });
        authCookie.value = resultData.value;

        nextTick(async () => {
          navigateTo(localeRoute({ name: "auth-Otp" }));
        });
      },
    });
  } catch (error) {
    console.error("❌ Error in API request:", error);
  } finally {
    loading.value = false; // Ensures loading resets no matter what happens
  }
});

// await fetchData({
//   url: `api/user/register`,
//   method: "post",
//   headers: {
//     "content-type": "multipart/form-data",
//   },
//   body: formData,
//   getSuccess: true,

//   onSuccess: () => {},
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
