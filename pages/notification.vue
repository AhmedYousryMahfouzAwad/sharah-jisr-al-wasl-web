<template>
  <!-- Notifications Section -->
  <div class="my-10 mx-auto max-w-7xl">
    <div>
      <p class="my-3 font-bold text-xl">{{ t("pages.notifications") }}</p>

      <template v-if="globalLoading">
        <div
          v-for="i in 10"
          :key="i"
          class="my-2 max-w-3xl p-2 bg-gray-100 rounded-lg flex justify-between items-start animate-pulse cursor-pointer"
        >
          <div class="flex gap-x-5">
            <div class="flex flex-col space-y-1">
              <div class="w-24 h-4 bg-gray-300 rounded"></div>
              <div class="w-32 h-4 bg-gray-300 rounded"></div>
            </div>
          </div>
          <div class="flex items-start gap-x-5">
            <div
              class="flex flex-col bg-[#FEE4E2] w-8 h-8 rounded-lg justify-center items-center"
            >
              <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </div>
      </template>

      <template v-else-if="list_notifications.length">
        <NuxtLink
          v-for="item in list_notifications"
          :key="item.id"
          class="my-2 max-w-3xl p-2 bg-primary-3 rounded-lg flex justify-between items-start cursor-pointer"
        >
          <div class="flex gap-x-5">
            <div class="flex flex-col space-y-1">
              <p class="text-xs sm:text-sm font-bold">{{ item.title }}</p>
              <p class="text-xs sm:text-sm font-bold">{{ item.body }}</p>
            </div>
          </div>
          <div class="flex items-start gap-x-5">
            <div class="flex flex-col bg-[#FEE4E2] w-8 h-8">
              <div class="flex items-center flex-shrink-0">
                <button
                  @click.prevent="handleRemoveNotification(item.id)"
                  :disabled="loading[item.id]"
                  class="relative !p-2"
                >
                  <img
                    v-if="!loading[item.id]"
                    src="/remove.png"
                    alt="Remove notification"
                  />
                  <div
                    v-else
                    class="spinner w-4 h-4 border-4 border-t-4 border-gray-200 rounded-full animate-spin"
                  ></div>
                </button>
              </div>
            </div>
          </div>
        </NuxtLink>
      </template>

      <template v-else>
        <div
          class="flex flex-col justify-center items-center mx-auto text-red-500"
        >
          <img src="/no_notification.jpg" class="w-60" alt="No Data Found" />

          <p class="text-center text-red-500 font-bold py-1">
            {{ t("pages.no_notifications") }}
          </p>
        </div>
      </template>
    </div>
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
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
const { t } = useI18n();

const globalLoading = ref(true);
const loading = ref({}); // Tracks individual notification loading
const page = ref(1);
const list_notifications = ref([]);
const pagination = ref({
  total_items: 0,
  per_page: 10,
  total_pages: 1,
  current_page: 1,
});

const getNotification = async (pageNumber = 1) => {
  try {
    globalLoading.value = true;

    await fetchData({
      url: `api/notifications/notifications`,
      params: { page: pageNumber },
      onSuccess: () => {
        list_notifications.value = resultData.value?.data || [];
        pagination.value = resultData?.value?.pagination || {};
        pagination.value.current_page = pageNumber;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching notifications:", error);
  } finally {
    globalLoading.value = false;
  }
};

onMounted(() => {
  getNotification(page.value);
});

const onPageChange = (event) => {
  if (!pagination.value || typeof event.page !== "number") return;

  page.value = event.page + 1;
  getNotification(page.value);
};

const handleRemoveNotification = async (id) => {
  loading.value[id] = true; // Set individual loading
  try {
    await fetchData({
      url: `api/notifications/delete-notification/${id}`,

      onSuccess: () => {
        getNotification();
      },

      method: "delete",
      getSuccess: true,
    });
  } catch (error) {
    console.error(`Error removing notification ${id}:`, error);
  } finally {
    loading.value[id] = false; // Reset individual loading
  }
};
</script>

<style scoped>
.skeleton-card {
  background: linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

.spinner {
  border-color: #ccc;
  border-top-color: red;
}

.skeleton-card {
  background: linear-gradient(90deg, #e0e0e0 25%, #f8f8f8 50%, #e0e0e0 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
  border-radius: 8px;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}
</style>
