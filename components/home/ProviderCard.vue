<template>
  <div class="flex justify-center items-center cursor-pointer">
    <div
      class="hover:bg-primary-3 bg-slate-50 border-2 hover:border-primary-1 border-gray-50 shadow-md w-80 p-4 transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div class="relative w-full h-48">
        <img
          v-if="image"
          :src="image"
          alt="office"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full bg-gray-300 animate-pulse"></div>

        <button
          class="absolute top-3 left-3 bg-white p-2 rounded-full shadow-md"
        >
          <i class="pi pi-heart text-gray-400"></i>
        </button>
      </div>

      <div class="p-4">
        <h3 class="text-lg font-bold text-gray-900">{{ title }}</h3>

        <div class="flex items-center space-x-2 mt-2">
          <vue3-star-ratings
            :model-value="rating"
            inactive-color="#BABABA"
            active-color="#FFDB00"
            border-color="#FFDB00"
          />

          <span class="text-sm text-gray-600">({{ rating }})</span>
        </div>

        <div class="mt-3">
          <div class="flex items-center space-x-2">
            <i class="pi pi-map-marker text-orange-500"></i>
            <p class="text-sm text-gray-600">{{ city }}</p>
          </div>
          <div class="flex items-center space-x-2">
            <i class="pi pi-map text-orange-500"></i>
            <p class="text-sm text-gray-600">{{ address }}</p>
          </div>
        </div>

        <div class="mt-4">
          <a
            href="#"
            class="text-orange-600 text-sm font-medium flex items-center"
          >
            <i class="pi pi-arrow-left ml-1"></i> مشاهدة المزيد
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import Vue3StarRatings from "vue3-star-ratings";

defineProps({
  image: {
    type: String,
  },
  title: {
    type: String,
  },
  rating: {
    type: Number,
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  id: {
    type: Number,
  },
});
</script>

<style scoped>
.p-rating .p-rating-icon {
  color: #facc15 !important; /* Ensure stars are yellow */
}
</style>
