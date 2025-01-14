<template>
    <div class="xl:mx-auto mt-5 ">
        <!-- Home Title -->
        <HomeTitle title="pages.orders" class="my-3 " />

        <!-- Orders Tabs Component -->
        <OrdersTabs :tabs="[
            { value: null, label: t('pages.current') },
            { value: 9, label: t('pages.Finished') }
        ]" v-model="activeTab" @update:model-value="fetchOrders(1, activeTab)" />

        <!-- Tab Content -->
        <div class="tab-content mt-4 max-w-5xl mx-auto pb-10">
            <div class="grid gap-x-6 grid-cols-12 mx-auto sm:grid-cols-6 md:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6">
                <!-- Render actual orders -->
                <OrdersCard v-if="!loading && list_orders.length > 0" v-for="item in list_orders" :key="item.id"
                    :state="item.status_text" :num="item.order_num" :date="item.date"
                    :to="localeRoute({ name: 'orders-online_store_order-id', params: { id: item.id } })" />
                <!-- Mock placeholders -->
                <div v-else v-for="index in Array.from({ length: 10 })" :key="index"
                    class="md:!col-span-3 col-span-12 m-5 p-4 rounded-lg shadow-md">
                    <div>
                        <div class="h-10 bg-gray-300 rounded-md mb-4"></div>
                        <hr />
                        <div class="h-10 bg-gray-300 rounded-md mb-4"></div>
                    </div>
                </div>
            </div>

            <!-- Paginator -->
            <div class=" mt-5" v-if="!loading && pagination.total_pages > 1 && list_orders.length > 0">

                <Paginator :totalRecords="pagination.total_items" :rows="pagination.per_page"
                    :first="(pagination.current_page - 1) * pagination.per_page" @page="changePage" />
            </div>

            <!-- No Data Message -->
            <div v-if="!loading && list_orders.length === 0" class="flex justify-center items-center">
                <img src="@/assets/img/no_data.jpg" class="mx-auto w-1/3 my-10" alt="empty" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const { t } = useI18n();
const { list_orders, pagination } = storeToRefs(useCreateOrderStore())
const { getOrder } = useCreateOrderStore()
const localeRoute = useLocaleRoute()
const loading = ref(true)

// Active tab state
const activeTab = ref(null);


const fetchOrders = async (page = 1, tab = null) => {
    loading.value = true;
    try {
        await getOrder(tab, page);
    } catch (error) {
        console.error("Error fetching orders:", error);
    } finally {
        loading.value = false; ``
    }
};
// دالة تغيير الصفحة
const changePage = (event) => {
    const page = event.page + 1; // اجعل الصفحة تبدأ من 1
    fetchOrders(page, activeTab.value);
};
onMounted(() => {
    fetchOrders(1, activeTab.value);
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
