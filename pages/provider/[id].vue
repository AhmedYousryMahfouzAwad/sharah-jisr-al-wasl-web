<template>
  <div>
    <div
      class="relative w-full h-[150px] md:h-[150px] lg:h-[200px] overflow-hidden"
    >
      <!-- Background Image (Skeleton Loader) -->
      <div
        v-if="!banner || !banner.image"
        class="absolute inset-0 bg-gray-300 animate-pulse"
      ></div>

      <!-- Banner Image -->
      <img
        v-if="banner && banner.image"
        :src="banner.image"
        alt="Banner"
        class="absolute inset-0 w-full h-full object-cover"
      />

      <!-- Overlay Gradient -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-black/50"
      ></div>

      <!-- Content -->
      <div
        class="absolute inset-0 flex flex-col justify-start mt-5 items-start text-center text-white px-6"
      >
        <!-- Breadcrumb -->
        <p
          v-if="banner && banner.title"
          class="text-xs md:text-sm font-light opacity-80"
        >
          {{ t("pages.home") }} <span class="mx-2">›</span>
          {{ banner.title }}
        </p>

        <!-- Title -->
        <h1
          class="text-lg md:text-lg font-bold mt-2"
          v-if="banner && banner.title"
        >
          {{ banner.title }}
        </h1>

        <!-- Title Skeleton Loader -->
        <div
          v-else
          class="w-48 h-6 bg-gray-400 animate-pulse rounded mt-2"
        ></div>
      </div>
    </div>

    <div class="max-w-7xl mx-auto my-5 grid grid-cols-12 gap-4">
      <div class="col-span-9">
        <div class="grid grid-cols-3">
          <HomeProviderCard
            v-for="provider in list_provider"
            :key="provider.id"
            :image="provider.image"
            :name="provider.name"
            :address="provider.map_desc"
            :city="provider.city"
            :rating="provider.rate_avg"
          />
        </div>
      </div>

      <div class="col-span-3">
        <div class="flex flex-col gap-4">scsafsafsa</div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
const route = useRoute();
const banner = ref(null);
const list_provider = ref([]);
const { t } = useI18n();

const getBanner = async () => {
  try {
    await fetchData({
      url: `api/banners/${route.params.id}`,
      onSuccess: () => {
        banner.value = Array.isArray(resultData.value)
          ? resultData.value[0]
          : resultData.value;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  }
};
const getProvider = async () => {
  try {
    await fetchData({
      url: `api/user/providers`,
      params: { category_id: route.params.id },
      onSuccess: () => {
        list_provider.value = resultData.value.data;
        console.log(list_provider.value);
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  }
};

// onMounted(getBanner, getProvider);
onMounted(() => {
  getProvider();
  getBanner();
});
</script>
