<template>
  <!-- Loading Spinner -->

  <!-- Main Content -->
  <div
    class="grid grid-cols-12 md:container !mx-auto justify-center items-start"
  >
    <div class="md:col-span-3 col-span-1 mx-5 my-5">
      <ListBar />
    </div>
    <div class="md:col-span-9 col-span-11 my-5">
      <form @submit="submit" class="text-start space-y-10 mt-8 w-full">
        <!-- Card Container -->
        <div class="flex justify-start items-center">
          <div class="bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl">
            <!-- Header Section -->
            <div class="flex items-center justify-between border-b pb-4">
              <div class="flex items-center gap-x-2">
                <div
                  class="relative p-2 rounded-full bg-primary-2 cursor-pointer hover:bg-primary-3"
                >
                  <img
                    src="/settings.svg"
                    alt="user"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-bold text-sm">{{ t("pages.settings") }}</p>
                  <p class="font-semibold text-xs text-gray-700">
                    {{ t("pages.manage_your_profile") }}
                  </p>
                </div>
              </div>
            </div>

            <!-- Profile Information -->
            <div class="mt-6">
              <div class="flex flex-col items-start mt-4 justify-start">
                <p class="font-bold text-sm py-2">
                  {{ t("pages.edit_account") }}
                </p>
                <!-- Profile Image -->
                <div class="relative">
                  <Avatar
                    :image="profile.image || default_image"
                    class="rounded-full border bg-transparent relative border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80"
                    size="xlarge"
                    shape="circle"
                  />

                  <button
                    type="button"
                    @click="triggerFileInput"
                    class="absolute inset-0 transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-125 text-primary-2 cursor-pointer animate-bounce"
                  >
                    <i
                      class="pi pi-upload text-xl text-primary-1 flex justify-center items-center"
                    ></i>
                  </button>
                  <!-- <button
                    v-if="profile.image"
                    class="absolute top-3 left-3 transform -translate-x-1/2 -translate-y-1/2 text-red-2 rounded-full p-2 transition-transform duration-300 ease-in-out"
                    type="button"
                    @click="removeImage"
                  >
                    <i class="pi pi-times text-sm"></i>
                  </button> -->
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
                  <span class="text-gray-500">
                    {{ t("pages.optional") }}
                  </span>
                </p>
              </div>

              <!-- Name Input -->
              <p class="text-start my-2">
                <span class="text-red-2">*</span> {{ t("pages.name") }}
              </p>
              <div class="md:w-1/2 w-full">
                <InputForm
                  name="full_name"
                  :loading="loading"
                  v-model="profile.name"
                  type="text"
                  :placeholder="t('pages.name')"
                  class="w-full py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                >
                  <template #startIcon>
                    <img src="/img/name.svg" class="w-4" />
                  </template>
                </InputForm>
              </div>

              <!-- Email Input -->
              <p class="text-start my-2">
                <span class="text-red-2">*</span> {{ t("pages.auth.email") }}
              </p>
              <div class="md:w-1/2 w-full">
                <InputForm
                  name="email"
                  :loading="loading"
                  v-model="profile.email"
                  type="text"
                  :placeholder="t('pages.auth.email')"
                  class="w-full py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                >
                  <template #startIcon>
                    <img src="/img/email.svg" class="w-4" />
                  </template>
                </InputForm>
              </div>

              <div class="md:w-1/2 w-full" v-if="userInfo.type === 'company'">
                <p class="text-start my-2">
                  <span class="text-red-2 font-bold">*</span>
                  {{ t("pages.commercial_register") }}
                </p>
                <div class="relative col-span-12">
                  <InputForm
                    name="commercial_register"
                    :loading="loading"
                    v-model="profile.commercial_register"
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

              <p class="text-start my-2" v-if="userInfo.type === 'company'">
                <span class="text-red-2 font-bold">*</span>
                {{ t("pages.Commercial_Register_Image") }}
              </p>
              <div
                v-if="userInfo.type === 'company'"
                class="md:w-1/4 h-[50%] w-full border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
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

                <template v-if="profile.commercial_register_image">
                  <img
                    :src="profile.commercial_register_image"
                    class="w-full max-h-40 object-contain rounded-lg"
                  />
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
              <div>
                <ButtonAuth
                  :loading="loading"
                  type="submit"
                  :label="t('pages.save_edit')"
                  :disabled="loading"
                  class="!w-[25%] my-5 !bg-primary-1 text-white font-bold"
                />
              </div>

              <div
                class="flex flex-col items-start justify-between border-t pb-4"
              >
                <div class="flex flex-col items-start gap-x-2 mt-2">
                  <p class="font-bold text-xs">
                    {{ t("pages.change_phone") }}
                  </p>

                  <div>
                    <button
                      @click="navigate"
                      type="button"
                      class="bg-primary-2 px-8 py-2 rounded-lg mt-3"
                    >
                      <div class="flex items-center justify-center">
                        <p class="font-bold text-sm">
                          {{ t("pages.change_mobile_number") }}
                        </p>
                        <!-- <img src="/arrow_top.png" alt="image" /> -->
                      </div>
                    </button>
                  </div>
                </div>
              </div>
              <!--Notification-->
              <div class="flex items-center justify-start border-t py-2">
                <div>
                  <p class="font-bold text-sm">
                    {{ t("pages.enable_notifications") }}
                  </p>
                </div>
                <div>
                  <ToggleSwitch v-model="localChecked" class="mx-2 mt-1" />
                </div>
              </div>
              <!--delete account-->
              <div class="flex flex-col items-start justify-between border-t">
                <div
                  class="flex cursor-pointer text-red-2 justify-center items-center mt-5"
                >
                  <button
                    type="button"
                    class="w-full flex items-center justify-start"
                  >
                    <img src="/delete.svg" alt="delete_account" />
                    <p>{{ t("pages.delete_account") }}</p>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import default_image from "/public/img/Avatar.png";

