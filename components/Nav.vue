<template>
  <nav class="bg-black shadow-md px-5 p-3 justify-start items-center flex">
    <p class="text-white text-sm">{{ t("pages.home") }}</p>

    <i :class="arrowIcon" class="mx-3 pt-1"> </i>
    <p class="text-white">{{ title }}</p>
  </nav>
</template>
<script setup>
const { locale, t } = useI18n();
defineProps({
  title: String,
});
const arrowIcon = computed(() =>
  locale.value === "ar" ? "pi pi-chevron-left" : "pi pi-chevron-right"
);
</script>

<style scoped>
i {
  font-size: 9px !important;
  color: white;
}
</style>
