<template>

    <div class="flex justify-between items-center   mx-auto  ">
        <HomeTitle title="pages.order_details" class="my-3 max-w-6xl" />
        <!--Chat-->
        <div class="flex gap-4">
            <button v-if="(order_details_obj.status === 4 || order_details_obj.status === 5 ||
                order_details_obj.status === 6) && order_details_obj.extra_services_pending.length > 0"
                @click="serves = true" class="p-2 rounded-full  bg-blue-100 hover:bg-blue-200">
                <img :src="plus" alt="plus" class="w-5 h-5" />
            </button>

            <button
                v-if="order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 6 || order_details_obj.status === 9"
                @click="handleNavigation" class="p-2 rounded-full  bg-blue-100 hover:bg-blue-200">
                <img :src="chat" alt="chat" class="w-5 h-5" />
            </button>

            <div class=" mx-auto">
                <BaseDialog v-model:visible="serves" :show_accept="false" class="max-w-3xl mx-auto">
                    <template #content>
                        <div class="mx-auto px-6 sm:px-8 lg:px-12 py-8">

                            <!-- Title -->
                            <p
                                class="text-black font-bold text-center mx-auto justify-center items-center pb-6 text-lg md:text-2xl">
                                {{ t('pages.extra_services') }}
                            </p>

                            <!-- Logo -->
                            <img :src="logo_logo" alt="logo"
                                class="mx-auto flex justify-center  w-36 h-36 items-center pb-3" />

                            <!-- Services -->
                            <div v-for="item in order_details_obj?.extra_services_pending"
                                class="flex flex-col justify-start my-6 space-y-4 items-start mx-auto text-lg md:text-xl">
                                <p class="text-gray-600 text-start">{{ t('pages.service_name') }} <span
                                        class="text-black"> {{ item.name }} </span>
                                </p>
                                <p class="text-gray-600 text-start">{{ t('pages.service_name_price') }} <span
                                        class="text-black"> {{ item.price }}
                                    </span>
                                </p>
                            </div>

                            <!-- Buttons -->
                            <div class="grid grid-cols-12 gap-6 w-full items-center justify-between mx-auto mt-8">
                                <!-- Confirm Button -->
                                <ButtonAuth @click="submitExtra" :loading="loading" :label="t('pages.auth.of_course')"
                                    class="col-span-12 md:col-span-6 mx-auto text-lg md:text-xl py-3" />

                                <!-- Cancel Button -->
                                <Button type="button" :loading="loading_btn" :label="t('pages.cancel')"
                                    class="col-span-12 md:col-span-6 !bg-red-2 !text-white w-full mx-auto flex justify-center items-center !rounded-full text-lg md:text-xl py-3"
                                    severity="secondary" @click="cancelExtra" />
                            </div>
                        </div>
                    </template>
                </BaseDialog>

                <BaseDialog v-model:visible="visible_Extra" class="w-full max-w-xl mx-2">
                    <template #content>

                        <span
                            class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                            {{ resMsg }}
                        </span>

                        <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
                    </template>
                </BaseDialog>

                <BaseDialog v-model:visible="visible_pay" class="w-full max-w-xl mx-2">
                    <template #content>
                        <div class=" col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6  w-full">
                            <p class="text-black font-bold">{{ t('pages.choose_payment_method') }}</p>
                            <div v-for="category in categories" :key="category.key" class="flex items-center m-5">
                                <RadioButton v-model="selectedCategory" name="dynamic" class="mx-5 mt-1"
                                    :value="category.key" />
                                <label :for="category.key" class="ml-2">{{ category.name }}</label>
                            </div>
                        </div>

                        <ButtonAuth v-if="!paymentCompleted" @click="paymentExtra" :loading="loading"
                            :label="t('pages.auth.of_course')" class="col-span-12 md:col-span-6 mx-auto" />

                    </template>
                </BaseDialog>
            </div>
        </div>
    </div>

    <div v-if="order_details_obj">
        <!--card accepted-->
        <div v-if="order_details_obj.status === 2"
            class="bg-primary-1 p-2  lg:w-[50%] w-full sm:p-3 md:text-base text-sm rounded-lg text-white">
            <p> {{ t('pages.the_order') }} </p>
        </div>

        <div class="justify-between items-center grid grid-cols-12 gap-3 py-4 ">

            <!--Status-->
            <div v-if="order_details_obj"
                class="shadow-lg w-full bg-white grid space-y-5 py-5 xl:col-span-7 col-span-12 rounded-lg px-5 h-full">

                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="note" alt="note_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm   font-semibold text-gray-800"> {{ order_details_obj.order_num }} </p>
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="reports" alt="reports_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800"> {{ order_details_obj.status_text }} </p>
                    </div>
                </div>

                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="data" alt="date_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800"> {{ order_details_obj.created_at }} </p>
                    </div>

                </div>

                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <img :src="website" alt="website_img" class="w-4 h-4 sm:w-5 sm:h-5">
                        <p class="!text-sm font-semibold text-gray-800"> {{ order_details_obj.map_desc }}</p>
                    </div>

                </div>
            </div>

            <!--image-->
            <div v-if="(order_details_obj?.details && order_details_obj?.details.trim() !== '') ||
                (order_details_obj?.images && order_details_obj.images.length > 0)"
                class="shadow-lg w-full grid bg-white  xl:col-span-5 col-span-12 rounded-lg p-5 h-full">

                <!-- Problem Description -->
                <div v-if="order_details_obj?.details?.trim() !== ''" class="flex justify-start items-start gap-x-2">
                    <IconsOfferIcon class="w-6 h-6 mt-1 !text-primary-1" />
                    <p class="font-semibold text-gray-500 text-sm">
                        {{ t('pages.problem_description') }}
                        <span>{{ order_details_obj?.details }}</span>
                    </p>
                </div>

                <!-- Images -->
                <div v-if="order_details_obj?.images && order_details_obj.images.length > 0"
                    class="grid grid-cols-12 justify-center items-center gap-2 mt-3">
                    <img v-for="item in order_details_obj.images" :key="item.id" :src="item.image" alt="date_img"
                        class="w-full col-span-2">
                </div>
            </div>

            <!-- <div class="shadow-lg w-ful grid  xl:col-span-7 col-span-12 rounded-lg space-y-5 p-2 h-full ">
                
              
                <div class="grid grid-cols-12">
                    <div class="flex md:col-span-4 col-span-12 justify-start gap-x-16 items-center px-1">
                        <div class="mx-auto h-[100%] w-[100%]">
                            <img :src="order_details_obj.design_image_id" class="w-[95%] h-[95%] rounded-xl "
                                alt="image_sizes" />
                        </div>
                    </div>

                    <div
                        class="md:col-span-8 col-span-12 flex flex-col w-[100%] h-[100%] justify-start items-start space-y-1">
                        <p class="font-bold md:text-base text-xs">

                            {{ t('pages.sizes') }}
                        </p>
                        <span class="flex text-gray-500 gap-4 justify-start items-start">
                            {{ t('pages.auth.height') }} - {{ order_details_obj.length }} {{ t('pages.meter') }}  
                        </span>
                        <span class="flex text-gray-500 gap-4 justify-start items-start">
                            {{ t('pages.auth.width') }} - {{ order_details_obj.width }} {{
                                t('pages.meter') }}  
                        </span>
                        <span class="flex text-gray-500 gap-4 justify-start items-start">

                            {{ t('pages.depth') }} - {{ order_details_obj.height }} {{ t('pages.meter') }}  

                        </span>
                    </div>
                </div>
            </div> -->
            <!--Date and time-->

            <div v-if="order_details_obj.status == 1" class="col-span-12 bg-white shadow-lg rounded-lg h-full p-2">

                <p class="text-gray-500 my-2"> {{ t('pages.service_date_and_time') }}:</p>
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

            <div v-if="[2, 4, 5, 6, 9].includes(order_details_obj.status)"
                class="xl:col-span-7 col-span-12 shadow-lg rounded-lg bg-white h-full p-2">

                <p class="text-gray-500 my-2"> {{ t('pages.service_date_and_time') }}:</p>
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

            <!--Visit description-->
            <div v-if="(order_details_obj.status === 4 || order_details_obj.status === 5 ||
                order_details_obj.status === 6) && order_details_obj.visit_images.length > 0"
                class="shadow-lg w-ful grid  bg-white  xl:col-span-5 col-span-12 rounded-lg p-5 h-full">

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

            <!--OnlineStoreCost-->
            <div v-if="(order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 6 || order_details_obj.status === 9) &&
                order_details_obj.visit_images.length === 0"
                class="xl:col-span-5 col-span-12 space-y-3 shadow-lg bg-white rounded-lg h-full p-2">
                <div class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.service_price')" :price="order_details_obj.price"
                            :src="note" />
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.tax_value')" :price="order_details_obj?.vat_amount"
                            :src="note" />
                    </div>
                </div>
                <div v-for="item in order_details_obj?.spare_parts" :key="item.id"
                    class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.spare_name')" :price="item.name" :src="note" />
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.spare_price')" :price="item.price" :src="note" />
                    </div>
                </div>
                <div v-if="(order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 6 || order_details_obj.status === 9) && order_details_obj?.extra_services?.length > 0"
                    v-for="item in order_details_obj?.extra_services" :key="item.id"
                    class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.service_name_price')" :price="item.name" :src="note" />
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.service_price')" :price="item.price" :src="note" />
                    </div>
                </div>


                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.total_price')" :price="order_details_obj?.total_price"
                            :src="note" />

                    </div>
                </div>
            </div>

            <!--Tasks-->
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

            <!--profile-->
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
            <!--OnlineStoreCost-->
            <div v-if="(order_details_obj.status === 4 || order_details_obj.status === 5 || order_details_obj.status === 6 || order_details_obj.status === 9) &&
                order_details_obj.visit_images.length > 0"
                class="xl:col-span-5 col-span-12 space-y-3 shadow-lg bg-white rounded-lg h-full p-2">
                <div class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.service_price')" :price="order_details_obj.price"
                            :src="note" />
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.tax_value')" :price="order_details_obj?.vat_amount"
                            :src="note" />
                    </div>
                </div>
                <div v-for="item in order_details_obj?.spare_parts" :key="item.id"
                    class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.spare_name')" :price="item.name" :src="note" />
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.spare_price')" :price="item.price" :src="note" />
                    </div>
                </div>
                <div v-if="order_details_obj.status === 9 && order_details_obj?.extra_services?.length > 0"
                    v-for="item in order_details_obj?.extra_services" :key="item.id"
                    class="flex  justify-between items-center">
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.service_name_price')" :price="item.name" :src="note" />
                    </div>
                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.service_price')" :price="item.price" :src="note" />
                    </div>
                </div>


                <div class="flex justify-between items-center">

                    <div class="flex justify-center items-center gap-x-2">
                        <OnlineStoreCost :name="t('pages.total_price')" :price="order_details_obj?.total_price"
                            :src="note" />

                    </div>
                </div>
            </div>

            <!--card refused-->
            <div v-if="order_details_obj && order_details_obj.has_offer === true"
                class="bg-white xl:col-span-12 w-full col-span-12 space-y-5 border-2 my-5 rounded-lg p-4 md:p-6 lg:p-8">
                <!-- Offer Details -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <!-- Offer Price and Tax -->
                    <div>
                        <OnlineStoreCost class="text-sm font-semibold" :name="t('pages.offer_price')"
                            :price="order_details_obj?.price_offer?.price" :src="note" />
                        <OnlineStoreCost class=" text-sm font-semibold" :name="t('pages.tax_value')"
                            :price="order_details_obj?.price_offer?.vat_amount" :src="note" />
                    </div>

                    <!-- Spare Parts -->
                    <div>
                        <div v-for="item in order_details_obj?.spare_parts" :key="item.id"
                            class="flex flex-wrap justify-between items-center gap-4">
                            <OnlineStoreCost class="text-sm font-semibold" :name="t('pages.spare_name')"
                                :price="item.name" :src="note" />
                            <OnlineStoreCost class="text-sm font-semibold" :name="t('pages.spare_price')"
                                :price="item.price" :src="note" />
                        </div>
                    </div>
                </div>

                <!-- Total Price -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <OnlineStoreCost class="text-sm font-semibold" :name="t('pages.total_price')"
                        :price="order_details_obj?.price_offer?.total_price" :src="note" />
                    <p class="text-black text-sm md:text-base text-center col-span-2">{{ t('pages.price_offer_suitable')
                        }}</p>
                </div>

                <!-- Action Buttons -->
                <div class="grid grid-cols-2 gap-4 justify-center items-center max-w-2xl mx-auto p-4">
                    <ButtonAuth @click="submitAccept" type="button" :label="t('pages.yes')" :loading="loading_offer"
                        class="w-full" />

                    <button @click="visible = true"
                        class="main-btn font-bold md:text-base text-sm text-primary-2 w-full flex justify-center items-center border-2 border-primary-2 bg-transparent rounded-3xl cursor-pointer p-2 ease-in-out">
                        {{ t("pages.no") }}
                    </button>
                </div>

                <!-- Dialogs -->
                <div class="mx-5">
                    <!-- Reason Dialog -->
                    <BaseDialog v-model:visible="visible">
                        <template #content>
                            <div class="mx-auto container px-4 sm:px-6 lg:px-8">
                                <span
                                    class="text-surface-500 text-center text-font-bold dark:text-surface-400 block mb-8 mx-auto text-lg md:text-xl">
                                    {{ t('pages.reason') }}
                                </span>
                                <form @submit.prevent="submitReject" class="my-5 space-y-4">
                                    <Field v-model="message" name="message" type="text" v-slot="{ errorMessage }">
                                        <Textarea id="over_label" :placeholder="t('pages.enter_massage')"
                                            class="!rounded-3xl w-full my-5" v-model="message" name="message" rows="5"
                                            style="resize: none" />
                                        <span v-if="errorMessage"
                                            class="error-message text-red-2 text-sm flex flex-col justify-center items-center">
                                            {{ errorMessage }}
                                        </span>
                                    </Field>

                                    <ButtonAuth type="submit" :loading="loading" :label="t('pages.send')"
                                        class="w-full mx-auto text-center" />
                                </form>
                            </div>
                        </template>
                    </BaseDialog>

                    <!-- Reject Animation Dialog -->
                    <BaseDialog v-model:visible="visible_reject" class="w-full max-w-xl mx-2">
                        <template #content>
                            <span
                                class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                                {{ resMsg }}
                            </span>
                            <img :src="animation" alt="animation_image"
                                class="mx-auto justify-center items-center flex" />
                        </template>
                    </BaseDialog>
                </div>
            </div>
            <!-- <div v-else>
                <p class="text-center text-gray-500">{{ t('pages.no_offer_available') }}</p>
            </div> -->


        </div>

        <!--RadioButton-->

        <div v-if="order_details_obj?.status === 2 && !paymentCompleted" class="card flex ">
            <div class="flex flex-col gap-4 my-2">
                <p class="text-black font-bold">{{ t('pages.choose_payment_method') }}</p>
                <div v-for="category in categories" :key="category.key" class="flex items-center ">
                    <RadioButton v-model="selectedCategory" name="dynamic" class="mx-5 mt-1" :value="category.key" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>
        </div>


        <!--ButtonAuth Payment-->
        <div v-if="order_details_obj?.status === 2 && !paymentCompleted"
            class="flex justify-center items-center max-w-[20%] mx-auto !mb-5">
            <ButtonAuth @click="submitPayment" :loading="loading_payment" type="button" :label="t('pages.payment')"
                class="gap-3" />
        </div>

        <!-- <div v-else="order_details_obj?.status === 2 && paymentCompleted"> {{ t('pages.payment_completed') }} </div> -->

        <!--ButtonAuthRating-->
        <!-- <div v-if="order_details_obj?.status === 9" class="flex  justify-center items-center max-w-[30%] mx-auto my-5">
            <ButtonAuth :label="t('pages.rating')" class=" gap-3" />
        </div> -->
    </div>
    <!-- Skeleton for Order Details List -->
    <div v-else>
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
import plus from "@/assets/img/plus.svg";
import logo_logo from "@/assets/img/logo.png";
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
const loading_btn = ref(false);
const loading_offer = ref(false);
const loading_payment = ref(false);
const loadingPayment = ref(false);
const paymentCompleted = ref(false);
const loading_skeleton = ref(false);
const serves = ref(false);
const visible_pay = ref(false);

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