import { Field, useForm } from "vee-validate";
import * as yup from "yup";
import { useCookie, useLocaleRoute, nextTick, navigateTo } from "#imports";

const { fetchData, resultData } = useFetchData();

const fileInput = ref(null);
const fileInputCompany = ref(null);
const token = ref("");

const { t } = useI18n();
const { userInfo } = storeToRefs(useAuthStore());
const { profile } = storeToRefs(useProfileStore());
const { getProfile } = useProfileStore();

const localePath = useLocalePath();

const navigate = () => {
  navigateTo(localePath("/auth/change_mobile_number_old"));
};

const loading = ref(true);

const validationSchema = computed(() => {
  return yup.object({
    full_name: yup
      .string()
      .trim()
      .required(t("validation.required"))
      .min(3, t("validation.min", { min: 3 }))
      .max(250, t("validation.max", { max: 250 })),
  });
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});

// Image Upload
const onFileChange = (e) => {
  const file = e.target.files[0];
  if (file) {
    profile.value.image = URL.createObjectURL(file);
  }
};

const triggerFileInput = () => {
  document.querySelector('input[type="file"]').click();
};

// const removeImage = () => {
//   profile.value.image = null;
// };

// Set up the form with VeeValidate

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
      profile.value.commercial_register_image = reader.result;
    };
    reader.readAsDataURL(file);
  }
};

const handleDrop = (event) => {
  event.preventDefault();
  const file = event.dataTransfer.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () =>
      (profile.value.commercial_register_image = reader.result);
    reader.readAsDataURL(file);
  }
};

// Wrapping the submit logic
const submit = handleSubmit(async () => {
  const formData = new FormData();

  fileInput.value.files[0] &&
    formData.append("image", fileInput.value.files[0] || default_image);
  profile.value.email && formData.append("email", profile.value.email || "");
  formData.append("name", profile.value.name || "");

  if (userInfo.value.type === "company") {
    profile.value.commercial_register &&
      formData.append(
        "commercial_register",
        profile.value.commercial_register || ""
      );
    // fileInputCompany.value.files[0] &&
    fileInputCompany.value.files[0] &&
      formData.append(
        "commercial_register_image",
        fileInputCompany.value.files[0]
      );
  }

  try {
    loading.value = true;

    await fetchData({
      url: `api/user/update/profile`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData,
      getSuccess: true,

      onSuccess: () => {
        const authCookie = useCookie("auth", {
          watch: true,
          sameSite: "lax",
          maxAge: 365 * 24 * 60 * 60,
        });
        authCookie.value = resultData.value;
        token.value = resultData.value.token;

        // nextTick(async () => {
        //   navigateTo(localeRoute({ name: "auth-Otp" }));
        // });
      },
    });
  } catch (error) {
    console.error("❌ Error in API request:", error);
  } finally {
    loading.value = false; // Ensures loading resets no matter what happens
  }
});

onMounted(async () => {
  try {
    await getProfile();
  } finally {
    loading.value = false; // Hide loading state after data is fetched
  }
});
</script>

<style scoped>
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
