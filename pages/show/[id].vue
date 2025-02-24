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
          <!-- <div class="bg-[#FEE4E2] p-2">
            <img src="/Icon.svg" alt="icon" class="w-5 h-5" />
          </div> -->

          <div class="flex-shrink-0">
            <button
              @click="handleToggleFavorite"
              v-if="!provider_obj.is_favored"
              :disabled="isFavoriteLoading"
              class="bg-[#DEDEDE] p-2 transition-all duration-200 flex justify-center items-center"
            >
              <span
                v-if="isFavoriteLoading"
                class="animate-spin border-2 border-gray-500 border-t-transparent rounded-full w-5 h-5"
              ></span>
              <img v-else src="/Icon.svg" alt="icon" class="w-5 h-5" />
            </button>

            <button
              @click="handleToggleFavorite"
              v-if="provider_obj.is_favored"
              :disabled="isFavoriteLoading"
              class="bg-[#FEE4E2] p-2 transition-all duration-200 flex justify-center items-center"
            >
              <span
                v-if="isFavoriteLoading"
                class="animate-spin border-2 border-red-500 border-t-transparent rounded-full w-5 h-5"
              ></span>
              <img
                v-else
                src="/favourite_active.svg"
                alt="icon"
                class="w-5 h-5"
              />
            </button>
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

        <div
          class="bg-[#f9f6f3] p-6 rounded-lg my-2 shadow-lg w-full max-w-4xl mx-auto"
        >
          <!-- Header -->
          <div class="flex justify-start mb-4">
            <p class="text-lg text-start font-bold text-gray-800">
              معرض الصور للأعمال السابقة
            </p>
          </div>

          <!-- Image Carousel -->

          <Carousel
            :value="images"
            :numVisible="2"
            :numScroll="1"
            :circular="true"
            :autoplayInterval="3000"
            class="rounded-lg overflow-hidden custom-carousel"
          >
            <!-- Slot for individual carousel item -->
            <template #item="slotProps">
              <div class="p-1">
                <img
                  :src="slotProps.data.image"
                  class="rounded-lg object-cover w-full h-48"
                />
              </div>
            </template>

            <!-- Custom Previous Arrow -->
            <template #previousicon>
              <div class="custom-arrow">
                <i class="pi pi-chevron-left"></i>
              </div>
            </template>

            <!-- Custom Next Arrow -->
            <template #nexticon>
              <div class="custom-arrow">
                <i class="pi pi-chevron-right"></i>
              </div>
            </template>
          </Carousel>
        </div>
      </div>

      <div class="col-span-12 md:col-span-5">
        <div class="bg-primary-3 text-sm rounded-lg p-2 space-y-2">
          <p class="font-bold text-[#5B4125] text-xl">
            {{ t("pages.rate_company") }}
          </p>
          <div>
            <Rating v-model="rate" />

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
            <p class="font-semibold text-xs">
              <template
                v-if="
                  provider_obj.map_desc && provider_obj.lat && provider_obj.lng
                "
              >
                <a
                  :href="`https://www.google.com/maps?q=${provider_obj.lat},${provider_obj.lng}`"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="text-xs font-semibold"
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
            <p class="font-semibold text-xs">
              <template v-if="provider_obj && provider_obj.phone">
                <a
                  :href="`tel:${provider_obj.phone}`"
                  class="text-xs font-semibold flex"
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

    <BaseDialog v-model:visible="visible" class="w-full max-w-xl mx-2">
      <template #content>
        <img
          src="/animation.gif"
          alt="animation_image"
          class="mx-auto justify-center w-[50%] items-center flex"
        />
        <span
          class="text-surface-500 text-center font-bold dark:text-surface-400 block mb-8 mx-auto"
        >
          {{ resMsg }}
        </span>
      </template>
    </BaseDialog>
  </div>
  <Footer />
</template>

<script setup>
import { ref, watchEffect } from "vue";
const { fetchData, resultData, resMsg } = useFetchData();

import Carousel from "primevue/carousel";
import Vue3StarRatings from "vue3-star-ratings";
import Image from "primevue/image";

const route = useRoute();
const { t, locale } = useI18n();
const isFavoriteLoading = ref(false);

//state
const provider_obj = ref({});
const isLoading = ref(true);
const submitLoading = ref(false);
const rate = ref(0);
const visible = ref(false);
const images = ref([]);

//methods
const getProvider = async () => {
  isLoading.value = true;
  try {
    await fetchData({
      url: `api/user/providers/${route.params.id}`,
      onSuccess: () => {
        provider_obj.value = resultData.value || {};
        images.value = resultData.value.images || [];
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

  const payload = {
    rateable_id: provider_obj.value.id,
    rate: rate.value,
  };

  try {
    await fetchData({
      url: "api/user/providers/rate",
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },

      onSuccess: () => {
        visible.value = true;

        setTimeout(() => {
          visible.value = false;
          rate.value = 0;
        }, 1000);
      },

      onError: () => {
        visible.value = false;
      },
    });

    console.log("✅ Rating submitted successfully!");
  } catch (error) {
    console.error("❌ Error submitting rating:", error);
  } finally {
    submitLoading.value = false;
  }
};

watchEffect(() => {
  getProvider();
});

const handleToggleFavorite = async () => {
  if (isFavoriteLoading.value) return; // ❌ منع النقر أثناء التحميل

  isFavoriteLoading.value = true; // ⏳ تفعيل التحميل عند الضغط

  try {
    await fetchData({
      url: `/api/user/favorites/toggle/${provider_obj.value.id}`,
      method: "post",
      getSuccess: true,
      onSuccess: () => {
        provider_obj.value.is_favored = !provider_obj.value.is_favored; // ✅ تحديث الحالة بعد نجاح الطلب
      },
    });
  } catch (error) {
    console.error("❌ Error toggling favorite:", error);
  } finally {
    isFavoriteLoading.value = false; // ⏳ إيقاف التحميل بعد انتهاء الطلب
  }
};
</script>

<style scoped>
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

.card {
  @apply max-w-[1200px] mx-auto py-4;
}

/* ::v-deep([dir="ltr"] .p-button .p-button-icon) {
  transform: rotate(180deg);
} */
</style>

<style>
.p-button.p-button-icon-only {
  @apply rtl:-scale-x-100;
}

.custom-arrow {
  width: 36px;
  height: 36px;
  background-color: #e8d9c6; /* Beige color */
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease-in-out;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Light shadow */
}

.custom-arrow i {
  font-size: 16px;
  color: #4a4033; /* Darker arrow icon */
}

.custom-arrow:hover {
  background-color: #dccbb4; /* Darker beige on hover */
  transform: scale(1.05); /* Subtle zoom effect */
}

/* Position arrows in bottom-right */
.custom-carousel .p-carousel-prev,
.custom-carousel .p-carousel-next {
  position: absolute;
  bottom: 10px; /* Adjust as needed */
  right: 10px;
  display: flex;
  gap: 8px;
}

/* Align arrows horizontally */
.custom-carousel .p-carousel-prev {
  margin-right: 42px; /* Space between left & right arrow */
}

/* RTL Support */
[dir="rtl"] .custom-carousel .p-carousel-prev {
  margin-right: 0;
  margin-left: 42px;
}

[dir="rtl"] .custom-carousel .p-carousel-next {
  margin-left: 0;
}
</style>
