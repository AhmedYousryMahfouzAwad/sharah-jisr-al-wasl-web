<template>
    <div class="xl:mx-auto mt-5">
        <div class="flex justify-between items-center mt-5 mx-auto">
            <h1 class="text-xl font-bold">{{ t("pages.complaints_inquiries") }}</h1>
        </div>
        <div class="tab-content mt-4">
            <!-- Skeleton Loading -->
            <div v-if="loading" class="space-y-5">

                <div class="animate-pulse bg-gray-300 h-32 rounded-lg"></div>
                <div class="animate-pulse bg-gray-300 h-16 rounded-lg"></div>
                <div class="animate-pulse flex space-x-4">
                    <div class="rounded-full bg-gray-300 h-12 w-12"></div>
                    <div class="flex-1 space-y-4 py-1">
                        <div class="h-4 bg-gray-300 rounded w-3/4"></div>
                        <div class="h-4 bg-gray-300 rounded"></div>
                    </div>
                </div>
            </div>

            <!-- Main Content -->
            <div v-else class="justify-between items-center grid grid-cols-12 gap-3">
                <div
                    class="shadow-lg py-2 bg-white space-y-3 w-full grid xl:col-span-6 col-span-12 rounded-lg px-5 h-full">
                    <div class="flex justify-between items-center">
                        <div class="flex justify-center items-center gap-x-2">
                            <img :src="note" alt="note_img" class="md:w-5 md:h-5 h-4 w-4" />
                            <p class="font-semibold text-sm">{{ complaint_show.num }}</p>
                        </div>
                        <div class="flex justify-center items-center gap-x-2">
                            <img :src="reports" alt="reports_img" class="md:w-5 md:h-5 h-4 w-4" />
                            <p class="font-semibold text-sm">{{ complaint_show.status }}</p>
                        </div>
                    </div>
                    <div class="flex justify-between items-center">
                        <div class="flex justify-center items-center gap-x-2">
                            <img :src="data" alt="date_img" class="md:w-5 md:h-5 h-4 w-4" />
                            <p class="font-semibold text-sm">{{ complaint_show.created_at }}</p>
                        </div>
                    </div>
                </div>

                <div class="xl:col-span-6 col-span-12 shadow-lg bg-white rounded-lg h-full p-2 px-5">
                    <p class="text-black mb-2">{{ t('pages.text_of_the_complaint') }}:</p>
                    <hr />
                    <div class="flex justify-start gap-5 my-5">
                        <p class="text-gray-400 md:text-sm text-xs">
                            {{ complaint_show.complaint }}
                        </p>
                    </div>
                </div>

                <div v-if="images.length > 0"
                    class="xl:col-span-6 col-span-12 shadow-lg rounded-lg h-full p-2 bg-white px-5">
                    <div class="flex gap-x-2">
                        <p class="font-bold text-sm">{{ t("pages.images") }}</p>
                    </div>
                    <div class="grid grid-cols-12 mt-5">
                        <img v-for="item in images" :key="item.id" :src="item" alt="date_img"
                            class="col-span-2 my-1 w-16 h-16 rounded-xl" />
                    </div>
                </div>

                <div v-if="complaint_show.admin_message"
                    class="xl:col-span-6 col-span-12 shadow-lg bg-white rounded-lg h-full p-2">
                    <p class="text-black my-5">{{ t('pages.management_response') }}:</p>
                    <hr />
                    <div class="flex justify-start gap-5 my-5">
                        <p class="text-gray-400 md:text-base text-xs">
                            {{ complaint_show.admin_message }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

const route = useRoute();
const { t } = useI18n();

const loading = ref(true);
const visible = ref(false);

import note from "@/assets/img/note.svg";
import reports from "@/assets/img/reports.svg";
import data from "@/assets/img/data.svg";

const { getComplaintShow } = useComplaintStore();
const { complaint_show, images } = storeToRefs(useComplaintStore());

onMounted(async () => {
    loading.value = true; // بدء التحميل
    await getComplaintShow(route.params.id); // جلب البيانات
    loading.value = false; // إنهاء التحميل
});

</script>

<style scoped>
.animate-pulse {
    animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {

    0%,
    100% {
        opacity: 1;
    }

    50% {
        opacity: 0.4;
    }
}
</style>