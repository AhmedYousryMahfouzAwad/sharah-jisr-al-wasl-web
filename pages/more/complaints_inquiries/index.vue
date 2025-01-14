<template>
    <div class="xl:mx-auto mt-5">
        <!-- Header Section -->
        <div class="flex justify-between items-center mt-5 max-w-4xl mx-auto">
            <div>

                <h1 class="md:text-xl text-lg font-bold">{{ t("pages.complaints_inquiries") }}</h1>
            </div>
            <NuxtLink :to="localeRoute({ name: 'more-order_complaints_inquiries' })"
                class="p-2 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="plus" alt="plus_image" class="w-5 h-5" />
            </NuxtLink>
        </div>

        <!-- Tab Content -->
        <div class="tab-content mt-4">
            <!-- Display Complaints List -->
            <div v-if="!loading && complaints_list.length > 0"
                class="card grid gap-x-6 grid-cols-12 max-w-4xl mx-auto sm:grid-cols-6 md:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6">
                <OrdersCard v-for="item in complaints_list" :key="item.id" :state="item.status_text" :num="item.num"
                    :date="item.created_at"
                    :to="localeRoute({ name: 'more-complaints_inquiries-id', params: { id: item.id } })" />
            </div>

            <!-- Skeleton Loader -->
            <div v-else-if="loading" class="card grid grid-cols-12 max-w-4xl mx-auto">
                <div v-for="item in 10" :key="item" class="md:col-span-6 col-span-12 m-5 p-4 rounded-lg shadow-md">
                    <div class="h-24 bg-gray-300 rounded-md mb-4"></div>
                    <div class="h-6 bg-gray-300 rounded-md mb-2 w-3/4"></div>
                    <div class="h-6 bg-gray-300 rounded-md w-1/2"></div>
                </div>
            </div>

            <!-- No Data Found -->
            <div v-else class="flex w-[50%] my-10 mx-auto flex-col justify-center items-center">
                <img :src="NotFound" alt="NoFoundData" />
                <p class="text-gray-500 mt-4">{{ t("pages.no_data_found") }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
// Imports
import plus from "@/assets/img/plus.svg";
import NotFound from "@/assets/img/no_data.jpg";

// Store
const { t } = useI18n();
const { getComplaints } = useComplaintStore();
const { complaints_list } = storeToRefs(useComplaintStore());

// State
const loading = ref(true);

// Hooks
onMounted(async () => {
    loading.value = true; // Set loading to true immediately
    try {
        await getComplaints(); // Fetch complaints data
    } catch (error) {
        console.error("Error fetching complaints:", error);
    } finally {
        loading.value = false; // Always set loading to false
    }
});
</script>
