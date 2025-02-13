<template>
  <div class="container mx-auto my-5">
    <div
      class="grid grid-cols-1 md:grid-cols-12 w-full space-y-5 md:space-y-0 text-white justify-center items-start text-sm mx-auto gap-5"
    >
      <!-- Text Section -->
      <div class="col-span-12 md:col-span-6 text-black px-5">
        <div v-if="loading" class="space-y-3 animate-pulse">
          <div class="h-6 bg-gray-300 rounded w-3/4"></div>
          <div class="h-6 bg-gray-300 rounded w-1/2"></div>
          <div class="h-4 bg-gray-300 rounded w-full"></div>
          <div class="h-10 bg-gray-400 rounded w-[30%]"></div>
        </div>

        <div v-else>
          <p class="text-black my-5 text-xl font-bold">
            {{ who_we_are.title }}
          </p>
          <p class="text-black my-5 text-xl font-bold">
            {{ who_we_are.description }}
          </p>
          <p class="text-black my-5">{{ who_we_are.content }}</p>
        </div>
      </div>

      <!-- Image Section -->
      <div class="col-span-12 md:col-span-6 flex justify-center px-5">
        <div class="w-full h-64 my-5 md:h-80 overflow-hidden rounded-lg">
          <img
            v-if="!loading"
            class="w-full h-full object-cover rounded-lg"
            :src="who_we_are.image"
            alt="Image"
          />
          <div
            v-else
            class="w-full h-full bg-gray-300 animate-pulse rounded-lg"
          ></div>
        </div>
      </div>
    </div>
  </div>

  <Footer />
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
const { userInfo } = storeToRefs(useAuthStore());
const who_we_are = ref({});
const loading = ref(true);

const { t } = useI18n();

const who_we_are_request = async () => {
  try {
    const url =
      userInfo.value.model_type == "provider"
        ? "api/static_page/provider_privacy"
        : "api/static_page/user_privacy";
    await fetchData({
      url,
      onSuccess: () => {
        who_we_are.value = resultData.value ?? {};
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  who_we_are_request();
});
</script>
<style scoped>
:deep(.p-button-text.p-button-secondary) {
  display: none !important;
}

.animate-pulse {
  animation: pulse 1.5s infinite;
}
</style>
