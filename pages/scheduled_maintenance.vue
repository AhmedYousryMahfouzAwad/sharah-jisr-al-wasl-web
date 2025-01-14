<template>
    <div class="mt-5 xl:mx-auto mx-1">
        <HomeTitle title="pages.scheduled_maintenance" class="my-3 " />

        <!-- Skeleton Loader -->
        <div v-if="loading" class="grid grid-cols-12 gap-5">
            <div v-for="n in 10" :key="n" class="xl:col-span-6 lg:col-span-12 col-span-12">
                <div class="skeleton-card w-full h-40 rounded-lg"></div>
            </div>
        </div>

        <!-- Data Cards -->
        <div v-else class="grid grid-cols-12 w-12/12 my-5 gap-5">
            <HomeOrderScheduledMaintenanceCard v-for="item in list_packages_orders" :key="item.id" :data="item"
                class="xl:col-span-6 lg:col-span-12 col-span-12 w-full" :share="t('pages.Unsubscribe')" />
        </div>

        <!-- No Data Found -->
        <div v-if="!loading && list_packages_orders === null"
            class="flex w-[50%] my-10 mx-auto flex-col justify-center items-center">
            <img :src="NotFound" alt="NoFoundData" />
            <span class="text-red-2 font-bold my-5 md:text-base text-xs">
                {{ t('pages.no_data') }}
            </span>
        </div>
        <BaseDialog v-model:visible="visible_accept" class="w-full max-w-xl mx-2">
            <template #content>



                <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
                <span
                    class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                    {{ t('pages.congratulations') }}
                </span>
                <div class="w-[50%] mx-auto">
                    <ButtonAuth @click="handle" :loading="loading" v-show="true" :label="t('pages.continuation')"
                        class="col-span-12 md:col-span-6 mx-auto " />
                </div>

            </template>
        </BaseDialog>

        <BaseDialog v-model:visible="visible_price_package" class="w-full max-w-xl mx-2">
            <template #content>



                <img :src="d_delete" alt="animation_image" class="mx-auto justify-center items-center flex">
                <p class="text-center font-bold my-5 ">{{ resMsg }}</p>


            </template>
        </BaseDialog>
    </div>
</template>


<script setup>
//auth
definePageMeta({
    requiresAuth: true
})

//import
import NotFound from "@/assets/img/no_data.jpg";
import d_delete from '@/assets/img/d_delete.png';
import animation from '@/assets/img/animation.gif';


//store
const { t } = useI18n();
const { getAllPackages } = useOrderPackageStore();
const { list_packages_orders, visible_price_package, visible_accept, resMsg } = storeToRefs(useOrderPackageStore());
const localePath = useLocalePath();
const router = useRouter();
//state
const loading = ref(true);

//hooks
onMounted(async () => {
    try {
        await getAllPackages();
    } catch (error) {
        console.error("Error loading packages:", error);
    } finally {
        loading.value = false;
    }
});

//handle
const handle = () => {
    router.push(localePath("date_picker"));
}
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

textarea::placeholder {
    color: #a1a1a1;
    /* لون أفتح */
    font-size: 0.9rem;
    /* حجم النص placeholder */
    opacity: 1;
    /* تأكد من أن النص واضح */
}
</style>