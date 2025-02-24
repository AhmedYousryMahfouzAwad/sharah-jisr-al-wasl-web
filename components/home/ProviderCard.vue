<template>
  <NuxtLink :to="to" class="flex justify-center items-center cursor-pointer">
    <div
      class="hover:bg-primary-3 bg-slate-50 border-2 hover:border-primary-1 border-gray-50 w-80 p-2 transition-all duration-300 hover:translate-y-[-4px]"
    >
      <div class="relative w-full h-48">
        <img
          v-if="image"
          :src="image"
          alt="office"
          class="w-full h-full object-cover"
        />
        <div v-else class="w-full h-full bg-gray-300 animate-pulse"></div>
      </div>

      <div class="pt-2 justify-between items-start flex">
        <div>
          <h3 class="text-base font-bold text-gray-900">{{ name }}</h3>
        </div>

        <div class="flex-shrink-0">
          <!-- زر الإضافة إلى المفضلة -->
          <button
            v-if="!is_favored"
            :disabled="loadingFavoriteId === id"
            class="bg-[#DEDEDE] p-2 transition-all duration-200 flex justify-center items-center"
            @click.prevent="$emit('toggle-favorite', id)"
          >
            <span
              v-if="loadingFavoriteId === id"
              class="animate-spin border-2 border-gray-500 border-t-transparent rounded-full w-5 h-5"
            ></span>
            <img v-else src="/Icon.svg" alt="icon" class="w-10 h-5" />
          </button>

          <!-- زر الإزالة من المفضلة -->
          <button
            v-if="is_favored"
            :disabled="loadingFavoriteId === id"
            class="bg-[#FEE4E2] p-2 transition-all duration-200 flex justify-center items-center"
            @click.prevent="$emit('toggle-favorite', id)"
          >
            <span
              v-if="loadingFavoriteId === id"
              class="animate-spin border-2 border-red-500 border-t-transparent rounded-full w-5 h-5"
            ></span>
            <img
              v-else
              src="/favourite_active.svg"
              alt="icon"
              class="w-10 h-5"
            />
          </button>
        </div>
      </div>
      <div class="flex items-center space-x-2 mt-1">
        <vue3-star-ratings
          class="star-active"
          :model-value="rating"
          :inactive-color="'#BABABA'"
          v-bind:active-color="'#facc15'"
          :border-color="'#FFDB00'"
          :star-size="15"
        />
        <span class="text-sm text-gray-600">({{ rating }})</span>
      </div>

      <div class="mt-3 space-y-2">
        <div class="flex items-center space-x-2 gap-x-2">
          <img src="/map_provider.svg" alt="icon" class="w-4 h-4" />
          <p class="text-xs font-bold">{{ city }}</p>
        </div>
        <div class="flex items-start space-x-2 gap-x-2">
          <img src="/map_provider.svg" alt="icon" class="w-4 h-4" />
          <p class="text-xs font-bold line-clamp-2">{{ address }}</p>
        </div>
      </div>

      <div class="mt-4">
        <NuxtLink class="flex justify-end items-center space-x-2 gap-2">
          <p class="my-2 !text-xs !text-start !text-primary-1 font-bold">
            {{ t("pages.view_more") }}
          </p>
          <img
            src="/arrow_brown.svg"
            :class="[
              'object-contain',
              currentLang === 'en' ? 'rotate-180' : '',
            ]"
            alt="icon"
            class="mt-1"
            srcset=""
          />
        </NuxtLink>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
import Vue3StarRatings from "vue3-star-ratings";
const { t, locale } = useI18n();

defineProps({
  image: String,
  name: String,
  rating: [Number, String],
  city: String,
  address: String,
  id: [String, Number],
  to: {
    type: [String, Object, Function],
    required: true,
  },
  is_favored: Boolean,
});

const currentLang = computed(() => locale.value);
</script>

<style scoped>
.p-rating .p-rating-icon {
  color: #facc15 !important; /* Ensure stars are yellow */
}

:deep(.star-active) {
  color: #ffdb00 !important;
}

:deep(.star-active) {
  fill: #ffdb00 !important;
}
</style>
