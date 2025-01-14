<template>

    <div class="flex justify-between items-center   mx-auto  ">
        <HomeTitle title="pages.online_store" class="my-3 max-w-6xl" />
        <div>
            <!--visible-->
            <button @click="visible = true" class="p-2 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="filter" alt="filter" class="w-5 h-5" />
            </button>

            <div class="mx-5">
                <BaseDialog v-model:visible="visible">
                    <template #content>
                        <div class="mx-auto px-4 sm:px-6 lg:px-8 w-full max-w-7xl">
                            <span
                                class="text-surface-500 text-center dark:text-surface-400 block mb-8 mx-auto text-lg sm:text-xl md:text-2xl lg:text-3xl">
                                {{ t('pages.filter_by') }}
                            </span>
                            <div class="w-full">
                                <span
                                    class="text-surface-500 font-bold dark:text-surface-400 block my-4 text-sm sm:text-base md:text-lg">
                                    {{ t('pages.price') }}
                                </span>
                                <div class="flex flex-wrap mx-auto gap-4 !justify-center sm:!justify-start">
                                    <div class="flex items-center gap-2">
                                        <RadioButton v-model="ingredient" inputId="ingredient1" name="ingredient"
                                            value="desc" />
                                        <label for="ingredient1" class="ml-2 text-sm sm:text-base md:text-lg">{{
                                            t('pages.the_highest')
                                        }}</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton v-model="ingredient" inputId="ingredient2" name="ingredient"
                                            value="asc" />
                                        <label for="ingredient2" class="ml-2 text-sm sm:text-base md:text-lg">{{
                                            t('pages.the_lowest')
                                        }}</label>
                                    </div>



                                    <ButtonAuth @click="SubmitFilter()" :loading="loading_button"
                                        :label="t('pages.auth.of_course')" class="gap-3" />
                                </div>

                            </div>
                        </div>
                    </template>
                </BaseDialog>
            </div>
        </div>
    </div>
    <div v-if="!loading && products.length" class="grid grid-cols-12 mx-auto gap-3">
        <OnlineStoreCartOnlineStore v-for="item in products" :key="item.id" :name="truncateText(item.name, 7)"
            :src="item.image" :title="truncateText(item.description, 25)" :price="item.total_price"
            :to="localePath({ name: 'online_store-details', params: { details: item.id } })"
            class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12" />
    </div>

    <!-- When not loading and no products are available -->
    <div v-else-if="!loading && !products.length"
        class="flex justify-center items-center mx-auto w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl p-4">
        <img :src="empty" alt="No Data" class="w-full h-auto object-contain" />
    </div>

    <!-- When loading -->
    <div v-else class="grid grid-cols-12 mx-auto gap-3">
        <Skeleton v-for="i in 15" :key="i" width="10rem" height="4rem" borderRadius="16px"
            class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12" />
    </div>


    <div class="!border-none mt-5" v-if="!loading && pagination.total_pages > 1">
        <div class="mt-5">
            <Paginator :totalRecords="pagination.total_items" :rows="pagination.per_page"
                :first="(pagination.current_page - 1) * pagination.per_page" @page="onPageChange" />
        </div>
    </div>
</template>

<script setup>

//  imports
import filter from "@/assets/img/filter.svg"
import empty from '@/assets/img/empty.png'

//stores
const route = useRoute();
const localeRoute = useLocaleRoute();
const { getCategoriesProducts, getProductsFilter } = useOnlineStore();
const { products, pagination } = storeToRefs(useOnlineStore());

//state
const loading = ref(false);
const visible = ref(false);
const loading_button = ref(false);


//  responsive
const { t } = useI18n();
onMounted(async (page = 1) => {
    loading.value = true;
    await getCategoriesProducts(route.params.id, page);
    loading.value = false;
});

const ingredient = ref('desc');
const onPageChange = (event) => {
    const page = event.page + 1; // Extract the page number from the event
    getCategoriesProducts(route.params.id, page); // Fetch new products
};

const SubmitFilter = async () => {
    try {
        visible.value = false;
        // Start loading states
        loading_button.value = true;
        visible.value = false;
        loading.value = true;

        // Fetch filtered products
        await getProductsFilter(route.params.id, ingredient.value);
    } catch (error) {
        console.error("Error applying filter:", error);
    } finally {
        // Ensure loading states are reset regardless of success or failure
        loading.value = false;
        loading_button.value = false;
    }
};

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

</script>
