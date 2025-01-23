<template>
  <!-- Custom Button Implementation -->
  <Button
    :disabled="loading || disabled"
    class="w-full !bg-primary-1 hover:!bg-primary-1 text-white"
  >
    <i v-if="loading" class="pi pi-spinner pi-spin text-white"></i>
    <span v-else class="flex justify-center items-center my-auto mb-1 px-5">
      {{ label }}
      <img
        v-if="imageSrc"
        :src="imageSrc"
        alt="button icon"
        class="h-4 w-4 mr-2 object-contain justify-center items-center flex mt-1"
      />
    </span>
  </Button>
</template>

<script setup>
const { t } = useI18n();
defineProps({
  disabled: Boolean,
  loading: Boolean,
  label: String,
  imageSrc: {
    type: String,
    default: null,
  },
  width: {
    type: String,
    default: "25rem",
  },
});
</script>
