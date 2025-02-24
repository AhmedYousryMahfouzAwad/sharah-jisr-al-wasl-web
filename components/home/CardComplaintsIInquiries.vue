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
      v-for="complaints in list_complaints_inquiries"
      :key="complaints.id"
      class="bg-[#F5F5F5] col-span-12 rounded-lg"
    >
      <div class="p-5">
        <p class="text-start text-sm my-2">
          {{ t("pages.complaint_number") }}
          <span>{{ complaints.complaint_num }} </span>
        </p>
        <p class="text-start text-sm my-2">
          {{ t("pages.complaint_created") }}
          <span> {{ complaints.created_at }} </span>
        </p>
        <div v-if="complaints.order_num != null">
          <p class="text-start text-sm my-2">
            {{ t("pages.order_number") }}
            <span>{{ complaints.order_num }} </span>
          </p>
        </div>

        <NuxtLink class="flex items-center justify-end">
          <p class="px-2 text-end text-[#866037] text-sm">
            {{ t("pages.order_details") }}
          </p>
          <img
            src="/arrow_brown.svg"
            :class="[
              'h-4 w-4 mx-2 object-contain justify-center items-center flex mt-1',
              currentLang === 'en' ? 'rotate-180' : '',
            ]"
          />
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t, locale } = useI18n();

defineProps({
  list_complaints_inquiries: {
    type: Array,
    default: [],
  },

  loading: {
    type: Boolean,
  },
});

const currentLang = computed(() => locale.value);
</script>

<style></style>
