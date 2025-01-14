<template>
    <!-- Custom Button Implementation -->
    <Button :disabled="loading || disabled" class="w-full !bg-primary-2 hover:!bg-cyan-500   !rounded-full text-white">
        <i v-if="loading" class="pi pi-spinner pi-spin text-white"></i>
        <span v-else class="flex justify-center items-center  my-auto mb-1 px-5">
            {{ label }}
        </span>
    </Button>
</template>

<script setup>
const { t } = useI18n();
defineProps({
    disabled: Boolean,
    loading: Boolean,
    label: String,
    width: {
        type: String,
        default: '25rem',
    }
});
</script>