const selectedCategory = ref(1);
const { orderDetails, orderReject, orderAccept, orderPay, acceptExtra, rejectExtra, payExtra } = useInstantStore();
const { order_details_obj, loading, visible_reject, visible_Extra, resMsg, } = storeToRefs(useInstantStore());

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

// Truncate
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
//request
onMounted(async () => {
    loading_skeleton.value = true;
    await orderDetails(route.params.id);
    loading_skeleton.value = false;
})
//acceptOffer
const submitAccept = async () => {
    loading_offer.value = true;
    const payload = {
        order_id: route.params.id
    };

    try {
        await orderAccept(payload);
    } catch (error) {
        loading_offer.value = false;
    } finally {
        loading_offer.value = false;

    }
};
//payment

// Function to handle payment submission
const submitPayment = async () => {
    loadingPayment.value = true;

    const payload = {
        order_id: route.params.id, // Access route params
        pay_type: selectedCategory.value, // Replace with the actual selected category
    };

    try {
        await orderPay(payload);
        paymentCompleted.value = true; // Hide the button after successful payment
    } catch (error) {
        console.error('Payment failed:', error);
    } finally {
        loadingPayment.value = false;
    }
};

//extra

const submitExtra = async () => {
    loading.value = true;
    const payload = {
        order_id: route.params.id,
    };
    try {
        await acceptExtra(payload);
        visible_pay.value = true;
        serves.value = false;
    } catch (error) {
        console.error("Error in submitExtra:", error);
    } finally {
        loading.value = false;
    }
}



//cancel
const cancelExtra = async () => {
    loading_btn.value = true;

    serves.value = false;
    const payload = {
        order_id: route.params.id
    };
    setTimeout(async () => {
        await rejectExtra(payload);
        loading_btn.value = false
    }, 1000);

}

//paymentExtra
const paymentExtra = async () => {
    loading_btn.value = true;
    visible_pay.value = false;

    const payload = {
        order_id: route.params.id,
        pay_type: selectedCategory.value,

    };
    await payExtra(payload);
    visible_Extra.value = true;
    loading_btn.value = false

}


//submit    
const submitReject = handleSubmit(async () => {
    loading.value = true;
    const payload = {
        cancel_reason: message.value,
        order_id: route.params.id
    };
    await orderReject(payload);
    visible.value = false;
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