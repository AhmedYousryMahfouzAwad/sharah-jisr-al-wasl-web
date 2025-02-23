<template>
  <!-- Main Content -->
  <div
    class="grid grid-cols-12 lg:container !mx-auto justify-center items-start"
  >
    <div class="lg:col-span-3 md:col-span-5 col-span-1 mx-5 my-5">
      <ListBar />
    </div>
    <div class="lg:col-span-9 md:col-span-7 col-span-11 my-5">
      <div class="text-start space-y-10 mt-8 w-full">
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
                    src="/favourite.svg"
                    alt="favorite"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-bold text-sm">{{ t("pages.favorite") }}</p>
                  <p class="font-semibold text-xs text-gray-700">
                    {{ t("pages.check_companies") }}
                  </p>
                </div>
              </div>
            </div>

            <div class="card">
              <!-- Tab Content -->
              <div class="p-4">
                <!-- Category Tabs -->
                <div class="grid grid-cols-12 gap-2">
                  <button
                    v-for="category in list_categories"
                    :key="category.id"
                    type="button"
                    @click="changeCategory(category.id)"
                    :class="{
                      'bg-primary-1 text-white': activeSubTab === category.id,
                      'bg-primary-2 text-gray-600':
                        activeSubTab !== category.id,
                    }"
                    class="col-span-6 md:col-span-4 lg:col-span-3 text-center text-sm font-bold rounded-full py-2"
                  >
                    {{ category.name }}
                  </button>
                </div>

                <!-- Content Section -->
                <div class="grid grid-cols-12 gap-2 mt-4">
                  <!-- Skeleton Loader when Loading -->
                  <template v-if="loading">
                    <div
                      v-for="n in 6"
                      :key="n"
                      class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4 bg-white rounded-lg shadow animate-pulse p-4"
                    >
                      <div class="h-40 bg-gray-300 rounded"></div>
                      <div class="mt-4 h-4 bg-gray-300 rounded w-3/4"></div>
                      <div class="mt-2 h-4 bg-gray-200 rounded w-1/2"></div>
                      <div class="mt-2 h-4 bg-gray-200 rounded w-1/3"></div>
                    </div>
                  </template>

                  <!-- Data Found -->
                  <template v-else-if="list_favorite.length > 0">
                    <HomeProviderCard
                      v-for="favorite in list_favorite"
                      :key="favorite.id"
                      :image="favorite.image"
                      :name="favorite.name"
                      :address="favorite.map_desc"
                      :city="favorite.city"
                      :rating="parseFloat(favorite.rate_avg)"
                      :id="favorite.id"
                      :is_favored="favorite.is_favored"
                      class="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-4"
                    />
                  </template>

                  <!-- No Data Found -->
                  <div
                    v-else
                    class="col-span-12 text-center text-gray-500 text-sm font-semibold mt-5"
                  >
                    {{ t("pages.no_favorites_found") }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { fetchData, resultData } = useFetchData();
const { list_categories } = storeToRefs(useCountries());
const { getCategories } = useCountries();

// i18n
const { t } = useI18n();
const loading = ref(true);
const list_favorite = ref([]);
const activeSubTab = ref(
  list_categories.value.length ? list_categories.value[0].id : null
);

const getFavorites = async () => {
  loading.value = true; // بداية التحميل
  try {
    await fetchData({
      url: `api/user/favorites/${activeSubTab.value}`,
      onSuccess: () => {
        list_favorite.value = resultData.value.data ?? [];
      },
    });
  } catch (error) {
    console.error("❌ Error fetching favorites:", error);
  } finally {
    loading.value = false; // إيقاف التحميل بعد جلب البيانات
  }
};

onMounted(async () => {
  try {
    await getCategories();
    await getFavorites();
    if (list_categories.value.length) {
      activeSubTab.value = list_categories.value[0].id;
    }
  } finally {
    loading.value = false; // Hide loading state after data is fetched
  }
});

watch(
  list_categories,
  (newList) => {
    if (!activeSubTab.value && newList.length) {
      activeSubTab.value = newList[0].id;
    }
  },
  { immediate: true } // يتم تنفيذها مباشرةً عند التشغيل
);

const changeCategory = async (categoryId) => {
  activeSubTab.value = categoryId;
  await getFavorites(); // جلب البيانات للتصنيف الجديد
};
</script>

<style scoped>
/* Ensure white background is applied */
.bg-white {
  background-color: #ffffff !important;
}

/* Disable interaction with background image */
img.z-0 {
  pointer-events: none;
}

/* Adjust button style */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.p-tab-active {
  @apply !border-primary-1 !text-primary-1;
}

::v-root .active-bar-color {
  background-color: #c69e73 !important;
}

.active-tab {
  background-color: #c69e73;
  color: white;
}
.inactive-tab {
  background-color: #f3f3f3;
  color: black;
}

/* Dropdown Container */
.select-container {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dropdown Option */
.select-option {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
}

.select-option:hover {
  background-color: #f9fafb;
}

.select-option img {
  width: 25px;
  height: 15px;
  border-radius: 3px;
  object-fit: cover;
  margin-right: 8px;
}

.select-option span {
  font-size: 14px;
  color: #1a202c;
}

/* Arrow Styling */
.dropdown-arrow {
  font-size: 10px !important;
  color: #a0aec0;
  margin-left: 4px;
}

/* Selected Item */
.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.grid {
  align-items: center;
}

.relative {
  position: relative;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4299e1;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
