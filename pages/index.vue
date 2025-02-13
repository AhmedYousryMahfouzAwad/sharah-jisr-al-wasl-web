<template>
  <HomeCarousel :loading="loading" :sliders_list="sliders_list" />
  <div class="max-w-7xl mx-auto my-10">
    <HomeWhoWeAre :loading="loading" :who_we_are="who_we_are" />
  </div>
  <HomeWhatWeOffer class="px-2" :loading="loading" :categories="categories" />
  <div class="relative">
    <HomeContactUs class="px-2" :loading="loading" :contacts="contacts" />
  </div>
  <Footer />
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
const sliders_list = ref([]);
const categories = ref([]);
const loading = ref(true);
const who_we_are = ref({});
const contacts = ref({});
const socials = ref([]);
const app_description = ref("");

const home = async () => {
  try {
    await fetchData({
      url: `api/user/home`,
      onSuccess: () => {
        sliders_list.value = resultData.value?.banners ?? [];
        who_we_are.value = resultData.value?.who_we_are ?? {};
        categories.value = resultData.value?.categories ?? [];
        contacts.value = resultData.value?.contacts ?? {};
        socials.value = resultData.value?.socials ?? [];
        app_description.value = resultData.value?.app_description ?? "";
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  home();
});
</script>
<style scoped>
:deep(.p-button-text.p-button-secondary) {
  display: none !important;
}
</style>
