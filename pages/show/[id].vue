<template>
  <template>
    <div>
      <div
        class="relative w-full h-[150px] md:h-[150px] lg:h-[200px] overflow-hidden"
      >
        <img
          v-if="provider_obj && provider_obj.image"
          :src="provider_obj.image"
          alt="Banner"
          class="absolute inset-0 w-full h-full object-cover"
        />

        <!-- Overlay Gradient -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-black/50 via-black/10 to-black/50"
        ></div>

        <!-- Content -->
        <div
          class="absolute inset-0 flex flex-col justify-start mt-5 items-start text-center text-white px-6"
        >
          <!-- Breadcrumb -->
          <p
            v-if="provider_obj && provider_obj?.category?.name"
            class="text-xs md:text-sm font-light opacity-80"
          >
            {{ t("pages.home") }} <span class="mx-2">›</span>
            {{ provider_obj?.category?.name }} <span class="mx-2">›</span>
            {{ provider_obj?.name }}
          </p>

          <!-- Title -->
          <h1
            class="text-lg md:text-lg font-bold mt-2"
            v-if="provider_obj && provider_obj?.name"
          >
            {{ provider_obj?.name }}
          </h1>
        </div>
      </div>
    </div>

    <div class="max-w-5xl mx-auto my-5 grid grid-cols-12 gap-4">
      <div class="col-span-12 md:col-span-7">
        <Image :src="provider_obj.image" width="100%" alt="Image" preview />

        <div class="justify-between items-center flex my-2">
          <p class="font-bold">{{ provider_obj?.name }}</p>
          <div class="bg-[#FEE4E2] p-2">
            <img src="/Icon.svg" alt="icon" class="w-5 h-5" srcset="" />
          </div>
        </div>

        <div class="flex items-center space-x-2 mt-2">
          <vue3-star-ratings
            class="star-active"
            :model-value="parseFloat(provider_obj?.rate_avg) || 0"
            :inactive-color="'#BABABA'"
            v-bind:active-color="'#facc15'"
            :border-color="'#FFDB00'"
            :star-size="15"
          />

          <span class="text-sm text-gray-600"
            >({{ provider_obj?.rate_avg }})</span
          >
        </div>

        <!-- الوصف -->
        <div class="bg-primary-3 mt-2 p-4 rounded-lg">
          <h2 class="font-bold mb-2">
            {{ t("pages.desc") }}
          </h2>
          <p class="leading-relaxed text-sm font-semibold">
            لوريم إيبسوم هو ببساطة نص شكلي يُستخدم في صناعات المطابع ودور النشر.
            كان لوريم إيبسوم ولا يزال المعيار للنص الشكلي منذ القرن الخامس عشر
            عندما قامت مطبعة مجهولة برص مجموعة من الحروف بشكل عشوائي لتكوين كتاب
            بمثابة دليل أو مرجع شكلي لهذه الأحرف.
          </p>
        </div>

        <div class="bg-[#fcf8f3] mt-2 p-4 rounded-lg border-[#e7dacb]">
          <h2 class="font-bold mb-2">
            {{ t("pages.activities") }}
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="(activity, index) in provider_obj?.activities"
              :key="activity.id"
              class="bg-primary-2 px-4 py-2 rounded-lg text-sm font-semibold"
            >
              {{ activity.name }}
            </span>
          </div>
        </div>

        <div class="mt-2">
          <h2 class="font-bold mb-2">
            {{ t("pages.working_hours") }}
          </h2>
          <div class="bg-primary-3 text-sm p-4 rounded-lg">
            <p>
              الإثنين - الجمعة: من الساعة <strong>05:00 AM</strong> إلى
              <strong>08:00 PM</strong>
            </p>
            <p>
              السبت وأحد: من الساعة <strong>03:00 PM</strong> إلى
              <strong>08:00 PM</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script setup>
const { fetchData, resultData } = useFetchData();
import Vue3StarRatings from "vue3-star-ratings";

const route = useRoute();
const banner = ref(null);
const provider_obj = ref({});
import Image from "primevue/image";

const { t } = useI18n();
const activities = [
  "النشاط الأول",
  "النشاط الأول",
  "النشاط الأول",
  "النشاط الثاني",
  "النشاط الثالث",
  "النشاط الرابع",
  "النشاط الخامس",
];
const getProvider = async () => {
  try {
    await fetchData({
      url: `api/user/providers/${route.params.id}`,

      onSuccess: () => {
        provider_obj.value = resultData.value;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching providers:", error);
  }
};

// onMounted(getBanner, getProvider);
onMounted(() => {
  getProvider();
});
</script>

<style scoped></style>
