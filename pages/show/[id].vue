<template>
  <div v-if="isLoading" class="max-w-5xl mx-auto my-5 grid grid-cols-12 gap-4">
    <!-- Skeleton Loader أثناء التحميل -->
    <div class="col-span-12 md:col-span-7">
      <div class="h-64 bg-gray-200 animate-pulse rounded-lg"></div>
      <div class="h-6 bg-gray-200 animate-pulse rounded mt-4 w-3/4"></div>
      <div class="h-4 bg-gray-200 animate-pulse rounded mt-2 w-1/2"></div>
    </div>
    <div class="col-span-12 md:col-span-5">
      <div class="h-32 bg-gray-200 animate-pulse rounded-lg"></div>
    </div>
  </div>

  <div v-else>
    <div
      class="relative w-full h-[150px] md:h-[150px] lg:h-[200px] overflow-hidden"
    >
      <img
        v-if="provider_obj.image"
        :src="provider_obj.image"
        alt="Banner"
        class="absolute inset-0 w-full h-full object-cover"
      />
      <div
        class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-black/50"
      ></div>
      <div
        class="absolute inset-0 flex flex-col justify-start mt-5 items-start text-center text-white px-6"
      >
        <p
          v-if="provider_obj.category?.name"
          class="text-xs md:text-sm font-light opacity-80"
        >
          {{ t("pages.home") }} <span class="mx-2">›</span>
          {{ provider_obj.category.name }} <span class="mx-2">›</span>
          {{ provider_obj.name }}
        </p>
        <h1 class="text-lg md:text-lg font-bold mt-2" v-if="provider_obj.name">
          {{ provider_obj.name }}
        </h1>
      </div>
    </div>

    <div class="max-w-5xl mx-auto my-5 grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-7">
        <Image
          v-if="provider_obj.image"
          :src="provider_obj.image"
          width="100%"
          alt="Image"
          preview
        />
        <div class="justify-between items-center flex mt-2">
          <p class="font-bold">{{ provider_obj.name }}</p>
          <div class="bg-[#FEE4E2] p-2">
            <img src="/Icon.svg" alt="icon" class="w-5 h-5" />
          </div>
        </div>

        <div class="flex items-center space-x-2">
          <vue3-star-ratings
            class="star-active"
            :model-value="parseFloat(provider_obj.rate_avg) || 0"
            :inactive-color="'#BABABA'"
            v-bind:active-color="'#facc15'"
            :border-color="'#FFDB00'"
            :star-size="15"
          />
          <span class="text-sm text-gray-600"
            >({{ provider_obj.rate_avg }})</span
          >
        </div>

        <div class="bg-primary-3 mt-2 p-4 rounded-lg">
          <h2 class="font-bold mb-2">{{ t("pages.desc") }}</h2>
          <p class="leading-relaxed text-sm font-semibold">
            {{ provider_obj.description }}
          </p>
        </div>

        <div class="bg-[#fcf8f3] mt-2 p-4 rounded-lg border-[#e7dacb]">
          <h2 class="font-bold mb-2">{{ t("pages.activities") }}</h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="activity in provider_obj.activities"
              :key="activity.id"
              class="bg-primary-2 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {{ activity.name }}
            </span>
          </div>
        </div>

        <div class="mt-2 bg-primary-3 p-4 rounded-lg">
          <h2 class="font-bold mb-2 text-lg">{{ t("pages.working_hours") }}</h2>
          <p
            v-for="day in provider_obj.work_times"
            :key="day.id"
            class="gap-x-2 text-sm"
          >
            <span class="px-2 text-start">{{ day.day }}</span>
            <span class="px-2 text-start">{{ t("pages.from") }}</span>
            <span class="px-2 text-start">{{ day.start_time }}</span>
            <span class="px-2 text-start">{{ t("pages.to") }}</span>
            <span class="px-2 text-start">{{ day.end_time }}</span>
          </p>
        </div>
      </div>

      <div class="col-span-12 md:col-span-5">
        <div class="bg-primary-3 text-sm rounded-lg p-2 space-y-2">
          <p class="font-bold text-[#5B4125] text-xl">
            {{ t("pages.rate_company") }}
          </p>
          <div>
            <!-- تقييم النجوم -->
            <Rating v-model="rate" />

            <!-- إضافة Transition للزر -->
            <transition name="fade-scale">
              <ButtonAuth
                v-if="rate >= 1 && rate <= 5"
                type="button"
                :imageSrc="'/arrow.png'"
                :label="t('pages.submit_rating')"
                class="!w-[45%] mt-2 !text-xs"
                :loading="submitLoading"
                :disabled="submitLoading"
                @click="submitRating"
              />
            </transition>
          </div>

          <p class="font-bold text-[#5B4125] text-xl">
            {{ t("pages.contact_information_desc") }}
          </p>

          <p>
            {{ t("inputs.city.label") }}
          </p>
          <div class="flex items-center space-x-2 gap-x-2">
            <img src="/map_provider.svg" alt="icon" class="w-4 h-4" />
            <p class="text-xs font-bold">{{ provider_obj?.city?.name }}</p>
          </div>
          <p>
            {{ t("pages.location") }}
          </p>
          <div class="flex items-center space-x-2 gap-x-2">
            <img src="/map_provider.svg" alt="icon" class="w-4 h-4" />
            <p class="font-semibold text-sm">
              <template
                v-if="
                  provider_obj.map_desc && provider_obj.lat && provider_obj.lng
                "
              >
                <a
                  :href="`https://www.google.com/maps?q=${provider_obj.lat},${provider_obj.lng}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs sm:text-sm font-semibold"
                >
                  {{ provider_obj.map_desc }}
                </a>
              </template>
            </p>
          </div>
          <p>
            {{ t("pages.phone_contact") }}
          </p>

          <div class="flex items-center space-x-2 gap-x-2">
            <img src="/call.svg" alt="icon" class="w-4 h-4" />
            <p class="font-semibold text-sm">
              <template v-if="provider_obj && provider_obj.phone">
                <a
                  :href="`tel:${provider_obj.phone}`"
                  class="text-sm font-semibold flex"
                >
                  {{ provider_obj.phone }}
                </a>
              </template>
            </p>
          </div>

          <ButtonAuth
            :imageSrc="'/arrow.png'"
            :loading="submitLoading"
            :label="t('pages.send_request_price')"
            :disabled="submitLoading"
            type="submit"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from "vue";
