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
          <div class="bg-white shadow-2xl rounded-xl p-4 w-full max-w-3xl">
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
              <div class="mx-auto flex justify-start items-center">
                <Avatar
                  :image="profile.image ? profile.image : image"
                  class="mr-2 rounded-full border bg-transparent border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80"
                  size="xlarge"
                  shape="circle"
                />
              </div>

              <!-- Name Input -->
              <p class="text-start my-2">
                <span class="text-red-2">*</span> {{ t("pages.name") }}
              </p>
              <div class="md:w-1/2 w-full">
                <InputForm
                  readonly
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

              <!-- Phone Input -->
              <p class="text-start my-2">
                <span class="text-red-2">*</span>
                {{ t("pages.mobile_number") }}
              </p>
              <div class="md:w-1/2 w-full">
                <div class="grid grid-cols-12 gap-2 w-full">
                  <!-- Country Select -->
                  <div
                    class="col-span-3 h-full flex justify-center items-center border-2 text-sm rounded-lg !bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-1"
                  >
                    {{ profile.country_code }}
                  </div>

                  <!-- Phone Number -->
                  <div class="col-span-9">
                    <InputForm
                      readonly
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

              <!-- Email Input -->
              <p class="text-start my-2">
                <span class="text-red-2">*</span> {{ t("pages.auth.email") }}
              </p>
              <div class="md:w-1/2 w-full">
                <InputForm
                  readonly
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

              <div v-if="userInfo.type === 'company'" class="md:w-1/2 w-full">
                <p class="text-start my-2">
                  <span class="text-red-2 font-bold">*</span>
                  {{ t("pages.commercial_register") }}
                </p>
                <div class="relative col-span-12">
                  <InputForm
                    readonly
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
              <p v-if="userInfo.type === 'company'" class="text-start my-2">
                <span class="text-red-2 font-bold">*</span>
                {{ t("pages.Commercial_Register_Image") }}
              </p>
              <div v-if="userInfo.type === 'company'" class="md:w-1/4 w-full">
                <div
                  class="border-2 border-dashed border-gray-300 rounded-lg p-1 flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100"
                >
                  <img :src="profile.commercial_register_image" alt="image" />
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
import image from "/public/img/Avatar.png";

const { t } = useI18n();
const { userInfo } = storeToRefs(useAuthStore());
const { profile } = storeToRefs(useProfileStore());
const { getProfile } = useProfileStore();
const loading = ref(true);
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
