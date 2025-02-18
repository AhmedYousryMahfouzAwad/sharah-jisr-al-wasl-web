<template>
  <!-- Loading Spinner -->
  <div v-if="loading" class="flex justify-center items-center min-h-screen">
    <div
      class="animate-spin rounded-full h-20 w-10 border-t-2 border-primary-1"
    ></div>
  </div>

  <!-- Main Content -->
  <div
    v-else
    class="grid grid-cols-12 lg:container !mx-auto justify-center items-start"
  >
    <div class="lg:col-span-3 md:col-span-5 col-span-1 mx-5 my-5">
      <ListBar />
    </div>
    <div class="lg:col-span-9 md:col-span-7 col-span-11 my-5">
      <form @submit.prevent="submit" class="text-start space-y-10 mt-8 w-full">
        <!-- Card Container -->
        <div class="flex justify-start items-center">
          <div class="bg-white shadow-2xl rounded-xl p-8 w-full max-w-3xl">
            <!-- Header Section -->

            <div class="flex items-center justify-between border-b pb-4">
              <div class="flex items-center gap-x-2">
                <div
                  class="relative p-2 rounded-full bg-primary-2 cursor-pointer"
                >
                  <img
                    src="/user.svg"
                    alt="user"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-bold text-sm">{{ t("pages.profile") }}</p>
                  <p class="font-semibold text-xs text-gray-700">
                    {{ t("pages.view_your_profile") }}
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

              <div class="grid grid-cols-12 gap-2">
                <!-- Name Input -->
                <div class="md:col-span-6 col-span-12">
                  <p class="text-start font-bold my-2">
                    <span class="text-red-2">*</span> {{ t("pages.name") }}
                  </p>
                  <div class="w-full">
                    <InputForm
                      :loading="loading"
                      v-model="profile.name"
                      name="name"
                      type="text"
                      :placeholder="t('pages.name')"
                      class="w-full py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/img/name.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>
                <!-- name_bank Input -->
                <div
                  v-if="userInfo.category.id === 1"
                  class="md:col-span-6 col-span-12"
                >
                  <div class="relative col-span-12">
                    <InputForm
                      :loading="loading"
                      name="name_bank"
                      v-model="profile.bank_name"
                      :label="t('pages.auth.name_bank')"
                      type="text"
                      :placeholder="t('pages.auth.name_bank')"
                      class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/home.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>

                <!-- phone Input -->
                <div class="md:col-span-6 col-span-12">
                  <p class="text-start font-bold my-2">
                    <span class="text-red-2">*</span>
                    {{ t("pages.mobile_number") }}
                  </p>
                  <div class="w-full">
                    <div class="grid grid-cols-12 gap-2 w-full">
                      <!-- Country Select -->
                      <div
                        class="col-span-3 gap-1 h-full flex justify-center items-center border-2 text-sm rounded-lg !bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-1"
                      >
                        <img :src="profile.city.country.flag" alt="flag" />
                        {{ profile.country_code }}
                      </div>

                      <!-- Phone Number -->
                      <div class="col-span-9">
                        <InputForm
                          name="phone"
                          :loading="loading"
                          v-model="profile.phone"
                          type="text"
                          :placeholder="t('pages.mobile_number')"
                          class="py-2 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Name Account Input -->
                <div
                  v-if="userInfo.category.id === 1"
                  class="md:col-span-6 col-span-12"
                >
                  <div class="relative col-span-12">
                    <InputForm
                      :loading="loading"
                      name="account_name"
                      v-model="profile.account_name"
                      :label="t('pages.auth.Name_of_the_account_holder')"
                      type="text"
                      :placeholder="t('pages.auth.Name_of_the_account_holder')"
                      class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/home.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>
                <!-- email Input -->
                <div class="md:col-span-6 col-span-12">
                  <p class="text-start my-2 font-bold">
                    <span class="text-red-2">*</span>
                    {{ t("pages.auth.email") }}
                  </p>
                  <div class="w-full">
                    <InputForm
                      :loading="loading"
                      name="email"
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
                </div>
                <!-- Account Number -->
                <div
                  v-if="userInfo.category.id === 1"
                  class="md:col-span-6 col-span-12"
                >
                  <div class="relative col-span-12">
                    <InputForm
                      :loading="loading"
                      name="account_number"
                      v-model="profile.account_number"
                      :label="t('pages.auth.account_number')"
                      type="text"
                      :placeholder="t('pages.auth.account_number')"
                      class="w-full py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/home.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>

                <!--main-->
                <div class="md:col-span-6 col-span-12">
                  <div class="relative w-full">
                    <InputForm
                      v-model="profile.category.name"
                      name="main_category"
                      :label="t('pages.main_category')"
                      type="text"
                      :placeholder="t('pages.main_category')"
                      class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2"
                    >
                    </InputForm>
                  </div>
                </div>

                <!-- iban -->
                <div
                  v-if="userInfo.category.id === 1"
                  class="md:col-span-6 col-span-12"
                >
                  <div class="relative col-span-12">
                    <InputForm
                      name="iban"
                      :loading="loading"
                      v-model="profile.iban"
                      :label="t('pages.auth.iban')"
                      type="text"
                      :placeholder="t('pages.auth.iban')"
                      class="w-full py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/home.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>
                <!--choose_city-->
                <div class="md:col-span-6 col-span-12">
                  <div>
                    <p class="text-start my-2 font-bold">
                      <span class="text-red-2">*</span>
                      {{ t("pages.choose_city") }}
                    </p>

                    <Select
                      v-model="profile.city.id"
                      :options="list_cities"
                      optionLabel="name"
                      optionValue="id"
                      :placeholder="t('pages.choose_city')"
                      class="w-full border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-700"
                    />
                  </div>
                </div>
                <!--CommercialNumber-->
                <div class="md:col-span-6 col-span-12">
                  <div class="relative">
                    <InputForm
                      name="commercial_register"
                      :loading="loading"
                      v-model="profile.commercial_register"
                      type="text"
                      :label="t('pages.commercial_register')"
                      :placeholder="t('pages.commercial_register')"
                      class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                    >
                      <template #startIcon>
                        <img src="/report.svg" class="w-4" />
                      </template>
                    </InputForm>
                  </div>
                </div>

                <!--map-->
                <div class="md:col-span-6 col-span-12">
                  <div class="relative w-full">
                    <InputForm
                      name="map"
                      v-model="sendedAddress"
                      readonly
                      :label="t('pages.location_map')"
                      type="text"
                      :placeholder="t('pages.location_map')"
                      class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2"
                      @click="openModal"
                    >
                      <template #endIcon>
                        <div class="flex items-center ps-3">
                          <img
                            class="h-5 w-5 text-gray-500 float-right"
                            style="transform: scaleX(-1)"
                            alt="Map icon"
                            src="/location.png"
                          />
                        </div>
                      </template>
                    </InputForm>
                  </div>

                  <Dialog
                    v-model:visible="visible_map"
                    :style="{ width: '25rem' }"
                  >
                    <div>
                      <OnlineStoreMapComp
                        @getLocation="getMyLoc"
                        :currentLocation="true"
                      />
                    </div>
                    <Button
                      type="button"
                      :label="t('pages.cancel')"
                      severity="secondary"
                      class="w-full mt-5 rounded-3xl"
                      @click="visible = false"
                    ></Button>
                  </Dialog>
                </div>

                <div class="md:col-span-6 col-span-12">
                  <!--CommercialImage-->
                  <p class="text-start my-2">
                    <span class="text-red-2 font-bold">*</span>
                    {{ t("pages.Commercial_Register_Image") }}
                  </p>
                  <div
                    class="w-[50%] border-2 border-dashed border-gray-300 rounded-lg p-3 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
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
                        class="w-full max-h-16 object-contain rounded-lg"
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
                </div>
                <div class="md:col-span-6 col-span-12">
                  <ButtonAuth
                    :loading="loading"
                    type="submit"
                    :label="t('pages.save_edit')"
                    :disabled="loading"
                    class="my-5 !w-[50%] !bg-primary-1 text-sm text-white font-bold"
                    @click="submit"
                  />
                </div>
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
                      class="bg-primary-2 px-16 !w-[100%] py-2 rounded-lg mt-3"
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
                  <ToggleSwitch class="mx-2 mt-1" />
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
const { list_cities } = storeToRefs(useCountries());
const { getCities } = useCountries();
const localePath = useLocalePath();

