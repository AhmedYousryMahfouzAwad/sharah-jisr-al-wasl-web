<template>
    <HomeTitle title="pages.more" class="my-3" />
    <div class="shadow-xl max-w-3xl mx-auto py-10 rounded-xl space-y-5">

        <!-- العنصر الأول -->
        <template v-if="!more[0].isAuth || isAuth">
            <NuxtLink :to="localePath(more[0].to)"
                class="flex justify-between cursor-pointer items-center bg-white shadow-lg p-2 rounded-lg w-[70%] mx-auto">
                <div class="flex justify-center items-center gap-x-2">
                    <div
                        class="card border-2 border-primary-1 md:p-3 p-2 justify-center items-center flex rounded-full">
                        <img :src="more[0].image" alt="icon">
                    </div>
                    <p class="text-sm font-bold">{{ t(more[0].name) }}</p>
                </div>
                <i :class="['icon-class', arrowIcon]"></i>
            </NuxtLink>
        </template>

        <!-- العنصر الثاني -->
        <template v-if="!more[1].isAuth || isAuth">
            <NuxtLink :to="localePath(more[1].to)"
                class="flex justify-between cursor-pointer items-center bg-white shadow-lg p-2 rounded-lg w-[70%] mx-auto">
                <div class="flex justify-center items-center gap-x-2">
                    <div
                        class="card border-2 border-primary-1 md:p-3 p-2 justify-center items-center flex rounded-full">
                        <img :src="more[1].image" alt="icon">
                    </div>
                    <p class="text-sm font-bold">{{ t(more[1].name) }}</p>
                </div>
                <i :class="['icon-class', arrowIcon]"></i>
            </NuxtLink>
        </template>

        <!-- العنصر الثالث -->
        <template v-if="!more[2].isAuth || isAuth">
            <NuxtLink :to="localePath(more[2].to)"
                class="flex justify-between cursor-pointer items-center bg-white shadow-lg p-2 rounded-lg w-[70%] mx-auto">
                <div class="flex justify-center items-center gap-x-2">
                    <div
                        class="card border-2 border-primary-1 md:p-3 p-2 justify-center items-center flex rounded-full">
                        <img :src="more[2].image" alt="icon">
                    </div>
                    <p class="text-sm font-bold">{{ t(more[2].name) }}</p>
                </div>
                <i :class="['icon-class', arrowIcon]"></i>
            </NuxtLink>
        </template>

        <!-- العنصر الرابع -->
        <template v-if="!more[3].isAuth || isAuth">
            <NuxtLink :to="localePath(more[3].to)"
                class="flex justify-between cursor-pointer items-center bg-white shadow-lg p-2 rounded-lg w-[70%] mx-auto">
                <div class="flex justify-center items-center gap-x-2">
                    <div
                        class="card border-2 border-primary-1 md:p-3 p-2 justify-center items-center flex rounded-full">
                        <img :src="more[3].image" alt="icon">
                    </div>
                    <p class="text-sm font-bold">{{ t(more[3].name) }}</p>
                </div>
                <i :class="['icon-class', arrowIcon]"></i>
            </NuxtLink>
        </template>

        <!-- العنصر الخامس -->
        <template v-if="!more[4].isAuth || isAuth">
            <NuxtLink :to="localePath(more[4].to)"
                class="flex justify-between cursor-pointer items-center bg-white shadow-lg p-2 rounded-lg w-[70%] mx-auto">
                <div class="flex justify-center items-center gap-x-2">
                    <div
                        class="card border-2 border-primary-1 md:p-3 p-2 justify-center items-center flex rounded-full">
                        <img :src="more[4].image" alt="icon">
                    </div>
                    <p class="text-sm font-bold">{{ t(more[4].name) }}</p>
                </div>
                <i :class="['icon-class', arrowIcon]"></i>
            </NuxtLink>
        </template>

        <!-- العنصر السادس -->
        <template v-if="!more[5].isAuth || isAuth">
            <NuxtLink :to="localePath(more[5].to)"
                class="flex justify-between cursor-pointer items-center bg-white shadow-lg p-2 rounded-lg w-[70%] mx-auto">
                <div class="flex justify-center items-center gap-x-2">
                    <div
                        class="card border-2 border-primary-1 md:p-3 p-2 justify-center items-center flex rounded-full">
                        <img :src="more[5].image" alt="icon">
                    </div>
                    <p class="text-sm font-bold">{{ t(more[5].name) }}</p>
                </div>
                <i :class="['icon-class', arrowIcon]"></i>
            </NuxtLink>
        </template>

    </div>
</template>

<script setup>
const { isAuth } = storeToRefs(useAuthStore()); // جلب حالة المصادقة من الـ Store

const more = reactive([
    {
        name: 'pages.my_wallet',
        image: my_wallet,
        to: "/more/wallet",
        isAuth: true,
    },
    {
        name: 'pages.my_remains',
        image: my_remains,
        to: "/more/my_remains",
        isAuth: true,
    },
    {
        name: 'pages.my_nice',
        image: my_nice,
        to: "/more/favorite",
        isAuth: true,
    },
    {
        name: 'pages.about_website',
        image: about_website,
        to: "/more/about_the_site",
        isAuth: false,
    },
    {
        name: 'pages.terms_conditions',
        image: terms_conditions,
        to: "/terms_conditions",
        isAuth: false,
    },
    {
        name: 'pages.complaints_inquiries',
        image: complaints_inquiries,
        to: "/more/complaints_inquiries",
        isAuth: true,
    },
]);

import my_wallet from "@/assets/img/my_wallet.svg";
import my_remains from "@/assets/img/my_remains.svg";
import my_nice from "@/assets/img/my_nice.svg";
import about_website from "@/assets/img/about_website.svg";
import terms_conditions from "@/assets/img/terms_conditions.svg";
import complaints_inquiries from "@/assets/img/complaints_inquiries.svg";
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

// استخدام vue-i18n لإدارة النصوص
const { t, locale } = useI18n();

// تحديد إذا كانت اللغة RTL
const isRtl = computed(() => locale.value === 'ar');

// تحديد أيقونة السهم بناءً على الاتجاه
const arrowIcon = computed(() => (isRtl.value ? 'pi pi-chevron-left' : 'pi pi-chevron-right'));
</script>

<style scoped>
.icon-class {
    font-size: 11px;
    font-weight: bold;
    line-height: 1;
}
</style>
