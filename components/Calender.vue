<template>
  <!-- Custom Button Implementation -->
  <Button
    :disabled="loading || disabled"
    class="w-full !bg-primary-1 hover:!bg-primary-1 text-white"
  >
    <i v-if="loading" class="pi pi-spinner pi-spin text-white"></i>
    <span v-else class="flex justify-center items-center my-auto mb-1 px-5">
      {{ t(label) }}
      <img
        v-if="localizedImageSrc"
        :src="localizedImageSrc"
        alt="button icon"
        class="h-4 w-4 ml-2 object-contain justify-center items-center flex mt-1"
      />
    </span>
  </Button>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";

const { t, locale } = useI18n();

defineProps({
  disabled: Boolean,
  loading: Boolean,
  label: {
    type: String,
    required: true,
  },
  imageSrc: {
    type: Object, // Object to store image paths for different languages
    required: true, // Required to ensure images for all languages are provided
  },
  width: {
    type: String,
    default: "25rem",
  },
});

// Compute the image source based on the current locale
const localizedImageSrc = computed(() => {
  return imageSrc[locale.value] || imageSrc["en"]; // Default to English if no match
});
</script>
