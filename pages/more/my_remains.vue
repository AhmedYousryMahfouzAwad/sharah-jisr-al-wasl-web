<template>
    <div class="  mt-5  xl:mx-auto mx-5">
        <HomeTitle title="pages.my_remains" class="my-3 " />
        <!-- Skeleton Loader -->
        <div v-if="loading" class="grid grid-cols-12 gap-5">
            <div v-for="n in 10" :key="n" class="xl:col-span-6 lg:col-span-12 col-span-12">
                <div class="skeleton-card w-full h-40 rounded-lg"></div>
            </div>
        </div>
        <div v-else class="grid grid-cols-12 w-12/12 my-5 gap-5  ">
            <HomeScheduledMaintenanceCard v-for="item in list_packages" :key="item.id" :data="item"
                class="xl:col-span-6 lg:col-span-12 col-span-12 w-full " :share="t('pages.Unsubscribe')" />
        </div>


        <!-- No Data Found -->
        <div v-if="!loading && (!list_packages || list_packages.length === 0)"
            class="flex w-[50%] my-10 mx-auto flex-col justify-center items-center">
            <img :src="NotFound" alt="NoFoundData" />
            <span class="text-red-2 font-bold my-5 md:text-base text-xs">
                {{ t('pages.no_data') }}
            </span>
        </div>
    </div>
</template>


<script setup>
// Imports
import NotFound from "@/assets/img/no_data.jpg";

// Store
const { t } = useI18n();
const { getPackages } = usePackageStore()
const { list_packages } = storeToRefs(usePackageStore())

// State
const loading = ref(true);


onMounted(async () => {
    try {
        await getPackages()
    } catch (error) {
        console.error("Error loading packages:", error);
    } finally {
        loading.value = false;
    }
});


</script>

<style scoped>
.skeleton-card {
    background: linear-gradient(90deg,
            #e0e0e0 25%,
            #f8f8f8 50%,
            #e0e0e0 75%);
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