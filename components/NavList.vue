<template>
    <li>
        <NuxtLink :to="to" class="flex items-center  justify-between font-semibold p-2 !w-full ">
            <div class="flex items-center">
                <span class="flex items-center bg-slate-100 p-2 rounded-lg">
                    <slot></slot>
                </span>
                <span class="mx-5" :style="{
                    color: isActive ? activeColor : inActiveColor
                }">
                    {{ title }}
                </span>
            </div>

            <i :class="arrowIcon" :style="{
                color: isActive ? activeColor : inActiveColor,
                transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
                transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out'
            }" class="mx-3">
            </i>

        </NuxtLink>
    </li>

</template>
<script setup>

const { locale } = useI18n();
defineProps({
    to: String,
    title: String,
    isActive: Boolean
});
const arrowIcon = computed(() => (locale.value === 'ar' ? 'pi pi-chevron-left' : 'pi pi-chevron-right')); // Right for RTL, left for LTR

const inActiveColor = ref('#848484');
const activeColor = ref('#16B7F7');

</script>
