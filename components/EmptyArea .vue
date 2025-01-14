<template>
    <div class="flex flex-col items-center justify-center text-center w-full min-h-full py-6">
        <!-- Icon -->
        <i v-if="icon" :class="['pi', data.icon, 'text-5xl text-primary/50 mb-2']"></i>

        <!-- Image -->
        <img v-if="image" :src="data.image" :alt="t(data.title)" class="w-8 opacity-50 mb-2 mx-auto" />

        <!-- Title -->
        <h5 class="text-primaryColor-500 text-midFont">
            {{ t(title) }}
        </h5>
    </div>
</template>

<script setup>
// ==================================== imports
// i18n
const { t } = useI18n();

// ==================================== props
defineProps({
    title: String,
    image: String,
});
</script>

<style scoped>
/* No custom styles needed as PrimeVue and Tailwind handle the design */
</style>
