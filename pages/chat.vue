<template>
    <div class="  mt-10    mx-auto p-2 sm:p-4 bg-gray-100 rounded-lg shadow-lg">
        <!-- Chat message -->
        <div class="flex mb-4 gap-2">
            <img :src="Ahmed" alt="User" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
            <div class="ml-2 max-w-[85%]">
                <div class="bg-gray-200 p-2 sm:p-3 rounded-lg text-gray-700">
                    <p>تم توليد هذا النص من مولد النص العربي حيث يمكنك إضافة نصوص أخرى</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">10/3/2024</p>
            </div>
        </div>

        <!-- Chat message (reply) -->
        <div class="flex mb-4 justify-end">
            <div class="max-w-[85%] text-right">
                <div class="bg-gray-500 p-2 sm:p-3 rounded-lg text-white">
                    <p>تم توليد هذا النص من مولد النص العربي حيfdsfsdfdsfsdfdsfsadasdasdasdasdasdasdث يمكنك إضافة نصوص
                        أخرى</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">10/3/2024</p>
            </div>
        </div>

        <!-- Repeat the above messages for more chat entries -->
        <div class="flex mb-4 gap-2">
            <img :src="Ahmed" alt="User" class="w-8 h-8 sm:w-10 sm:h-10 rounded-full">
            <div class="ml-2 max-w-[85%]">
                <div class="bg-gray-200 p-2 sm:p-3 rounded-lg text-gray-700">
                    <p>تم توليد هذا النص من مولد النص العربي حيث يمكنك إضافة نصوص أخرى</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">10/3/2024</p>
            </div>
        </div>

        <div class="flex mb-4 justify-end">
            <div class="max-w-[85%] text-right">
                <div class="bg-gray-500 p-2 sm:p-3 rounded-lg text-white">
                    <p>تم توليد هذا النص من مولد النص العربي حيث يمكنك إضافة نصوص أخرى</p>
                </div>
                <p class="text-xs text-gray-500 mt-1">10/3/2024</p>
            </div>
        </div>


        <div class="grid grid-cols-12 gap-4 justify-center items-center w-full">
            <input class="col-span-10  w-full pl-10 pr-4 p-2 border-2 rounded-full focus:outline-none
                focus:ring-1 focus:ring-primary-1" :placeholder="t('pages.auth.placeholders.msg')" />
            <button
                class="col-span-2 bg-primary-1 w-full font-semibold border-2 border-primary-1  hover:!bg-transparent hover:!text-primary-1   p-2 !rounded-full text-white">{{
                    t('pages.send') }}</button>

        </div>
    </div>
</template>

<script setup>
import Ahmed from "@/assets/img/Ahmed.jpg";
const { t } = useI18n();
</script>

<style scoped>
/* You can add custom styles here if needed */
</style>
