<template>
    <div class="tabs flex justify-center mt-5 gap-x-3 mx-auto max-w-xl">
        <button v-for="tab in tabs" :key="tab.value" :class="[
            'font-bold md:text-lg text-sm w-[60%] flex flex-col justify-center text-primary-1 items-center mx-auto border-2 border-primary-1 bg-transparent rounded-xl cursor-pointer p-3',
            modelValue === tab.value ? '!bg-primary-1 text-white' : 'hover:bg-primary-1 hover:text-white',
            'transition-colors duration-500 ease-in-out'
        ]" @click="$emit('update:modelValue', tab.value)">
            <p class="!text-sm">{{ tab.label }}</p>
        </button>
    </div>
</template>

<script setup>
const props = defineProps({
    tabs: Array,
    modelValue: Number // Using v-model to sync with the parent
});
</script>

<style scoped>
/* Additional styles can be added here if needed */
</style>
