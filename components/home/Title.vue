<template>

    <p class="lg:text-2xl text-lg font-bold py-4 ">
        {{ t(title) }}
    </p>

</template>

<script setup>
defineProps({
    title: {
        type: String,
        default: 'title'
    }
})


const { t } = useI18n();
</script>