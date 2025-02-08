<template>
  <HomeCarousel :loading="loading" :sliders_list="sliders_list" />
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
const sliders_list = ref([]);
const loading = ref(true);

const home = async () => {
  try {
    await fetchData({
      url: `api/user/home`,
      onSuccess: () => {
        sliders_list.value = resultData.value?.banners ?? [];
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
