<template>
    <div class="flex justify-between items-center   mx-auto  ">
        <HomeTitle title="pages.my_nice" class="my-3 max-w-6xl" />

    </div>
    <div v-if="loading" class="grid grid-cols-12 mx-auto gap-3">
        <!-- Skeleton placeholders -->
        <Skeleton v-for="i in 9" :key="i" width="100%" class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12"
            height="8rem" borderRadius="16px" />
    </div>

    <div v-else-if="favorites && favorites.length" class="grid grid-cols-12 mx-auto gap-3">
        <!-- Render actual favorites -->
        <OnlineStoreCartOnlineStore v-for="item in favorites" :key="item.id" :showDeleteButton="true"
            @delete-item="handleDelete(item.id)" :name="truncateText(item.name, 7)" :src="item.image"
            :title="truncateText(item.description, 25)" :price="item.price"
            :to="localePath({ name: 'online_store-details', params: { details: item.id } })"
            class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12" />


    </div>

    <div v-else class="h-screen md:h-full">
        <div class="w-full h-1/2 flex justify-center items-center my-auto">
            <img :src="empty" alt="empty_cart" class="w-1/3" />
        </div>


        <p class="text-red-500 text-center font-bold ">{{ t('pages.no_favorites') }}</p>
    </div>


    <div class="!border-none mt-5" v-if="!loading && pagination.total_pages > 1">
        <div class="mt-5">
            <Paginator :totalRecords="pagination.total_items" :rows="pagination.per_page"
                :first="(pagination.current_page - 1) * pagination.per_page" @page="onPageChange" />
        </div>
    </div>


</template>

<script setup>
//import
import empty from "@/assets/img/empty.png";
// store
const { getFavorites, toggleFavorite } = useFavoritesStore();
const { favorites, pagination } = storeToRefs(useFavoritesStore());
//status
const loading = ref(false);
const { t } = useI18n();
const route = useRoute();
const localePath = useLocalePath();
const router = useRouter();

// hooks
onMounted(async (page = 1) => {

    loading.value = true;

    try {
        await getFavorites(page);
    } catch (error) {
        console.error('Error fetching favorites:', error);

    } finally {
        loading.value = false;
    }
});

// pagination
const onPageChange = (event) => {
    const page = event.page + 1; // Extract the page number from the event
    getFavorites(route.params.id, page); // Fetch new products
};

// Truncate
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
// Handle delete favorite
const handleDelete = async (id) => {
    loading.value = true;
    try {
        await toggleFavorite(id);
        router.push(localePath("/"));
    } catch (error) {
        console.error('Error deleting favorite:', error);
    } finally {
        loading.value = false;
    }
};

</script>
