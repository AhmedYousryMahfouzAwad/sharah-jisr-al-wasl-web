<template>
    <HomeTitle title="pages.notifications" class="my-3" />
    <div v-if="list_notifications && list_notifications.length" class="mt-5 xl:mx-auto max-w-xl mx-5">
        <div>
            <button @click="handleRemoveAllNotifications" :disabled="loading_all"
                class="flex justify-start items-center cursor-pointer hover:underline text-red-500">
                <span v-if="!loading_all">{{ t("pages.clear_all") }}</span>
                <div v-else class="spinner w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
            </button>
        </div>

        <div>
            <!-- Skeleton Loader -->
            <div v-if="globalLoading" v-for="i in 10" :key="i"
                class="xl:mx-auto mx-5 my-1 max-w-xl border-2 p-2 rounded-xl flex justify-between items-center animate-pulse">
                <div class="flex items-center gap-x-5">
                    <div class="cursor-pointer">
                        <div class="w-16 h-16 bg-gray-300 rounded-full"></div>
                    </div>
                    <div class="flex flex-col space-y-2">
                        <div class="w-24 h-4 bg-gray-300 rounded"></div>
                        <div class="w-32 h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
                <div class="flex items-center">
                    <div class="w-6 h-6 bg-gray-300 rounded"></div>
                </div>
            </div>

            <!-- Notification Items -->
            <div v-else v-for="item in list_notifications" :key="item.id"
                class="xl:mx-auto mx-5 my-1 max-w-xl border-2 p-2 rounded-xl flex justify-between items-center">
                <div class="flex items-center gap-x-5">
                    <div class="cursor-pointer">
                        <Avatar :image="logo" class="rounded-full" size="xlarge" shape="circle"
                            :style="{ objectFit: 'contain' }" />
                    </div>
                    <div class="flex flex-col">
                        <p class="text-xs sm:text-base font-bold">{{ item.data.type }}</p>
                        <p class="text-xs sm:text-base font-bold">{{ item.data.order_num }}</p>
                    </div>
                </div>
                <div class="flex items-center">
                    <button @click="handleRemoveNotification(item.id)" :disabled="loading[item.id]" class="relative">
                        <img v-if="!loading[item.id]" :src="remove" alt="Remove notification"
                            class="w-4 h-4 md:w-5 md:h-5" />
                        <div v-else
                            class="spinner w-6 h-6 border-4 border-t-4 border-gray-200 rounded-full animate-spin"></div>
                    </button>
                </div>
            </div>
        </div>
    </div>

    <div v-else class="flex flex-col justify-center items-center w-96 mx-auto text-red-500">
        <img :src="NotFound" alt="No Data Found" />
        <p class="text-center text-red-500 font-bold"> {{ t("pages.no_data") }}</p>
    </div>



    <div class="!border-none mt-5">
        <div class="mt-5" v-if="!loading && pagination.total_pages > 1">
            <Paginator :totalRecords="pagination.total_items" :rows="pagination.per_page"
                :first="(pagination.current_page - 1) * pagination.per_page" @page="onPageChange" />
        </div>
    </div>
</template>

<script setup>
import logo from "@/assets/img/logo.png";
import remove from "@/assets/img/remove.svg";
import NotFound from "@/assets/img/no_data.jpg";

// store
const { t } = useI18n();
const { getNotification, removeNotification, removeAllNotification } = useNotification();
const { list_notifications, pagination } = storeToRefs(useNotification());

// state
const loading = ref({}); // Object to track loading states for individual notifications
const globalLoading = ref(false); // Tracks the global loading state
const loading_all = ref(false); // Tracks "clear all notifications" loading state



// pagination


// methods
onMounted(async (page = 1) => {
    globalLoading.value = true;
    try {
        await getNotification(page);
    } catch (error) {
        console.error("Error fetching notifications:", error);
    } finally {
        globalLoading.value = false;
    }
});
const onPageChange = (event) => {
    const page = event.page + 1;
    globalLoading.value = true;
    getNotification(page)
        .catch((error) => console.error("Error fetching notifications:", error))
        .finally(() => {
            globalLoading.value = false;
        });

};
const handleRemoveNotification = async (id) => {
    loading.value[id] = true; // Set individual notification loading state
    try {
        await removeNotification(id);
    } catch (error) {
        console.error(`Error removing notification ${id}:`, error);
    } finally {
        loading.value[id] = false; // Reset individual notification loading state
    }
};

const handleRemoveAllNotifications = async () => {
    loading_all.value = true; // Set "clear all" loading state
    try {
        await removeAllNotification();
    } catch (error) {
        console.error("Error removing all notifications:", error);
    } finally {
        loading_all.value = false; // Reset "clear all" loading state
    }
};
</script>
