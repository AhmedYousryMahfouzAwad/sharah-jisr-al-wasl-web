<template>

    <div class="flex justify-between items-center   mx-auto  ">
        <HomeTitle title="pages.order_details" class="my-3 max-w-6xl" />
        <!--Chat-->
        <div>
            <button
                v-if="order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 6 || order_details_obj.status === 9"
                @click="handleNavigation" class="p-2 rounded-full  bg-blue-100 hover:bg-blue-200">
                <img :src="chat" alt="chat" class="w-5 h-5" />
            </button>
        </div>
    </div>

    <!-- Skeleton for Order Details List -->
    <div v-if="loading_skeleton">
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

    <div v-else>
        <!--card accepted-->
        <div v-if="order_details_obj.status === 2"
            class="bg-primary-1 p-2  md:w-[50%] w-full sm:p-3 md:text-base text-sm rounded-lg text-white">
            <p> {{ t('pages.the_order') }} </p>
        </div>

        <div class="justify-between items-center grid grid-cols-12 gap-3 py-4 ">

            <div class="shadow-lg w-ful grid  xl:col-span-7 col-span-12 bg-white rounded-lg space-y-5 p-2 h-full ">
                <!--card SIZE-->
                <div class="grid grid-cols-12 gap-4">
                    <!-- Image Section -->
                    <div class="flex md:col-span-4 col-span-12 justify-center items-center px-2">
                        <img :src="order_details_obj.design_image_id"
                            class="w-full max-w-[90%] h-auto rounded-xl object-contain" alt="image_sizes" />
                    </div>

                    <!-- Details Section -->
                    <div class="md:col-span-8 col-span-12 flex flex-col w-full h-full justify-center items-start  px-2">
                        <p class="font-bold md:text-lg text-base">
                            {{ t('pages.sizes') }}
                        </p>
                        <span class="flex text-gray-500 md:text-base text-sm gap-2">
                            {{ t('pages.auth.height') }} - {{ order_details_obj.length }} {{ t('pages.meter') }}
                        </span>
                        <span class="flex text-gray-500 md:text-base text-sm gap-2">
                            {{ t('pages.auth.width') }} - {{ order_details_obj.width }} {{ t('pages.meter') }}
                        </span>
                        <span class="flex text-gray-500 md:text-base text-sm gap-2">
                            {{ t('pages.depth') }} - {{ order_details_obj.height }} {{ t('pages.meter') }}
                        </span>
                    </div>
                </div>
            </div>
            <!--Date and time-->
            <div class="xl:col-span-5 col-span-12 bg-white shadow-lg rounded-lg h-full p-2">

                <p class="text-gray-500 my-5  md:text-base text-sm"> {{ t('pages.service_date_and_time') }}:</p>
                <hr />

                <div class="flex flex-col justify-between items-start mt-2">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="clock" alt="clock_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="md:!text-sm text-xs font-bold text-gray-800"> {{ order_details_obj.time }} </p>
                    </div>

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="data" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="md:!text-sm text-xs font-bold text-gray-800"> {{ order_details_obj.date }} </p>
                    </div>

                </div>
            </div>

            <!--Status-->
            <div class="shadow-lg w-ful grid space-y-5  bg-white py-5 xl:col-span-6 col-span-12 rounded-lg px-5 h-full">

                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="note" alt="note_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm   font-semibold text-gray-800"> {{ order_details_obj.order_num }} </p>
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="reports" alt="reports_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm   font-semibold text-gray-800">{{ order_details_obj.status_text }} </p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="data" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm   font-semibold text-gray-800"> {{ order_details_obj.created_at }} </p>
                    </div>

                </div>
                <div class="flex justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="website" alt="website_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm   font-semibold text-gray-800"> {{ order_details_obj.map_desc }}
                        </p>
                    </div>

                </div>
            </div>

            <!--tasks-->
            <div v-if="order_details_obj.status === 9 && order_details_obj?.tasks?.length > 0"
                class="xl:col-span-6 col-span-12 bg-white shadow-lg rounded-lg h-full p-2">
                <p class="text-gray-500 my-2 text-sm font-semibold"> {{ t('pages.tasks_completed') }} </p>
                <hr />

                <div class="flex flex-col justify-center items-start mt-2">
                    <div class="card flex justify-center">
                        <div class="flex flex-col gap-2">

                            <div v-for="item in order_details_obj.tasks" :key="item.id" class="flex gap-2 items-center">
                                <!-- Checkbox -->
                                <input type="checkbox" :checked="item.is_selected" disabled :id="`task-${item.id}`"
                                    class="custom-checkbox" />
                                <label :for="`task-${item.id}`" class="text-sm font-bold">{{ item.name }}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="order_details_obj.status === 2 || order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 6 || order_details_obj.status === 9"
                class="xl:col-span-6 col-span-12 space-y-3  py-5 shadow-lg  bg-white rounded-lg h-full p-2">
                <div class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost class=" text-sm  font-semibold" :name="t('pages.service_price')"
                            :price="order_details_obj?.price_offer?.price" :src="note" />
                    </div>
                    <div class="flex  justify-center items-center gap-x-2">
                        <OnlineStoreCost class=" text-sm  font-semibold" :name="t('pages.tax_value')"
                            :price="order_details_obj?.price_offer?.vat_amount" :src="note" />
                    </div>
                </div>


                <div class="flex justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost class=" !text-sm   font-semibold" :name="t('pages.total_price')"
                            :price="order_details_obj?.price_offer?.total_price" :src="note" />

                    </div>
                </div>
            </div>
            <!--card refused-->
            <div v-if="order_details_obj.has_offer === true && order_details_obj.status === 1"
                class=" xl:col-span-12 w-full col-span-12 space-y-3 border-2 my-5 rounded-lg h-full p-2">
                <div class="flex justify-between items-center px-5">
                    <OnlineStoreCost :name="t('pages.product_price')" :price="order_details_obj?.price_offer?.price"
                        :src="note" />
                    <OnlineStoreCost :name="t('pages.installation_price')"
                        :price="order_details_obj?.price_offer?.vat_amount" :src="note" />
                    <OnlineStoreCost :name="t('pages.total_price')" :price="order_details_obj?.price_offer?.total_price"
                        :src="note" />
                </div>
                <div class="text-center">
                    <p class="text-black">{{ t('pages.price_offer_suitable') }}</p>
                </div>
                <div class=" w-full my-10 gap-4  flex justify-center items-center max-w-2xl  mx-auto p-4 ">
                    <ButtonAuth @click="submitAccept()" :label="t('pages.yes')" :loading="loading" class="!w-[30%]" />

                    <button @click="visible = true" class="main-btn font-bold  md:text-base text-sm text-primary-2 w-[30%] flex flex-col justify-center items-center  border-2  border-primary-2
                bg-transparent rounded-3xl cursor-pointer p-2 
                ease-in-out">
                        {{ t("pages.no") }}
                    </button>

                </div>

                <!-- dialog-->
                <div class="mx-5">
                    <BaseDialog v-model:visible="visible">
                        <template #content>
                            <div class="mx-auto container px-4 sm:px-6 lg:px-8">
                                <span
                                    class="text-surface-500 text-center text-font-bold dark:text-surface-400 block mb-8 mx-auto text-lg md:text-xl">
                                    {{ t('pages.reason') }}
                                </span>
                                <form @submit.prevent="submitReject" class="my-5">
                                    <Field v-model="message" name="message" type="text" v-slot="{ errorMessage }">
                                        <Textarea id="over_label" :placeholder="t('pages.enter_massage')"
                                            class="!rounded-3xl w-full my-5" v-model="message" name="message" rows="5"
                                            style="resize: none" />
                                        <span v-if="errorMessage"
                                            class="error-message text-red-2 text-sm flex flex-col justify-center items-center">{{
                                                errorMessage
                                            }}</span>
                                    </Field>

                                    <ButtonAuth type="submit" :loading="loading" :label="t('pages.send')"
                                        class="w-full mx-auto text-center" />

                                </form>
                            </div>
                        </template>
                    </BaseDialog>


                    <!-- dialog_reject-->
                    <BaseDialog v-model:visible="visible_reject" class="w-full max-w-xl mx-2">
                        <template #content>

                            <span
                                class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                                {{ resMsg }}
                            </span>

                            <img :src="animation" alt="animation_image"
                                class="mx-auto justify-center items-center flex">
                        </template>
                    </BaseDialog>

                </div>

            </div>
            <!--image-->
            <div v-if="(order_details_obj?.visit_images?.length > 0 ||
                [4, 5, 6, 9].includes(order_details_obj?.status)) &&
                (order_details_obj?.visit_description || order_details_obj?.visit_images?.length > 0)"
                class="shadow-lg w-full grid xl:col-span-6 col-span-12 rounded-lg p-5 h-full">

                <div v-if="order_details_obj?.visit_description" class="flex justify-start items-start gap-x-2">
                    <p class="font-semibold text-gray-500 text-sm">
                        {{ order_details_obj?.visit_description }}
                        <span></span>
                    </p>
                </div>


                <div v-if="order_details_obj?.visit_images?.length > 0"
                    class="grid grid-cols-12 justify-center items-center gap-2 mt-3">
                    <img v-for="item in order_details_obj.visit_images" :key="item.id" :src="item.image" alt="date_img"
                        class="w-full col-span-2">
                </div>

            </div>

            <!--Profile-->
            <div v-if="order_details_obj?.status === 4 || order_details_obj?.status === 5 || order_details_obj?.status === 6 || order_details_obj?.status === 9 || order_details_obj?.employee != null"
                class=" xl:col-span-6 col-span-12 flex  bg-white   justify-between items-center shadow-lg
                rounded-lg h-full p-2">
                <div class="flex justify-start items-center gap-3 ">
                    <Avatar :image="order_details_obj?.employee?.avatar" class="rounded-full" size="xlarge"
                        shape="circle" />
                    <p class="text-sm hidden sm:flex font-semibold">{{ order_details_obj?.employee?.name }}</p>
                    <p class="text-sm  flex sm:hidden font-semibold">{{ truncateText(order_details_obj?.employee?.name,
                        8) }}</p>
                </div>

                <!-- Right: Phone and Icon -->
                <div class="flex justify-between items-center gap-2 px-2">
                    <img :src="phone" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                    <p class="text-sm  font-semibold">{{ order_details_obj?.employee?.phone }}</p>
                    <p class="text-sm  font-semibold">+{{ order_details_obj?.employee?.country_code }} </p>

                </div>
            </div>
        </div>

        <!--RadioButton-->
        <div v-if="order_details_obj?.status === 2 && !paymentCompleted" class="card flex  ">
            <div class="flex flex-col gap-4 my-5">
                <p class="text-black font-bold">{{ t('pages.choose_payment_method') }}</p>
                <div v-for="category in categories" :key="category.key" class="flex items-center ">
                    <RadioButton v-model="selectedCategory" name="dynamic" class="mx-5 mt-1" :value="category.key" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>
        </div>

        <!--ButtonAuth-->
        <div v-if="order_details_obj?.status === 2 && !paymentCompleted"
            class="flex justify-center items-center max-w-[20%] mx-auto !mb-5">
            <ButtonAuth @click="submitPayment" :loading="loadingPay" type="button" :label="t('pages.payment')"
                class="gap-3 btn_auth" />
        </div>
        <!--ButtonAuthRating-->
        <div v-if="order_details_obj?.status === 9"
            class="flex  justify-center items-center md:w-[30%] w-[70%] mx-auto my-5">
            <ButtonAuth @click="visible_rating = true" :loading="loading_btn" :label="t('pages.engineer_evaluation')"
                class=" gap-3" />
        </div>

        <!-- dialog-->
        <div class="mx-5">
            <BaseDialog v-model:visible="visible_rating">
                <template #content>
                    <div class="mx-auto container px-4 sm:px-6 lg:px-8">
                        <img src="@/assets/img/rating.png" alt="rating">
                        <span
                            class="text-surface-500 text-center text-font-bold dark:text-surface-400 block my-5 mx-auto text-semibold">
                            {{ t('pages.how_was_your_experience') }} {{ order_details_obj?.employee?.name }}
                        </span>

                        <div class="flex items-center justify-center mx-auto gap-x-1">
                            <Rating v-model="rating" class="!text-yellow-500" />
                        </div>

                        <!--SubmitRating-->

                        <form @submit.prevent="submitRating" class="my-5">
                            <Field v-model="message" name="message" type="text" v-slot="{ errorMessage }">
                                <Textarea id="over_label" :placeholder="t('pages.enter_massage')"
                                    class="!rounded-3xl w-full py-5" v-model="message" name="message" rows="5"
                                    style="resize: none" />
                                <span v-if="errorMessage"
                                    class="error-message text-red-2 text-sm flex flex-col justify-center items-center">{{
                                        errorMessage
                                    }}</span>
                            </Field>

                            <ButtonAuth type="submit" :loading="loading_btn" :label="t('pages.send')"
                                class="w-full mx-auto text-center" />
                        </form>
                    </div>
                </template>
            </BaseDialog>



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

    </div>

