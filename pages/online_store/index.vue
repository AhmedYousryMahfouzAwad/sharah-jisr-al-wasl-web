<template>

    <div class="mt-5 xl:mx-auto mx-5">
        <HomeTitle title="pages.online_store" class="my-3 " />


        <div v-if="loading">
            <!-- Loading Skeleton -->
            <div class="grid grid-cols-12 gap-6 w-8/12 my-5">
                <div v-for="n in 4" :key="n" class="lg:col-span-6 col-span-12 animate-pulse">
                    <div class="bg-gray-300 h-48 rounded-md"></div>

                </div>
            </div>
        </div>

        <div v-else-if="subCategories && subCategories.length > 0" class="grid grid-cols-12 gap-6 w-8/12 my-5 ">
            <HomeCard v-for="item in subCategories" :key="item.id" :title="item.name" :img="item.image" alt="image"
                :to="localeRoute({ name: 'online_store_id-id', params: { id: item.id } })"
                class="lg:col-span-6 col-span-12" />
        </div>

        <!-- Empty State -->
        <div v-else class="h-screen md:h-full">
            <div class="w-full h-1/2 flex justify-center items-center my-auto">
                <img :src="empty" alt="empty_cart" class="w-1/3" />
            </div>
        </div>
    </div>
</template>
<script setup>
//import
import empty from "@/assets/img/empty.png";

//stores
const { getSubCategories } = useOnlineStore();
const { subCategories } = storeToRefs(useOnlineStore());
const localeRoute = useLocaleRoute();

// state
const loading = ref(true);

//mounted
onMounted(async () => {
    loading.value = true;
    await getSubCategories();
    loading.value = false;
});

</script>

<style scoped>
.card {
    max-width: 1200px !important;
    margin: 0 auto !important;
    padding: 1rem !important;
}

.carousel-image {
    height: 200px !important;
    /* Set a fixed height */
    object-fit: cover !important;
    /* Maintain aspect ratio */
}
</style>
