<template>
  <div
    class="bg-[#F9F5F1] relative w-full overflow-hidden cursor-pointer block"
  >
    <HomeTitle
      :src="'/elements.png'"
      class="my-5 mx-auto text-center justify-center items-center flex"
      :title="t('pages.what_we_offer')"
    />
    <p class="text-center text-gray-900 font-bold text-base mb-5 md:text-xl">
      {{ t("pages.what_we_offer_desc") }}
    </p>
    <div class="max-w-7xl py-5 grid grid-cols-12 gap-5 mx-auto">
      <template v-if="loading">
        <div
          v-for="index in 3"
          :key="index"
          class="border-primary-1 container border-2 sm:col-span-4 col-span-12 md:mx-auto gap-3 p-10 rounded-lg bg-white shadow-sm flex w-full flex-col items-center animate-pulse"
        >
          <div class="w-10 h-10 bg-gray-300 rounded-full"></div>
          <div class="w-32 h-4 bg-gray-300 mt-3 rounded"></div>
        </div>
      </template>

      <template v-else>
        <NuxtLink
          v-for="(category, index) in categories"
          :key="index"
          to="/"
          class="border-primary-1 container border-2 sm:col-span-4 col-span-12 md:mx-auto gap-3 p-10 rounded-lg bg-white shadow-sm flex w-full flex-col items-center"
        >
          <img :src="category.image" :alt="category.name" class="w-10 h-10" />
          <p class="text-gray-900 font-medium mt-3">{{ category.name }}</p>
        </NuxtLink>
      </template>

      <img
        src="/bg-section.png"
        class="w-full object-cover absolute z-0 bottom-0 right-0 max-w-[500px] left-0 top-3/4 transform -translate-y-1/2"
        alt="Login Illustration"
      />
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

defineProps({
  categories: {
    type: Array,
    default: [],
  },
  loading: {
    type: Boolean,
    default: true,
  },
});
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1.5s infinite;
}

@keyframes pulse {
  0% {
    background-color: #f0f0f0;
  }
  50% {
    background-color: #e0e0e0;
  }
  100% {
    background-color: #f0f0f0;
  }
}
</style>
