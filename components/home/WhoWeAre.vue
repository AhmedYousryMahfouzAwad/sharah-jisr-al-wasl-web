<template>
  <div
    class="grid grid-cols-1 md:grid-cols-12 w-full space-y-5 md:space-y-0 text-white justify-center items-start text-sm mx-auto gap-5"
  >
    <!-- Text Section -->
    <div class="col-span-12 md:col-span-6 text-black px-5">
      <HomeTitle
        src="/elements.png"
        :title="t('pages.who_we_are')"
        class="my-5"
      />

      <div v-if="loading" class="space-y-3 animate-pulse">
        <div class="h-6 bg-gray-300 rounded w-3/4"></div>
        <div class="h-6 bg-gray-300 rounded w-1/2"></div>
        <div class="h-4 bg-gray-300 rounded w-full"></div>
        <div class="h-10 bg-gray-400 rounded w-[30%]"></div>
      </div>

      <div v-else>
        <p class="text-black my-5 text-xl font-bold">
          {{ who_we_are.description }}
        </p>
        <p class="text-black my-5">{{ who_we_are.content }}</p>
        <ButtonAuth
          :label="t('pages.learn_more')"
          :disabled="loading"
          class="my-5 !w-[30%] !text-xs text-center !flex !bg-primary-1 text-white font-bold"
          :imageSrc="'/arrow.png'"
        />
      </div>
    </div>

    <!-- Image Section -->
    <div class="col-span-12 md:col-span-6 flex justify-center px-5">
      <div class="w-full h-64 md:h-80 overflow-hidden rounded-lg">
        <img
          v-if="!loading"
          class="w-full h-full object-cover rounded-lg"
          :src="who_we_are.image"
          alt="Image"
        />
        <div
          v-else
          class="w-full h-full bg-gray-300 animate-pulse rounded-lg"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();

defineProps({
  loading: { type: Boolean, default: true },
  who_we_are: { type: Object, default: {} },
});
</script>
