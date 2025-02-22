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
          <h3 class="text-lg font-bold text-gray-900">{{ name }}</h3>

          <div class="flex items-center space-x-2 mt-2">
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
              <p class="text-xs font-bold">{{ address }}</p>
            </div>
          </div>
        </div>
        <div class="bg-[#DEDEDE] p-2">
          <img src="/Icon.svg" alt="icon" class="w-10 h-5" srcset="" />
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
  image: {
    type: String,
  },
  name: {
    type: String,
  },
  rating: {
    type: [Number, String],
  },
  city: {
    type: String,
  },
  address: {
    type: String,
  },
  id: {
    type: [String, Number],
  },
  to: {
    type: [String, Object],
    required: true,
  },
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
