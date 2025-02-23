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
      <!-- Sidebar -->
      <div class="col-span-12 lg:col-span-3 md:col-span-5">
        <div class="grid grid-cols-1 px-1 md:grid-cols-1">
          <label class="text-start gap-x-2 text-sm font-bold">{{
            t("inputs.site_search.label")
          }}</label>
          <div class="flex flex-col sm:flex-row w-full gap-2">
            <div
              class="flex border border-gray-300 rounded-lg overflow-hidden w-full"
            >
              <input
                type="text"
                v-model="searchQuery"
                class="w-full px-2 py-2 text-start outline-none"
                :placeholder="t('inputs.site_search.placeholder_dot')"
              />

              <span class="flex items-center px-3 text-gray-400"> 🔍 </span>
            </div>

            <button
              @click="fetchProviders"
              class="bg-primary-1 text-white px-4 rounded-lg py-2 w-full sm:w-auto"
            >
              {{ t("inputs.site_search.name") }}
            </button>
          </div>

          <div class="bg-white p-4">
            <h3 class="text-start font-semibold text-lg">
              {{ t("pages.sort") }}
            </h3>

            <div class="mt-4">
              <h4 class="text-start my-2 font-semibold text-md text-primary-1">
                {{ t("inputs.city.label") }}
              </h4>
              <div
                class="mt-2 space-y-2 w-full max-h-[300px] overflow-y-auto p-2 custom-scrollbar"
              >
                <div
                  v-for="city in list_cities"
                  :key="city.key"
                  class="flex items-center gap-2"
                >
                  <Checkbox
                    v-model="selectedCity"
                    :inputId="String(city.id)"
                    name="city"
                    :value="city.id"
                  />

                  <label :for="city.id">{{ city.name }}</label>
                </div>
              </div>
            </div>

            <div class="border-t border-dashed border-primary-2 my-4"></div>
            <div class="mt-4">
              <h4 class="text-start my-2 font-semibold text-md text-primary-1">
                {{ t("pages.activity") }}
              </h4>
              <div
                class="mt-2 space-y-2 w-full max-h-[300px] overflow-y-auto p-2 custom-scrollbar"
              >
                <div
                  v-for="activity in list_activities"
                  :key="activity.key"
                  class="flex items-center gap-2"
                >
                  <Checkbox
                    v-model="selectedActivity"
                    :inputId="activity.id"
                    name="activity"
                    :value="activity.id"
                  />
                  <label :for="activity.id">{{ activity.name }}</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Main Content -->
      <div class="col-span-12 lg:col-span-9 md:col-span-7">
        <div class="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4">
          <!-- Skeleton Loading -->
          <template v-if="globalLoading">
            <div
              v-for="n in 6"
              :key="n"
              class="p-4 bg-white rounded-lg shadow animate-pulse"
            >
              <div class="h-40 bg-gray-300 rounded"></div>
              <div class="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
              <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
              <div class="mt-2 h-4 bg-gray-200 rounded w-1/3"></div>
            </div>
          </template>

          <!-- Display Providers -->
          <template v-else-if="list_provider.length > 0">
            <HomeProviderCard
              v-for="provider in list_provider"
              :key="provider.id"
              :image="provider.image"
              :name="provider.name"
              :address="provider.map_desc"
              :city="provider.city"
              :rating="parseFloat(provider.rate_avg)"
              :is_favored="provider.is_favored"
              :id="provider.id"
              @toggle-favorite="handleToggleFavorite"
              :to="
                localeRoute({
                  name: 'show-id',
                  params: { id: provider.id },
                })
              "
            />
          </template>

          <!-- No Providers Found -->
          <template v-else>
            <div
              class="col-span-12 flex flex-col items-center justify-center text-center p-10"
            >
              <img
                src="/public/no_data.png"
                alt="No Data"
                class="w-40 h-40 mb-4"
              />
              <h3 class="text-lg font-semibold text-primary-1">
                {{ t("pages.no_providers_found") }}
              </h3>
            </div>
          </template>
        </div>

        <!-- Pagination -->
        <div class="!border-none mt-5">
          <div class="mt-5" v-if="!globalLoading && pagination.total_pages > 1">
            <Paginator
              :totalRecords="pagination.total_items"
              :rows="pagination.per_page"
              :first="(pagination.current_page - 1) * pagination.per_page"
              @page="onPageChange"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
const { list_activities, list_cities } = storeToRefs(useCountries());
const { getActivities, getCities } = useCountries();
const route = useRoute();
const banner = ref(null);
const list_provider = ref([]);
const { t } = useI18n();
const page = ref(1);
const globalLoading = ref(false);
const checked = ref(false);
const selectedCity = ref(null);
const selectedActivity = ref(null);
const searchQuery = ref("");
const localeRoute = useLocaleRoute();

const pagination = ref({
  total_items: 0,
  per_page: 10,
  total_pages: 1,
  current_page: 1,
});

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

const getProvider = async (pageNumber = 1) => {
  const params = {
    category_id: route.params.id,
    paginate: pageNumber,
    cities: selectedCity.value || [],
    activities: selectedActivity.value || [],
    name: searchQuery.value.trim() || null, // ✅ ترميز النص
  };

  console.log("🔍 Sending request with params:", params); // ✅ Debugging

  globalLoading.value = true;
  try {
    await fetchData({
      url: `api/user/providers`,
      params,
      onSuccess: () => {
        console.log("✅ Response received:", resultData.value); // ✅ Debugging
        list_provider.value = resultData.value.data;
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = pageNumber;
        globalLoading.value = false;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching providers:", error);
    globalLoading.value = false;
  }
};

const fetchProviders = () => {
  getProvider(1); // تحميل البيانات عند البحث مع تصفير الصفحة
};

const onPageChange = (event) => {
  if (!pagination.value || typeof event.page !== "number") return;

  page.value = event.page + 1;
  getProvider(page.value);
};

const handleToggleFavorite = async (providerId) => {
  try {
    const provider = list_provider.value.find((p) => p.id === providerId);
    if (!provider) return;
    await fetchData({
      url: `/api/user/favorites/toggle/${providerId}`,
      method: "post",
      getSuccess: true,
      onSuccess: () => {
        provider.is_favored = !provider.is_favored; // ✅ يعكس الحالة بعد نجاح الطلب
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  }
};

onMounted(() => {
  getProvider();
  getBanner();
  getCities();
  getActivities();
});
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 8px;
}

.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb {
  @apply bg-primary-1;
  border-radius: 4px;
}

.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-1;
}
</style>
