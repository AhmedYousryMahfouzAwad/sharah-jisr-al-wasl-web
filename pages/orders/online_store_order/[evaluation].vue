<template>
    <div>
        <!-- Home Title -->
        <HomeTitle title="pages.product_evaluation" class="my-3 max-w-6xl" />

        <!-- Products Grid -->
        <div v-if="!loading_Skeleton && products.length > 0" class="grid grid-cols-12 mx-auto gap-3">
            <div v-for="item in products" :key="item.id"
                class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12 bg-transparent border rounded-lg shadow-sm overflow-hidden flex px-2 items-center">
                <div class="flex items-center justify-center pt-1">
                    <img :src="item.image" alt="online_stores" class="w-24 h-24 object-cover rounded-lg" />
                </div>
                <div class="flex-1">
                    <div class="flex justify-between items-center px-1">
                        <div class="flex items-center gap-x-2">
                            <img :src="security" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                            <span class="text-sm">{{ truncateText(item.name, 10) }}</span>
                        </div>

                        <div class="flex items-center gap-x-1">
                            <div class="flex items-center gap-x-1">
                                <Rating v-model="item.rating" class="!text-yellow-500" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Skeleton Loader for Loading State -->
        <div v-if="loading_Skeleton" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div v-for="i in 9" :key="i"
                class="p-4 bg-gray-200 animate-pulse rounded-lg flex   items-center space-y-4 shadow-md">
                <!-- Image Placeholder -->
                <div class="w-full h-32 bg-gray-300 rounded-lg"></div>
                <!-- Text Placeholders -->
                <div class="w-full space-y-2  flex flex-col">
                    <div class="w-3/4 h-4 bg-gray-300 rounded mx-auto"></div>
                    <div class="w-2/4 h-4 bg-gray-300 rounded mx-auto"></div>
                </div>
            </div>
        </div>
        <div v-if="!loading_Skeleton && products.length == 0">
            <img :src="not_found" class="mx-auto w-1/3 my-10" alt="empty" />
        </div>


        <!-- Submit Evaluation Button -->
        <div class="md:w-[35%] md:px-0 mx-auto my-5 px-2">
            <ButtonAuth @click="submitEvaluation" :loading="loading" :label="t('pages.send')" />
        </div>

        <!-- dialog_animation-->
        <BaseDialog v-model:visible="visible_rating_animation" class="w-full max-w-xl mx-2">
            <template #content>
                <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
                <span
                    class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                    {{ t('pages.congratulations_rate') }}
                </span>


            </template>
        </BaseDialog>
    </div>
</template>

<script setup>
//  imports
import animation from "@/assets/img/animation.gif";
import security from "@/assets/img/security.svg";
import not_found from "@/assets/img/no_data.jpg";

//store
const { t } = useI18n();
const route = useRoute();
const { orderEvaluation } = useCreateOrderStore();
const { products } = storeToRefs(useCreateOrderStore());
const { getRate } = useRateStore();
const { resMsg } = storeToRefs(useRateStore());

const loading = ref(false);
const loading_Skeleton = ref(true);
const visible_rating_animation = ref(false);
// Compute the average rating
const averageRating = computed(() => {
    const ratings = products.value.map((product) => product.rating || 0);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return ratings.length ? (total / ratings.length).toFixed(2) : "N/A";
});


// store
const localePath = useLocalePath();
const router = useRouter();

// Function to truncate text
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

// Fetch products and evaluations on mounted
onMounted(async () => {
    loading_Skeleton.value = true;
    await orderEvaluation(route.params.evaluation);
    loading_Skeleton.value = false;
});

// Submit evaluation for the products
const submitEvaluation = async () => {
    loading.value = true;
    visible_rating_animation.value = true;

    // Transforming the products into the required format
    const productsRates = {};
    products.value.forEach((product, index) => {
        productsRates[`products_rates[${index}][product_id]`] = product.product_id;
        productsRates[`products_rates[${index}][rating]`] = product.rating;
    });

    const payload = {
        order_id: route.params.evaluation,
        ...productsRates,
    };

    await getRate(payload);

    setTimeout(() => {
        visible_rating_animation.value = false;
        router.push(localePath("/"));

    }, 1500)
    loading.value = false; // Stop loading after the submission
};
</script>

<style scoped>
.gold-stars .p-rating-icon {
    color: gold !important;
    /* Make stars golden */
}

/* Skeleton Loader Styles */
.animate-pulse {
    animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
    0% {
        background-color: #f3f4f6;
    }

    50% {
        background-color: #e5e7eb;
    }

    100% {
        background-color: #f3f4f6;
    }
}

.skeleton-loader {
    display: flex;
    align-items: center;
    gap: 16px;
}
</style>
