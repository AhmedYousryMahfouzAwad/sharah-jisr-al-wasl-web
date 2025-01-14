<template>
    <div>
        <div class="xl:mx-auto mt-5">
            <HomeTitle title="pages.home" />
            <span class="text-gray-500 text-lg">
                {{ t("pages.welcome") }}
            </span>
        </div>

        <div class="card">
            <Carousel v-if="!loading" :value="sliders_list" :numVisible="3" :numScroll="1"
                :responsiveOptions="responsiveOptions">
                <template #item="{ data }">
                    <div>
                        <div class="mb-4 px-1 !rounded-xl">
                            <img :src="data.image" :alt="data.name" class="w-full h-48 object-cover !rounded-xl" />
                        </div>
                    </div>
                </template>
            </Carousel>

            <div v-else class=" !flex justify-center gap-4 items-center mx-auto">
                <!-- Skeleton placeholders for carousel items while loading -->
                <Skeleton v-if="loading" v-for="i in 3" :key="i" class="w-full h-20 mb-4" size="20rem" />
            </div>
        </div>

        <div class="mt-5 xl:mx-auto mx-5">
            <HomeTitle title="pages.main_sections" class="my-3" />
            <div v-if="loading" class="grid grid-cols-12 gap-6  w-8/12   my-5 h-full">
                <!-- Skeleton placeholders shown when loading -->
                <div v-for="i in 4" :key="i" class="col-span-6">
                    <Skeleton class="lg:col-span-6 col-span-12 " size="20rem" />
                </div>
            </div>
            <div v-else class="grid grid-cols-12 gap-6 w-8/12 my-5 h-full">

                <!-- HomeCard components displayed once loading is complete -->
                <HomeCard v-for="(item, idx) in categories_list" :key="item.id" :title="item.name" :img="item.image"
                    :to="localePath(cat_router[idx].to)" alt="image" class="lg:col-span-6 col-span-12 " />

            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import Carousel from 'primevue/carousel';
import Skeleton from 'primevue/skeleton';

const { t } = useI18n();
const { home } = useHomeStore();
const { sliders_list, categories_list } = storeToRefs(useHomeStore());

const loading = ref(true); // Loading state to control skeleton display

const cat_router = ref([
    { to: "/online_store" },
    { to: "/construction" },
    { to: "/immediate_maintenance" },
    { to: "/scheduled_maintenance" },
]);
const responsiveOptions = ref([
    { breakpoint: '1400px', numVisible: 3, numScroll: 1 },
    { breakpoint: '1199px', numVisible: 2, numScroll: 1 },
    { breakpoint: '767px', numVisible: 1, numScroll: 1 },
]);

onMounted(async () => {
    loading.value = true;
    await home();
    loading.value = false; // Set loading to false once data is fetched
});


</script>

<style scoped>
.card {
    @apply max-w-[1200px] mx-auto py-4;
}
</style>