</template>
<script setup>

// Image imports
import clock from "@/assets/img/clock.svg";
import phone from "@/assets/img/phone.svg";
import note from "@/assets/img/note.svg";
import chat from "@/assets/img/chat.svg";
import reports from "@/assets/img/reports.svg";
import data from "@/assets/img/data.svg";
import website from "@/assets/img/website.svg";
import animation from "@/assets/img/animation.gif";

// i18n
const { t } = useI18n();
const loading_skeleton = ref(true);
const loadingPayment = ref(false);
const visible_reject = ref(false);
const paymentCompleted = ref(false);
const loadingPay = ref(false);
const visible_rating = ref(false);
const visible_rating_animation = ref(false);
const rating = ref(3);

// Validation
import * as yup from 'yup'; // Import yup for validation schema
import { Field, useForm } from 'vee-validate';

// State
const visible = ref(false);
const value = ref(null);
const message = ref("");
const show = ref(false);
const loading_btn = ref(false);
const selectedCategory = ref(1);

// Categories
const categories = ref([
    { name: t('pages.wallet'), key: 1 },
    { name: t('pages.electronic'), key: 2 },
]);


const categories_1 = ref([
    { name: "Accounting", key: "A" },
    { name: "Marketing", key: "M" },
    { name: "Production", key: "P" },
    { name: "Research", key: "R" }
]);

