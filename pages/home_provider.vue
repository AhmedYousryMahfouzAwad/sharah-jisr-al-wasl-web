<template>
  <HomeCarousel :loading="loading" :sliders_list="sliders_list" />

  <div v-if="userInfo.category.id == 1" class="max-w-7xl mx-auto">
    <HomeTitle
      :src="'/elements.png'"
      class="my-5 flex"
      :title="t('pages.Requests')"
    />
    <p class="text-gray-900 font-bold text-2xl mb-5">
      {{ t("pages.new_orders") }}
    </p>
    <OrderProvider :loading="loading" :list_orders="list_orders" />
  </div>
  <div
    v-if="userInfo.category.id == 2 || userInfo.category.id == 3"
    class="max-w-7xl mx-auto"
  >
    <HomeTitle
      :src="'/elements.png'"
      class="my-5 flex"
      :title="t('pages.reviews')"
    />
    <div class="flex justify-between items-center">
      <p class="text-gray-900 font-bold text-2xl mb-5">
        {{ t("pages.customer_reviews") }}
      </p>

      <ButtonAuth class="!w-[10%]" />
    </div>

    <Rating :loading="loading" :list_rating="list_rating" />
  </div>
  <div class="relative">
    <HomeContactUs class="px-2" :loading="loading" :contacts="contacts" />
  </div>
  <Footer
    :socials="socials"
    :contacts="contacts"
    :app_description="app_description"
  />
</template>

<script setup>
import OrderProvider from "~/components/home/OrderProvider.vue";
import Rating from "~/components/home/Rating.vue";

const { t } = useI18n();

const { fetchData, resultData } = useFetchData();
const sliders_list = ref([]);
const categories = ref([]);
const loading = ref(true);
const who_we_are = ref({});
const contacts = ref({});
const socials = ref([]);
const list_orders = ref([]);
const list_rating = ref([]);
const app_description = ref("");
const { userInfo } = storeToRefs(useAuthStore());

const home = async () => {
  try {
    await fetchData({
      url: `api/provider/home`,
      onSuccess: () => {
        sliders_list.value = resultData.value?.banners ?? [];
        who_we_are.value = resultData.value?.who_we_are ?? {};
        categories.value = resultData.value?.categories ?? [];
        contacts.value = resultData.value?.contacts ?? {};
        socials.value = resultData.value?.socials ?? [];
        list_orders.value = resultData.value?.orders ?? [];
        list_rating.value = resultData.value?.rates ?? [];
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