const { t } = useI18n();
const { userInfo } = storeToRefs(useAuthStore());
const { profile } = storeToRefs(useProfileProviderStore());
const { getProfileProvider } = useProfileProviderStore();
const loading = ref(false);

const fileInput = ref(null);
const fileInputCompany = ref(null);
const token = ref("");
const visible_map = ref(false);

const navigate = () => {
  navigateTo(localePath("/auth/change_mobile_number_old"));
};

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

const validationSchema = computed(() => {
  return yup.object({
    name: yup
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

function openModal() {
  visible_map.value = true;
}

const sendedLat = ref("32.2215");
const sendedLng = ref("29.5156");
const sendedAddress = ref("fsdfsdfdsfsdfsdfsdfالمنصوره");

// const sendedLat = ref(null);
// const sendedLng = ref(null);
// const sendedAddress = ref(profile.value.map_desc);

// get lat, lng, address from change marker position
const getMyLoc = (lat, lng, address) => {
  sendedLat.value = lat;
  sendedLng.value = lng;
  sendedAddress.value = address;
  visible.value = false;
};

defineExpose({
  sendedLat,
  sendedLng,
});

onMounted(async () => {
  try {
    loading.value == true;
    await getProfileProvider();
    await getCities();
  } finally {
    loading.value == false; // Hide loading state after data is fetched
  }
});

// Wrapping the submit logic
const submit = handleSubmit(async () => {
  const formData = new FormData();

  formData.append("lat", sendedLat.value);
  formData.append("lng", sendedLng.value);
  formData.append("map_desc", sendedAddress.value);

  fileInput.value.files[0] &&
    formData.append("image", fileInput.value.files[0] || default_image);
  profile.value.email && formData.append("email", profile.value?.email || "");
  profile.value.name && formData.append("name", profile.value?.name || "");
  profile.value.city &&
    formData.append("city_id", profile.value?.city?.id || "");
  profile.value.category &&
    formData.append("category_id", profile.value?.category?.id || "");
  profile.value.account_name &&
    formData.append("bank_name", profile.value?.account_name || "");
  profile.value.account_name &&
    formData.append("bank_name", profile.value?.bank_name || "");
  profile.value.iban && formData.append("bank_name", profile.value?.iban || "");
  profile.value.iban &&
    formData.append("account_number", profile.value?.account_number || "");
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

  try {
    loading.value = true;

    await fetchData({
      url: `api/provider/profile/update`,
      method: "post",
      headers: {
        "content-type": "multipart/form-data",
      },
      body: formData,
      getSuccess: true,

      onSuccess: () => {
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
