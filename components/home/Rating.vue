<template>
  <div v-if="loading" class="grid grid-cols-12 mx-auto my-10 gap-2">
    <div
      v-if="loading"
      v-for="i in 6"
      :key="i"
      class="bg-[#F5F5F5] md:col-span-4 col-span-12 rounded-lg animate-pulse"
    >
      <div class="p-5">
        <p class="text-start text-sm my-2 bg-gray-300 h-4 w-2/3 rounded"></p>
        <p class="text-start text-sm my-2 bg-gray-300 h-4 w-1/2 rounded"></p>
        <p class="text-start text-sm my-2 bg-gray-300 h-4 w-3/4 rounded"></p>
        <div class="flex items-center justify-end mt-2">
          <p class="px-2 text-end bg-gray-300 h-4 w-20 rounded"></p>
          <div class="h-4 w-4 bg-gray-300 rounded-full ml-2"></div>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="grid grid-cols-12 mx-auto my-10 gap-2">
    <div
      v-for="rate in list_rating"
      :key="rate.id"
      class="bg-[#F5F5F5] md:col-span-4 col-span-12 rounded-lg"
    >
      <div class="flex items-center gap-x-2 p-3">
        <div
          class="relative p-3 rounded-full border-2 border-primary-1 cursor-pointer hover:bg-primary-3"
        >
          <img :src="rate.user.image" alt="notifications" class="w-4 h-4" />
        </div>
        <div>
          <p class="text-sm">{{ rate.user.name }}</p>
          <p class="font-semibold text-sm">asdasdadsadasd</p>
        </div>
      </div>
      <p class="font-semibold text-sm pb-2 mx-5">
        {{ t("table.date") }} <span>dasdasd</span>
      </p>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();

defineProps({
  list_rating: {
    type: Array,
    default: [],
  },

  loading: {
    type: Boolean,
  },
});
</script>

<style></style>
