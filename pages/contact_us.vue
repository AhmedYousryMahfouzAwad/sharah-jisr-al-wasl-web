<template>
  <div class="w-full overflow-hidden cursor-pointer block">
    <div class="max-w-[55rem] py-[5rem] grid grid-cols-12 gap-5 mx-auto">
      <template v-if="loading">
        <div
          v-for="index in 3"
          :key="index"
          class="border-primary-1 container border-2 sm:col-span-4 col-span-12 md:mx-auto gap-3 p-10 rounded-lg bg-white shadow-sm flex w-full flex-col items-center animate-pulse"
        >
          <div class="h-5 w-32 bg-gray-300 rounded-md"></div>
          <div class="h-4 w-48 bg-gray-300 rounded-md mt-2"></div>
        </div>
      </template>

      <template v-else>
        <div
          v-for="(item, index) in [message, vision, mission]"
          :key="index"
          class="border-primary-1 container border-2 sm:col-span-4 col-span-12 md:mx-auto gap-3 p-10 rounded-lg bg-white shadow-sm flex w-full flex-col items-center"
        >
          <p class="text-gray-900 font-medium mt-1">{{ item.title }}</p>
          <p class="text-gray-900 font-medium mt-1">{{ item.content }}</p>
        </div>
      </template>
    </div>
  </div>

  <div class="relative">
    <HomeContactUs class="px-2" :loading="loading" :contacts="contacts" />
  </div>
  <Footer />
</template>

<script setup>
const { fetchData, resultData } = useFetchData();

const who_we_are = ref({});
const loading = ref(true);
const message = ref({});
const vision = ref({});
const mission = ref({});
const contacts = ref({});
const { t } = useI18n();

const who_we_are_request = async () => {
  try {
    await fetchData({
      url: `api/static_page/who_we_are`,
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
const details_contact = async () => {
  try {
    await fetchData({
      url: `api/details_contact`,
      onSuccess: () => {
        contacts.value = resultData.value ?? {};
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};
const our_section_request = async () => {
  try {
    await fetchData({
      url: `api/our_section`,
      onSuccess: () => {
        message.value = resultData.value.message ?? {};
        vision.value = resultData.value.vision ?? {};
        mission.value = resultData.value.mission ?? {};
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  our_section_request();
  who_we_are_request();
  details_contact();
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
