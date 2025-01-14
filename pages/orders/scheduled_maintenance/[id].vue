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
    <div v-if="loading_skeleton === true">
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



        <div v-if="order_details_obj" class="justify-between items-center grid grid-cols-12 gap-3 py-4 ">
            <!--Profile-->
            <div v-if="order_details_obj?.employee != null"
                class="xl:col-span-7 col-span-12 flex bg-white  justify-between items-center shadow-lg rounded-lg h-full p-2">
                <!-- Left: Avatar and Name -->
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

            <!--Status-->
            <div v-if="order_details_obj"
                class="shadow-lg bg-white w-ful grid space-y-5 py-5 xl:col-span-5 col-span-12 rounded-lg px-5 h-full">

                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="note" alt="note_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800"> {{ order_details_obj.order_num }} </p>
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="reports" alt="reports_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800">{{ order_details_obj.status_text }} </p>
                    </div>
                </div>
                <div class="flex justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="data" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800"> {{ order_details_obj.created_at }} </p>
                    </div>

                </div>

            </div>


            <!--visits-->

            <div class=" col-span-12 bg-white shadow-lg rounded-lg h-full p-2">



                <div class=" justify-between grid grid-cols-12  items-start mt-2">

                    <div class="flex justify-start col-span-4 items-center gap-x-2">
                        <img :src="note" alt="note_img" class="w-4 h-4 sm:w-5 sm:h-5">

                        <p class="!text-sm font-semibold text-gray-800">{{ order_details_obj.service_name }} </p>
                    </div>

                    <div class="flex justify-start col-span-4 items-center gap-x-2">
                        <img :src="note" alt="note_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800"> {{ order_details_obj.status }} {{
                            t('pages.remain_visits') }} </p>
                    </div>

                </div>
                <div class=" justify-between grid grid-cols-12  items-start mt-2">
                    <div v-for="item in order_details_obj.remain_visits_dates"
                        class="flex justify-start col-span-4 items-center gap-x-2">
                        <img :src="clock" alt="clock_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="md:!text-sm text-xs font-bold text-gray-800"> {{ item.time }} </p>

                    </div>
                </div>
                <div class=" justify-between grid grid-cols-12  items-start mt-2">

                    <div v-for="item in order_details_obj.remain_visits_dates"
                        class="flex justify-start col-span-4 items-center gap-x-2">
                        <img :src="data" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="md:!text-sm text-xs font-bold text-gray-800"> {{ item.date }} </p>
                    </div>


                </div>

            </div>

            <!--Date and time-->
            <div class="lg:col-span-7 bg-white col-span-12 shadow-lg rounded-lg h-full p-2">

                <p class="text-gray-500 my-2"> {{ t('pages.service_date_and_time') }}:</p>
                <hr />

                <div class="flex flex-col justify-between items-start mt-2">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="clock" alt="clock_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800">{{ order_details_obj.time }} </p>
                    </div>

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="data" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800">{{ order_details_obj.date }} </p>
                    </div>

                </div>
            </div>


            <!--Visit description-->
            <div v-if="(order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 3 ||
                order_details_obj.status === 6) && order_details_obj.visit_images.length > 0"
                class="shadow-lg w-full grid bg-white xl:col-span-5 col-span-12 rounded-lg p-5 h-full">


                <div class="flex justify-start items-start gap-x-2">
                    <IconsOfferIcon class="w-6 h-6 mt-1 !text-primary-1 " />
                    <p class="font-semibold text-gray-500 text-sm"> {{ t('pages.place_description') }} <span>{{
                        order_details_obj?.visit_description }}
                        </span>
                    </p>
                </div>

                <div class="grid grid-cols-12 justify-center items-center gap-2 mt-3">
                    <img v-for="item in order_details_obj.visit_images" :key="item.id" :src="item.image" alt="date_img"
                        class="w-full col-span-2">
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

        </div>



        <!--ButtonAuth-->
        <!-- <div v-if="order_details_obj?.status === 2" class="flex justify-center items-center max-w-[20%] mx-auto !mb-5">
            <ButtonAuth @click="submitPayment" :loading="loading" :label="t('pages.payment')" class=" gap-3" />
        </div> -->
        <!--ButtonAuthRating-->


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


        <div v-if="order_details_obj?.status === 4" @click="visible_rating = true" :loading="loading_btn"
            class="flex  justify-center items-center max-w-[30%] mx-auto my-5">
            <ButtonAuth :label="t('pages.technical_evaluation')" class=" gap-3" />
        </div>
    </div>
</template>

<script setup>

// Image imports
import security from "@/assets/img/security.svg";
import money from "@/assets/img/money.svg";
import clock from "@/assets/img/clock.svg";
import phone from "@/assets/img/phone.svg";
import order from "@/assets/img/image_order_detalis.png";
import Ahmed from "@/assets/img/Ahmed.jpg";
import report from "@/assets/img/reports.svg";
import note from "@/assets/img/note.svg";
import chat from "@/assets/img/chat.svg";
import reports from "@/assets/img/reports.svg";
import data from "@/assets/img/data.svg";
import website from "@/assets/img/website.svg";
import animation from "@/assets/img/animation.gif";

// i18n

const { t } = useI18n();


// Validation
import * as yup from 'yup'; // Import yup for validation schema
import { Field, useForm } from 'vee-validate';

// State
const visible = ref(false);
const value = ref(null);
const message = ref("");
const show = ref(false);
const visible_rating = ref(false);
const visible_rating_animation = ref(false);
const rating = ref(3);
const loading_btn = ref(false);
const selectedCategory = ref(1);
const loading_skeleton = ref(true)

// const categories = ref([
//     { name: t('pages.wallet'), key: 1 },
//     { name: t('pages.electronic'), key: 2 },
// ]);

// Truncate
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
//
// const categories_1 = ref([
//     { name: "Accounting", key: "A" },
//     { name: "Marketing", key: "M" },
//     { name: "Production", key: "P" },
//     { name: "Research", key: "R" }
// ]);

// Compute the average rating
const averageRating = computed(() => {
    const ratings = products.value.map((product) => product.rating || 0);
    const total = ratings.reduce((acc, rating) => acc + rating, 0);
    return ratings.length ? (total / ratings.length).toFixed(2) : "N/A";
});

const { orderDetails } = useOrderPackageStore();
const { order_details_obj, loading, visible_reject, resMsg } = storeToRefs(useOrderPackageStore());
const { getRateEmployee } = useRateStore();

// Router

const localeRoute = useLocaleRoute();
const localePath = useLocalePath();
const router = useRouter();
const route = useRoute();
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


//request
onMounted(async () => {
    loading_skeleton.value = true;
    await orderDetails(route.params.id);
    loading_skeleton.value = false;
})

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


    } finally {
        loading_btn.value = false;

        setTimeout(() => {
            visible_rating_animation.value = false;
            router.push(localePath("/"));
        }, 1500);

    }
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