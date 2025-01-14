<template>
    <div>
        <HomeTitle title="pages.order_details" class="my-3 max-w-6xl" />
    </div>

    <div class="justify-between items-center grid grid-cols-12 gap-3 py-4 ">

        <div class="shadow-lg w-ful grid  xl:col-span-7 col-span-12 rounded-lg space-y-5 p-2 h-full ">
            <div class="grid grid-cols-12">
                <div class="flex col-span-4 justify-start gap-x-16 items-center px-1">
                    <div>
                        <img :src="order" alt="Flag icon" />
                    </div>
                </div>

                <div class="col-span-8 flex flex-col justify-center">
                    <div class="div flex justify-between items-center px-1">
                        <div class="flex items-center ">
                            <img :src="security" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                            <span class="mb-2 md:text-base text-sm"> مسبح</span>
                        </div>

                        <div class="flex items-center gap-x-1 ">
                            <img :src="money" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                            <span class=" md:text-base text-sm font-semibold text-gray-800 w-full flex "><span
                                    class=" px-1 md:text-base text-sm">

                                    SAR
                                </span>1200</span>
                        </div>

                    </div>



                    <div class="flex md:hidden  items-center gap-x-1 ">
                        <Rating v-model="value" />
                    </div>
                    <p class="text-gray-400  md:text-base text-xs px-2">

                        نصوص
                         أخرى تم توليد هذا النص من مولد النص العربي لقد تم توليد هذا النص من مولد النص العربي
                    </p>
                    <div class="flex gap-4 justify-start items-center">



                        <Button label="Save" class="!bg-transparent !border-none">
                            <img :src="report" alt="wishlist" class="w-6 h-6" />
                            <span class="text-xs lg:text-base text-black ">
                                3
                            </span>
                        </Button>

                    </div>
                </div>
            </div>

        </div>

        <div class="xl:col-span-5 col-span-12 shadow-lg rounded-lg h-full p-2">
            <p class="text-gray-500 my-5"> {{ t('buttons.warranty') }}:</p>
            <hr />
            <div class="flex justify-start gap-5 my-5">
                <IconsOfferIcon class="w-6 h-6 mt-1 !text-primary-1 " />
                <p class="text-gray-400  md:text-base text-xs">
                    تم توليد هذا النص من مولد النص العربي لقد تم توليد هذا النص من مولد النص العربي
                </p>

            </div>


        </div>

    </div>
    <div class="justify-between items-center grid grid-cols-12 gap-3">
        <div class="shadow-lg w-ful grid  xl:col-span-7 col-span-12 rounded-lg px-5 h-full">
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center gap-x-2">
                    <img :src="note" alt="note_img" class="w-8 h-8">
                    <p class=" font-semibold"> 1223 </p>
                </div>
                <div class="flex justify-center items-center gap-x-2">
                    <img :src="reports" alt="reports_img" class="w-8 h-8">
                    <p class="  font-semibold"> مكتمل </p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center gap-x-2">
                    <img :src="data" alt="date_img" class="w-8 h-8">
                    <p class=" font-semibold"> 1 / 11 /2023 </p>
                </div>
                <div class="flex justify-center items-center gap-x-2">
                    <img :src="money" alt="money_img" class="w-8 h-8">
                    <p class="  font-semibold"> الكتروني </p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center gap-x-2">
                    <img :src="website" alt="website_img" class="w-8 h-8">
                    <p class="text-sm font-semibold"> الرياض , المملكة العربية السعودية </p>
                </div>

            </div>
        </div>

        <div class="xl:col-span-5 col-span-12 space-y-3 shadow-lg rounded-lg h-full p-2">
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center gap-x-2">
                    <OnlineStoreCost :name="t('pages.product_price')" price="1200" :src="note" />
                </div>
                <div class="flex justify-center items-center gap-x-2">
                    <OnlineStoreCost :name="t('pages.installation_price')" price="1200" :src="note" />

                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center gap-x-2">
                    <OnlineStoreCost :name="t('pages.delivery_price')" price="1200" :src="note" />
                </div>
                <div class="flex justify-center items-center gap-x-2">
                    <OnlineStoreCost :name="t('pages.discount_price')" price="1200" :src="note" />

                </div>
            </div>
            <div class="flex justify-between items-center">
                <div class="flex justify-center items-center gap-x-2">
                    <OnlineStoreCost :name="t('pages.tax_value')" price="1200" :src="note" />
                </div>
                <div class="flex justify-center items-center gap-x-2">
                    <OnlineStoreCost :name="t('pages.total_price')" price="1200" :src="note" />
                </div>
            </div>
        </div>
    </div>
    <div class=" w-full  flex justify-center items-center max-w-2xl  mx-auto p-4 mt-5  gap-4">
        <NuxtLink to="/orders/product_evaluation" class="font-bold md:text-base text-sm bg-primary-2 text-white  main-btn w-[60%] flex flex-col justify-center items-center mx-auto border-2 border-primary-2
            rounded-3xl cursor-pointer p-3 hover:bg-transparent hover:text-primary-2 transition-colors duration-500
                ease-in-out">
            {{ t("pages.product_evaluation") }}
        </NuxtLink>
        <NuxtLink to="/shopping_cart" class="main-btn font-bold  md:text-base text-sm text-white w-[60%] flex flex-col justify-center items-center mx-auto border-2 border-red-2
                bg-red-2 rounded-3xl cursor-pointer p-3 hover:bg-transparent hover:text-red-2 transition-colors duration-500
                ease-in-out">
            {{ t("pages.reorder") }}
        </NuxtLink>

    </div>

</template>


<script setup>
import security from "@/assets/img/security.svg";
import money from "@/assets/img/money.svg";
import shopping_cart from "@/assets/img/shopping_cart.svg";
import cover from "@/assets/img/cover.png";
import order from "@/assets/img/image_order_detalis.png";
import report from "@/assets/img/reports.svg";
import note from "@/assets/img/note.svg";
import reports from "@/assets/img/reports.svg";
import data from "@/assets/img/data.svg";
import website from "@/assets/img/website.svg";
const value = ref(null)

const { t } = useI18n();

</script>