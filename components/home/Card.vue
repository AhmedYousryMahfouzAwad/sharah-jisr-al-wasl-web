<template>
    <NuxtLink :to="to" class="relative rounded-lg overflow-hidden cursor-pointer block aspect-square shadow-xl">
        <img :src="img" :alt class="w-full h-full object-cover" />
        <div class="absolute inset-0 flex items-center justify-center bg-black/40">
            <h2 class="text-white xl:text-xl text-base font-bold">{{ title }}</h2>
        </div>
    </NuxtLink>
</template>

<script setup>
// i18n
const { t } = useI18n();

// props
defineProps({
    title: String,
    alt: String,
    img: String,
    to: {
        type: [String, Object], // دعم النصوص أو الكائنات
        required: true
    },
});
</script>
