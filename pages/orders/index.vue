<template>
    <div>
        <div class=" xl:mx-auto mt-5">
            <HomeTitle title="pages.orders" class="my-3" />
        </div>

        <div class="shadow-xl w-full my-5 justify-center items-center max-w-2xl mx-auto  p-4 space-y-5 py-8 gap-4">
            <img class="mx-auto" :src="img_order">

            <NuxtLink :to="localePath({ name: 'orders-online_store_order' })" class="font-bold md:text-base text-sm  main-btn w-[60%] flex flex-col justify-center items-center mx-auto border-2 border-black
                bg-transparent rounded-3xl cursor-pointer p-3 hover:bg-black hover:text-white transition-colors duration-300
                ease-in-out">
                {{ t("pages.online_store") }}
            </NuxtLink>

            <NuxtLink :to="localePath({ name: 'orders-pool_construction' })" class="main-btn font-bold  md:text-base text-sm w-[60%] flex flex-col justify-center items-center mx-auto border-2 border-black
                bg-transparent rounded-3xl cursor-pointer p-3 hover:bg-black hover:text-white transition-colors duration-300
                ease-in-out">
                {{ t("pages.construction") }}
            </NuxtLink>

            <NuxtLink :to="localePath({ name: 'orders-immediate_maintenance' })" class="main-btn font-bold w-[60%] flex md:text-base text-sm  flex-col justify-center items-center mx-auto border-2 border-black
                bg-transparent rounded-3xl cursor-pointer p-3 hover:bg-black hover:text-white transition-colors duration-300
                ease-in-out">
                {{ t("pages.immediate_maintenance") }}
            </NuxtLink>
            <NuxtLink :to="localePath({ name: 'orders-scheduled_maintenance' })" class="main-btn  font-bold w-[60%] flex  md:text-base text-sm flex-col justify-center items-center mx-auto border-2 border-black
                bg-transparent rounded-3xl cursor-pointer p-3 hover:bg-black hover:text-white transition-colors duration-300
                ease-in-out">
                {{ t("pages.scheduled_maintenance") }}
            </NuxtLink>


        </div>

    </div>
</template>

<script setup>
const localePath = useLocalePath()
const { t } = useI18n();
import img_order from "@/assets/img/img_order.png";

definePageMeta({
    requiresAuth: true
})
</script>