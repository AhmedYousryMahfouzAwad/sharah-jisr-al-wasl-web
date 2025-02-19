<template>
  <div>
    <!-- Skeleton Loader -->
    <div v-if="loading" class="grid grid-cols-12 max-w-2xl mx-auto my-10 gap-2">
      <div
        v-for="i in 6"
        :key="i"
        class="bg-[#F5F5F5] col-span-12 rounded-lg animate-pulse"
      >
        <div class="p-5">
          <div class="flex items-center gap-x-2">
            <div class="relative p-3 rounded-full bg-gray-300 w-10 h-10"></div>
            <div class="flex flex-col space-y-2">
              <p class="bg-gray-300 h-4 w-24 rounded"></p>
            </div>
          </div>
          <div class="my-1 bg-gray-300 h-3 w-5/6 rounded"></div>
          <div class="my-1 bg-gray-300 h-3 w-3/4 rounded"></div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div v-else>
      <div
        v-if="list_rating.length > 0"
        class="grid grid-cols-12 lg:container !mx-auto justify-center items-start"
      >
        <div class="lg:col-span-3 md:col-span-5 col-span-1 mx-5 my-5">
          <ListBar />
        </div>
        <div class="lg:col-span-9 md:col-span-7 col-span-11 my-5">
          <div class="text-start space-y-10 mt-8 w-full">
            <div class="flex justify-start items-center">
              <div class="bg-white shadow-2xl rounded-xl p-4 w-full max-w-3xl">
                <!-- Header Section -->
                <div class="flex items-center gap-x-2">
                  <div
                    class="relative p-2 rounded-full bg-primary-2 cursor-pointer"
                  >
                    <img
                      src="/start.svg"
                      alt="start"
                      class="w-6 h-6 rounded-full object-cover"
                    />
                  </div>
                  <div>
                    <p class="font-bold text-sm">{{ t("pages.my_reviews") }}</p>
                    <p class="font-semibold text-xs text-gray-700">
                      {{ t("pages.check_reviews") }}
                    </p>
                  </div>
                </div>

                <div class="flex flex-col border-b pb-4"></div>

                <!-- Reviews List -->
                <div
                  v-for="rate in list_rating"
                  :key="rate.id"
                  class="md:col-span-4 col-span-12 rounded-lg"
                >
                  <div class="flex items-center gap-x-2 p-3">
                    <div
                      class="relative p-3 rounded-full border-2 border-primary-1 cursor-pointer hover:bg-primary-3"
                    >
                      <img
                        :src="rate.user.image"
                        alt="notifications"
                        class="w-4 h-4"
                      />
                    </div>
                    <div>
                      <p class="text-sm">{{ rate.user.name }}</p>
                      <Rating v-model="rate.rate" readonly />
                    </div>
                  </div>
                  <div class="flex flex-col border-b"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State (No Reviews) -->
      <div v-else class="justify-center items-center flex flex-col my-10">
        <img src="/start.svg" class="w-52" alt="start" />
        <p class="font-semibold">{{ t("pages.no_reviews") }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import Rating from "primevue/rating";
const { fetchData, resultData } = useFetchData();
const { t } = useI18n();

const list_rating = ref([]);
const loading = ref(true);

const rating = async () => {
  try {
    await fetchData({
      url: `api/provider/rates`,
      onSuccess: () => {
        list_rating.value = resultData.value?.data ?? [];
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  rating();
});
</script>
