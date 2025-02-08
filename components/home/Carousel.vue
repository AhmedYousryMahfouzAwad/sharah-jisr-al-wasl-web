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
        <div>
          <div class="px-1 !rounded-xl">
            <img
              :src="data.image || '/img/default.jpg'"
              :alt="data.title || 'Banner Image'"
              class="!w-full !h-96 cover !rounded-xl"
            />
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
