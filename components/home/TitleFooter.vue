<template>
  <div class="!flex justify-start gap-2 items-center mx-auto">
    <img :src="src" alt="Home Icon" class="w-5 mt-1" />
    <p class="font-bold text-sm">
      {{ t(title) }}
    </p>
  </div>
</template>

<script setup>
// i18n
const { t } = useI18n();

// props
defineProps({
  title: {
    type: String,
    default: "title",
  },
  src: {
    type: String,
    default: "title",
  },
});
</script>
