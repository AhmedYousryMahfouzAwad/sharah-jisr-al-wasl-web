<template>
    <div class="xl:mx-auto mt-5 ">
        <!-- Home Title -->
        <HomeTitle title="pages.orders" class="my-3 " />

        <!-- Orders Tabs Component -->

        <OrdersTabs :tabs="[
            { value: 1, label: t('pages.waiting') },
            { value: 2, label: t('pages.pending_payment') },
            { value: 4 || 5 || 6, label: t('pages.current') },
            { value: 9, label: t('pages.Finished') }
        ]" v-model="activeTab" @update:model-value="setActiveTab(1, activeTab)" class="orders-tabs" />



        <!-- Tab Content -->
        <div class="tab-content mt-4 max-w-5xl mx-auto pb-10">
            <div class="grid gap-x-6 grid-cols-12 mx-auto sm:grid-cols-6 md:grid-cols-6 xl:grid-cols-6 lg:grid-cols-6">

                <OrdersCard v-if="!loading && list_orders.length > 0" v-for="item in list_orders" :key="item.id"
                    :state="item.status_text" :num="item.order_num" :date="item.date"
                    :to="localeRoute({ name: 'orders-immediate_maintenance-id', params: { id: item.id } })" />

                <div v-if="loading" v-for="index in Array.from({ length: 10 })" :key="index"
                    class="md:!col-span-3 col-span-12 m-5 p-4 rounded-lg shadow-md">
                    <div>
                        <div class="h-10 bg-gray-300 rounded-md mb-4"></div>
                        <hr />
                        <div class="h-10 bg-gray-300 rounded-md mb-4"></div>
                    </div>
                </div>

            </div>


            <!-- No Data Message -->
            <div v-if="!loading && list_orders.length === 0" class="flex justify-center items-center">
                <img src="@/assets/img/no_data.jpg" class="mx-auto w-1/3 my-10" alt="empty" />
            </div>
        </div>

        <!-- Paginator -->
        <div class=" mt-5" v-if="!loading && pagination.total_pages > 1 && list_orders.length > 0">

            <Paginator :totalRecords="pagination.total_items" :rows="pagination.per_page"
                :first="(pagination.current_page - 1) * pagination.per_page" @page="changePage" />
        </div>

    </div>
</template>

<script setup>

const { t } = useI18n();
// state
const activeTab = ref(1);
const loading = ref(true)

const { list_orders, pagination } = storeToRefs(useInstantStore());
const { getOrder } = useInstantStore();
const setActiveTab = async (page = 1, tabValue) => {
    loading.value = true;
    activeTab.value = tabValue;
    let statuses = [tabValue];

    // For the "Pending Payment" tab, if it includes both statuses 4 and 5
    if (tabValue === 4 || tabValue === 5 || tabValue === 6) {
        statuses = [4, 5, 6];
    }
    if (tabValue === 1) {
        statuses = [1];
    }
    if (tabValue === 2) {
        statuses = [2];
    }
    if (tabValue === 9) {
        statuses = [9];
    }

    await getOrder(statuses, page);
    loading.value = false
};

const changePage = (event) => {
    console.log('Event received:', event);

    if (!pagination.value) {
        return;
    }

    if (typeof event.page !== 'number') {
        return;
    }

    const page = event.page + 1;
    pagination.value.current_page = page;
    setActiveTab(page, activeTab.value);
};

onMounted(() => {
    console.log('Initial Pagination:', pagination.value);
    setActiveTab(1, activeTab.value);
});;


</script>
