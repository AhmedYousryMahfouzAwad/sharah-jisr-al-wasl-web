<template>
  <div class="card rounded-s-none">
    <Carousel
      v-if="!loading && sliders_list.length > 0"
      :value="sliders_list"
      :numVisible="1"
      :numScroll="1"
      :responsiveOptions="responsiveOptions"
    >
      <template #item="{ data }">
        <div class="relative">
          <div class="px-1">
            <img
              :src="data.image || '/img/default.jpg'"
              :alt="data.title || 'Banner Image'"
              class="!w-full !h-96 object-cover"
            />
          </div>
          <div
            class="absolute bottom-[50%] left-0 w-full bg-opacity-50 text-white font-bold text-center p-2 text-2xl"
          >
            {{ data.title || "No Title" }}
          </div>
        </div>
      </template>
    </Carousel>

    <div v-else class="!flex justify-center gap-4 items-center mx-auto">
      <Skeleton
        v-if="loading"
        v-for="i in 1"
        :key="i"
        class="w-full !h-96 mb-4"
        size="100rem"
      />
    </div>
  </div>
</template>

<script setup>
import Carousel from "primevue/carousel";
import Skeleton from "primevue/skeleton";

defineProps({
  sliders_list: {
    type: Array,
    default: () => [],
  },
  loading: Boolean,
});

const responsiveOptions = ref([
  { breakpoint: "1400px", numVisible: 1, numScroll: 1 },
]);
</script>

<style scoped>
:deep(.p-carousel-indicator-list) {
  @apply !mt-2 !py-2;
}

.card * {
  padding: 0 !important;
}
</style>