const { fetchData, resultData } = useFetchData();

import Vue3StarRatings from "vue3-star-ratings";
import Image from "primevue/image";

const route = useRoute();
const { t, locale } = useI18n();

const provider_obj = ref({});
const isLoading = ref(true);
const submitLoading = ref(false);
const rate = ref(0);

const getProvider = async () => {
  isLoading.value = true;
  try {
    await fetchData({
      url: `api/user/providers/${route.params.id}`,
      onSuccess: () => {
        provider_obj.value = resultData.value || {};
      },
    });
  } catch (error) {
    console.error("❌ Error fetching providers:", error);
  } finally {
    isLoading.value = false;
  }
};

const submitRating = async () => {
  submitLoading.value = true;

  const params = {
    rateable_id: route.params.id,
    rate: rate.value,
  };
  try {
    await fetchData({
      url: "api/user/providers/rate",
      method: "POST", // تأكد من استخدام POST
      params,
      getSuccess: true,
    });

    console.log("✅ Rating submitted successfully!");
  } catch (error) {
    console.error("❌ Error submitting rating:", error);
  } finally {
    submitLoading.value = false;
  }
};

// إعادة تحميل البيانات عند تغيير اللغة
watchEffect(() => {
  getProvider();
});
</script>

<style scoped>
/* تحريك Fade In + Scale عند الظهور */
.fade-scale-enter-active {
  transition: all 0.3s ease-out;
}
.fade-scale-enter-from {
  opacity: 0;
  transform: scale(0.9);
}
.fade-scale-enter-to {
  opacity: 1;
  transform: scale(1);
}

/* تحريك Fade Out عند الإخفاء */
.fade-scale-leave-active {
  transition: all 0.2s ease-in;
}
.fade-scale-leave-from {
  opacity: 1;
  transform: scale(1);
}
.fade-scale-leave-to {
  opacity: 0;
  transform: scale(0.9);
}
</style>
