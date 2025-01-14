<template>
    <div v-if="isAuth" class="grid grid-cols-12 justify-end items-center shadow-b-lg  py-4 shadow-lg border-b">
        <div class="flex col-span-2">
            <button @click="toggleSidebar"
                class="p-2 rounded-full  flex justify-end items-end mx-2 bg-blue-100 hover:bg-blue-200 md:hidden">
                <i class="pi pi-bars text-primary-1" style=" font-size: 1.2rem"></i>

            </button>
            <!---- Invoice -->
            <div class="max-w-xl mx-auto">
                <BaseDialog v-model:visible="visible" :show_accept="false">
                    <template #content>
                        <div
                            class="flex justify-center items-center p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-lg mx-auto w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw]">
                            <iframe :src="order_details.invoice"
                                class="w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] border-none rounded-md"></iframe>
                        </div>
                    </template>
                </BaseDialog>
            </div>
            <!--- Invoice -->
            <div class="max-w-xl mx-auto">
                <BaseDialog v-model:visible="visible_liberty" :show_accept="false">
                    <template #content>
                        <div
                            class="flex justify-center items-center p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-lg mx-auto w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw]">
                            <iframe :src="order_details_pool_construction.invoice"
                                class="w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] border-none rounded-md"></iframe>
                        </div>
                    </template>
                </BaseDialog>
            </div>
            <!---- Invoice -->
            <div class="max-w-xl mx-auto">
                <BaseDialog v-model:visible="visible_liberty_immediate" :show_accept="false">
                    <template #content>
                        <div
                            class="flex justify-center items-center p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-lg mx-auto w-full sm:w-[90vw] md:w-[80vw] lg:w-[70vw]">
                            <iframe :src="order_details_immediate.invoice"
                                class="w-full h-[60vh] sm:h-[70vh] md:h-[75vh] lg:h-[80vh] border-none rounded-md"></iframe>
                        </div>
                    </template>
                </BaseDialog>
            </div>
        </div>

        <div class="flex items-end justify-end space-x-4 mx-5 gap-4  col-span-10 ">
            <button @click="visible = true"
                v-if="localePath({ name: 'orders-online_store_order-id', params: { id: route.params.id } }) === $route.path"
                class="p-2 mx-3 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="liberty" alt="liberty" class="w-5 h-5" />
            </button>

            <button @click="visible_liberty = true"
                v-if="localePath({ name: 'orders-pool_construction-id', params: { id: route.params.id } }) === $route.path && [4, 5, 6, 9].includes(order_details_pool_construction.status)"
                class="p-2 mx-3 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="liberty" alt="liberty" class="w-5 h-5" />
            </button>

            <button @click="visible_liberty_immediate = true"
                v-if="localePath({ name: 'orders-immediate_maintenance-id', params: { id: route.params.id } }) === $route.path && [4, 5, 6, 9].includes(order_details_immediate.status)"
                class="p-2 mx-3 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="liberty" alt="liberty" class="w-5 h-5" />
            </button>


            <NuxtLink :to="localeRoute({ name: 'shopping_cart' })"
                class="relative p-2 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="shopping_cart" alt="image_shopping_cart" class="w-5 h-5" />
                <span v-if="countShoppingCart"
                    class="badge absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {{ countShoppingCart }}
                </span>
            </NuxtLink>

            <NuxtLink :to="localeRoute({ name: 'notifications' })"
                class="relative p-2 rounded-full bg-blue-100  cursor-pointer    hover:bg-blue-200">
                <img :src="notifications" alt="notifications" class="w-5 h-5" />
                <span v-if="count"
                    class="badge absolute  top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {{ count }}
                </span>
            </NuxtLink>

        </div>
    </div>
</template>

<script setup>

import shopping_cart from "@/assets/img/shopping_cart.svg"
import notifications from "@/assets/img/notifications.svg"
import liberty from "@/assets/img/liberty.svg"
const visible = ref(false);
const visible_liberty = ref(false);
const visible_liberty_immediate = ref(false);
const router = useRouter();  // Use the router instance


const { count } = storeToRefs(useNotification());
const { countNotification } = useNotification();
const { countCart } = useCartStore();
const { countShoppingCart } = storeToRefs(useCartStore());
const { isAuth } = storeToRefs(useAuthStore());


let dialogWidth = ref('');
import { useRoute } from 'vue-router';
const route = useRoute(); // استخدم useRoute للوصول إلى معلمات المسار

onMounted(async () => {
    if (isAuth.value) {
        try {
            await countNotification();
        } catch (error) {
            console.log(error);
        }
    }
    if (isAuth.value) {
        try {
            await countCart();
        } catch (error) {
            console.log(error);
        }
    }


})
//  responsive 
const updateDialogWidth = () => {
    if (window.innerWidth < 640) {
        dialogWidth.value = '100%';
    } else if (window.innerWidth <= 768) {
        dialogWidth.value = '55%';
    } else if (window.innerWidth < 1024) {
        dialogWidth.value = '25%';
    }
};


const { order_details_obj: order_details } = storeToRefs(useCreateOrderStore());
const { order_details_obj: order_details_pool_construction } = storeToRefs(useBoolConstructionStore());
const { order_details_obj: order_details_immediate } = storeToRefs(useInstantStore());

const { orderDetails } = useCreateOrderStore();
const { t } = useI18n();

onMounted(() => {
    updateDialogWidth();
    window.addEventListener('resize', updateDialogWidth);
});

const localeRoute = useLocaleRoute();

const props = defineProps({
    toggleSidebar: {
        type: Function,
        required: true,
    },
});

</script>