// Store
const { orderDetails, orderReject, orderAccept, orderPay } = useBoolConstructionStore();
const { order_details_obj, loading, resMsg } = storeToRefs(useBoolConstructionStore());
const { getRateEmployee } = useRateStore();

// Router

const localeRoute = useLocaleRoute();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();

// Compute the average rating
const averageRating = computed(() => {
    const ratings = products.value.map((product) => product.rating || 0);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return ratings.length ? (total / ratings.length).toFixed(2) : "N/A";
});

// Navigation
const handleNavigation = () => {
    navigateTo('/chat');
};


// Define a combined validation schema for the form
const validationSchema = yup.object({
    message: yup.string().required(t('validation.required')),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});


//request loading_skeleton
onMounted(async () => {
    loading_skeleton.value = true;
    await orderDetails(route.params.id);
    loading_skeleton.value = false;
});

//submit accept
const submitAccept = async () => {
    loading.value = true;
    const payload = {
        order_id: route.params.id
    };
    try {
        await orderAccept(payload);
    } catch (error) {
        loading.value = false;
    } finally {
        loading.value = false;

    }
};
//submit payment
const submitPayment = async () => {
    loadingPay.value = true; // تشغيل حالة التحميل
    const payload = {
        order_id: route.params.id, // معرف الطلب
        pay_type: selectedCategory.value, // طريقة الدفع
    };
    try {
        await orderPay(payload); // إرسال الطلب للدفع

        // ضبط حالة الدفع كمكتملة
        paymentCompleted.value = true;

        // إظهار Dialog التهنئة
        visible_reject.value = true;
    } catch (error) {
        console.error('Payment failed:', error);
    } finally {
        loadingPay.value = false; // إيقاف حالة التحميل
    }
};
//submit rating
const submitRating = handleSubmit(async () => {
    loading_btn.value = true;
    visible_rating.value = false;

    try {
        // Fetch the employee ID from the order details

        // Create the payload
        const payload = new FormData();
        payload.append("order_id", route.params.id);
        payload.append("employees_rates[0][employee_id]", order_details_obj.value.employee.id);
        payload.append("employees_rates[0][rating]", rating.value);
        payload.append("employees_rates[0][review]", message.value);

        // Send the API request
        await getRateEmployee(payload);

        // Show success animation or dialog
        visible_rating_animation.value = true;
    } catch (error) {
        // Log and handle the error
        console.error("Error submitting rating:", error.message);
        alert("Failed to submit rating: " + error.message); // Optional for user feedback
    } finally {
        loading_btn.value = false;

        setTimeout(() => {
            visible_rating_animation.value = false;
            router.push(localePath("/"));
        }, 1500);

    }
});

// Truncate
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

//submit reject
const submitReject = handleSubmit(async () => {
    loading.value = true;
    const payload = {
        cancel_reason: message.value,
        order_id: route.params.id
    };
    await orderReject(payload);
    loading.value = false;
});

</script>


<style scoped>
.custom-checkbox {
    width: 16px;
    height: 16px;
    border: 2px solid #ccc;
    border-radius: 4px;
    appearance: none;
    -webkit-appearance: none;
    outline: none;
    cursor: pointer;
    position: relative;
    background-color: #fff;
    transition: background-color 0.2s ease, border-color 0.2s ease;
}

/* عندما تكون خانة الاختيار مفعّلة */
.custom-checkbox:checked {
    @apply bg-primary-1 border-primary-1 !text-white;
}

/* علامة الصح */
.custom-checkbox:checked::after {
    content: '✔';
    color: white !important;
    /* لون علامة الصح */
    font-size: 12px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
</style>