<template>


    <!--title-->
    <div>
        <HomeTitle title="pages.order_details" class="my-3 max-w-6xl" />
    </div>

    <!-- Skeleton for Order Details List -->
    <div v-if="loading">
        <div class="grid grid-cols-12 gap-3 py-4">
            <!-- Skeleton for Order Details List -->
            <div class="col-span-12 xl:col-span-7 p-4 shadow-lg rounded-lg animate-pulse">
                <div class="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
            <div class="col-span-12 xl:col-span-5 p-4 shadow-lg rounded-lg animate-pulse">
                <div class="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
            <div class="col-span-12 xl:col-span-7 p-4 shadow-lg rounded-lg animate-pulse">
                <div class="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
            <div class="col-span-12 xl:col-span-5 p-4 shadow-lg rounded-lg animate-pulse">
                <div class="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
            <div class="col-span-12 xl:col-span-7 p-4 shadow-lg rounded-lg animate-pulse">
                <div class="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
            <div class="col-span-12 xl:col-span-5 p-4 shadow-lg rounded-lg animate-pulse">
                <div class="w-full h-24 bg-gray-300 rounded-lg mb-4"></div>
                <div class="w-3/4 h-6 bg-gray-300 rounded mb-2"></div>
                <div class="w-1/2 h-6 bg-gray-300 rounded"></div>
            </div>
        </div>
    </div>

    <!-- Order Details List -->
    <div v-else class="py-10">
        <div v-for="item in order_details_list" :key="item.id"
            class="justify-between items-center  grid grid-cols-12 gap-3 md:py-4 py-2 ">

            <div class="shadow-lg w-ful grid bg-white   xl:col-span-7 col-span-12 rounded-lg  p-2 h-full ">
                <div class="grid grid-cols-12  space-y-5">

                    <div class="flex col-span-4 w-[100%] justify-start gap-x-16 items-center px-1">
                        <div>
                            <img :src="item.image" class="w-[95%]" alt="Flag icon" />
                        </div>
                    </div>

                    <div class="col-span-8 flex flex-col justify-center space-y-4">
                        <div class="flex flex-wrap justify-between items-center px-2 py-1   ">
                            <!-- Left Section -->
                            <div class="flex items-center  gap-2 w-full sm:w-auto mb-1 sm:mb-0">
                                <!-- Security Icon -->
                                <img :src="security" alt="Security Icon" class="w-4 h-4 sm:w-5 sm:h-5" />
                                <!-- Item Name -->
                                <span class="text-xs sm:text-sm md:text-base font-medium truncate">{{ item.name
                                    }}</span>
                            </div>

                            <!-- Right Section -->
                            <div class="flex items-center  gap-2 w-full sm:w-auto">
                                <!-- Money Icon -->
                                <img :src="money" alt="Money Icon" class="w-4 h-4 sm:w-5 sm:h-5" />
                                <!-- Price -->
                                <span class="text-xs sm:text-sm md:text-base font-semibold text-gray-800">
                                    <span>{{ t('pages.sar') }}</span> {{ item.price }}
                                </span>
                            </div>
                        </div>

                        <!-- <div class="flex md:hidden  items-center gap-x-1 ">
                        <Rating v-model="value" />
                    </div> -->
                        <!-- Description -->
                        <p class="text-gray-400 line-clamp-2  md:text-base text-xs px-2">
                            {{ item.description }}
                        </p>

                        <div class="flex justify-start items-center space-x-2  p-2  ">
                            <!-- Save Label Section -->
                            <div label="Save" class="flex items-center gap-2 bg-transparent border-none">
                                <!-- Report Icon -->
                                <img :src="report" alt="wishlist" class="w-4 h-4 sm:w-5 sm:h-5" />
                                <!-- Quantity Text -->
                                <span class="text-xs sm:text-sm lg:text-base font-medium text-black">
                                    {{ item.quantity }}
                                </span>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <!--Warranty-->

            <div class="xl:col-span-5 col-span-12 bg-white shadow-lg rounded-lg h-full p-4">
                <!-- Warranty Title -->
                <p class="text-gray-500 text-sm sm:text-base mb-4">
                    {{ t('buttons.warranty') }}:
                </p>

                <hr class="border-gray-200" />

                <!-- Warranty Details -->
                <div class="flex items-start justify-start gap-2 mt-4">
                    <!-- Icon -->
                    <IconsOfferIcon class="w-5 h-5 sm:w-6 sm:h-6 text-primary-1" />

                    <!-- Warranty Text -->
                    <p class="text-gray-400 text-xs sm:text-sm md:text-base line-clamp-2">
                        {{ item.warranty }}
                    </p>
                </div>
            </div>
        </div>

        <div class="justify-between items-center grid grid-cols-12 gap-3">

            <!-- Order status_text -->
            <div class="shadow-lg bg-white grid xl:col-span-6 col-span-12 rounded-lg px-5 py-4 h-full">
                <!-- Row 1: Order Number and Status -->
                <div class="flex justify-between items-center mb-4">
                    <!-- Order Number -->
                    <div class="flex items-center gap-2">
                        <img :src="note" alt="Order Icon" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="text-sm sm:text-base font-semibold text-gray-800">
                            {{ order_details_obj.order_num }}
                        </p>
                    </div>
                    <!-- Order Status -->
                    <div class="flex items-center gap-2">
                        <img :src="reports" alt="Status Icon" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="text-sm sm:text-base font-semibold text-gray-800">
                            {{ order_details_obj.status_text }}
                        </p>
                    </div>
                </div>

                <!-- Row 2: Created Date and Payment Type -->
                <div class="flex justify-between items-center mb-4">
                    <!-- Created Date -->
                    <div class="flex items-center gap-2">
                        <img :src="data" alt="Date Icon" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="text-sm sm:text-base font-semibold text-gray-800">
                            {{ order_details_obj.created_at }}
                        </p>
                    </div>
                    <!-- Payment Type -->
                    <div class="flex items-center gap-2">
                        <img :src="money" alt="Payment Icon" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="text-sm sm:text-base font-semibold text-gray-800">
                            {{ order_details_obj.pay_type }}
                        </p>
                    </div>
                </div>

                <!-- Row 3: Map Description -->
                <div class="flex items-center gap-2">
                    <img :src="website" alt="Website Icon" class="w-4 h-4 sm:w-5 sm:h-5">
                    <p class="text-sm sm:text-base font-semibold text-gray-800">
                        {{ order_details_obj.map_desc }}
                    </p>
                </div>
            </div>


            <!--OnlineStoreCost-->
            <div class="xl:col-span-6 col-span-12 bg-white shadow-lg rounded-lg px-6 py-4 space-y-6 h-full">
                <!-- Row 1: Product Price and Installation Price -->
                <div class="flex justify-between items-center">
                    <!-- Product Price -->
                    <div class="flex items-center gap-2">
                        <OnlineStoreCost :name="t('pages.product_price')"
                            :price="order_details_obj.total_products_price" :src="note" />
                    </div>
                    <!-- Installation Price -->
                    <div class="flex items-center gap-2">
                        <OnlineStoreCost :name="t('pages.installation_price')"
                            :price="order_details_obj.product_installation_price" :src="note" />
                    </div>
                </div>

                <!-- Row 2: Delivery Price and Discount Price -->
                <div class="flex justify-between items-center">
                    <!-- Delivery Price -->
                    <div class="flex items-center gap-2">
                        <OnlineStoreCost :name="t('pages.delivery_price')" :price="order_details_obj.deliver_price"
                            :src="note" />
                    </div>
                    <!-- Discount Price -->
                    <div class="flex items-center gap-2">
                        <OnlineStoreCost :name="t('pages.discount_price')" :price="order_details_obj.coupon_amount"
                            :src="note" />
                    </div>
                </div>

                <!-- Row 3: Total Price and Tax Value -->
                <div class="flex justify-between items-center">
                    <!-- Total Price -->
                    <div class="flex items-center gap-2">
                        <OnlineStoreCost :name="t('pages.total_price')" :price="order_details_obj.final_total"
                            :src="note" />
                    </div>
                    <!-- Tax Value -->
                    <div class="flex items-center gap-2">
                        <OnlineStoreCost :name="t('pages.tax_value')" :price="order_details_obj.vat_amount"
                            :src="note" />
                    </div>
                </div>
            </div>

        </div>
        <div v-if="order_details_obj.status === 9"
            class="w-full flex justify-center items-center max-w-2xl mx-auto p-4 mt-5 gap-4">
            <!-- Product Evaluation Button -->
            <NuxtLink
                :to="localeRoute({ name: 'orders-online_store_order-evaluation', params: { evaluation: order_details_obj.id } })"
                class="font-bold md:text-base text-sm bg-primary-2 text-white main-btn w-3/5 flex justify-center items-center mx-auto
               border-2 border-primary-2 rounded-3xl cursor-pointer p-3 hover:bg-transparent hover:text-primary-2
               transition-colors duration-500 ease-in-out">
                {{ t("pages.product_evaluation") }}
            </NuxtLink>

            <!-- Reorder Button -->
            <button @click="resendOrder()" class="main-btn font-bold md:text-base text-sm text-white w-3/5 flex justify-center items-center mx-auto
               border-2 border-red-2 bg-red-2 rounded-3xl cursor-pointer p-3 hover:bg-transparent hover:text-red-2
               transition-colors duration-500 ease-in-out">
                {{ t("pages.reorder") }}
            </button>
        </div>
    </div>

</template>

<script setup>
// import
import security from "@/assets/img/security.svg";
import money from "@/assets/img/money.svg";
import report from "@/assets/img/reports.svg";
import note from "@/assets/img/note.svg";
import reports from "@/assets/img/reports.svg";
import data from "@/assets/img/data.svg";
import website from "@/assets/img/website.svg";
import { useRoute } from 'vue-router';


// route
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// i18n
const { t } = useI18n();

//store
const { orderDetails, reOrder } = useCreateOrderStore();
const { order_details_obj, order_details_list } = storeToRefs(useCreateOrderStore());

// loading
const loading = ref(true);

//hooks
onMounted(async () => {
    loading.value = true;
    await orderDetails(route.params.id);
    loading.value = false;
})

const resendOrder = async () => {
    const payload = {
        order_id: route.params.id
    }
    await reOrder(payload);
    navigateTo(localePath('/shopping_cart'));
}

</script>