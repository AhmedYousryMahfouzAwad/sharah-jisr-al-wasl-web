<template>
  <!-- Main Content -->
  <div
    class="grid grid-cols-12 lg:container !mx-auto justify-center items-start"
  >
    <div class="lg:col-span-3 md:col-span-5 col-span-1 mx-5 my-5">
      <ListBar />
    </div>
    <div class="lg:col-span-9 md:col-span-7 col-span-11 my-5">
      <div class="text-start space-y-10 mt-8 w-full">
        <!-- Card Container -->
        <div class="flex justify-start items-center">
          <div class="bg-white shadow-2xl rounded-xl p-4 w-full max-w-3xl">
            <!-- Header Section -->
            <div class="flex items-center justify-between border-b pb-4">
              <div class="flex items-center gap-x-2">
                <div
                  class="relative p-2 rounded-full bg-primary-2 cursor-pointer"
                >
                  <img
                    src="/favourite.svg"
                    alt="favorite"
                    class="w-6 h-6 rounded-full object-cover"
                  />
                </div>
                <div>
                  <p class="font-bold text-sm">{{ t("pages.favorite") }}</p>
                  <p class="font-semibold text-xs text-gray-700">
                    {{ t("pages.check_companies") }}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <div class="card">
                <!-- Tab Content -->
                <div class="p-4">
                  <!-- Sub-tabs -->
                  <div
                    class="grid grid-cols-12 w-full rounded-full bg-primary-2 p-1 mb-4"
                  >
                    <!--   Individual -->
                    <button
                      type="button"
                      @click="activeSubTab = 'contracting_companies'"
                      :class="
                        activeSubTab === 'contracting_companies'
                          ? 'bg-primary-1 text-white'
                          : 'bg-primary-2 text-gray-600'
                      "
                      class="col-span-4 text-center text-sm font-bold rounded-full py-2"
                    >
                      {{ t("pages.contracting_companies") }}
                    </button>

                    <!-- Sub-tab: Company -->
                    <button
                      type="button"
                      @click="activeSubTab = 'building_materials_companies'"
                      :class="
                        activeSubTab === 'building_materials_companies'
                          ? 'bg-primary-1 text-white'
                          : 'bg-pr-200 text-gray-600'
                      "
                      class="col-span-4 text-sm text-center font-bold rounded-full py-2"
                    >
                      {{ t("pages.building_materials_companies") }}
                    </button>

                    <button
                      type="button"
                      @click="activeSubTab = 'offices_companies'"
                      :class="
                        activeSubTab === 'offices_companies'
                          ? 'bg-primary-1 text-white'
                          : 'bg-pr-200 text-gray-600'
                      "
                      class="col-span-4 text-sm text-center font-bold rounded-full py-2"
                    >
                      {{ t("pages.offices") }}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const { fetchData, resultData } = useFetchData();
import * as yup from "yup";
// i18n
const { t } = useI18n();
const available_balance = ref("");
const loading = ref(true);
const loading_btn = ref(false);
const visible = ref(false);
const balance = ref(null);
const activeSubTab = ref("contracting_companies");

const validationSchema = yup.object({
  balance: yup.string().required(t("validation.required")),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});

const wallet = async () => {
  try {
    await fetchData({
      url: `api/wallets/show`,
      onSuccess: () => {
        available_balance.value = resultData.value.available_balance ?? 0;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  try {
    await wallet();
  } finally {
    loading.value = false; // Hide loading state after data is fetched
  }
});

const submit = handleSubmit(async () => {
  const payload = { balance: balance.value, brand_id: 2 };
  try {
    loading_btn.value = true;
    await fetchData({
      url: `api/wallets/charge`,
      method: "POST",
      body: payload,
      getSuccess: true,

      onSuccess: () => {
        visible.value = false;
        balance.value = null;
      },
    });
  } catch (error) {
    console.error("❌ Error fetching banners:", error);
  } finally {
    loading_btn.value = false;
  }
});
</script>

<style scoped>
/* Ensure white background is applied */
.bg-white {
  background-color: #ffffff !important;
}

/* Disable interaction with background image */
img.z-0 {
  pointer-events: none;
}

/* Adjust button style */
.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.p-tab-active {
  @apply !border-primary-1 !text-primary-1;
}

::v-root .active-bar-color {
  background-color: #c69e73 !important;
}

.active-tab {
  background-color: #c69e73;
  color: white;
}
.inactive-tab {
  background-color: #f3f3f3;
  color: black;
}

/* Dropdown Container */
.select-container {
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: 4px;
  background-color: #fff;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

/* Dropdown Option */
.select-option {
  display: flex;
  align-items: center;
  padding: 6px 8px;
  cursor: pointer;
}

.select-option:hover {
  background-color: #f9fafb;
}

.select-option img {
  width: 25px;
  height: 15px;
  border-radius: 3px;
  object-fit: cover;
  margin-right: 8px;
}

.select-option span {
  font-size: 14px;
  color: #1a202c;
}

/* Arrow Styling */
.dropdown-arrow {
  font-size: 10px !important;
  color: #a0aec0;
  margin-left: 4px;
}

/* Selected Item */
.selected-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px;
}
.grid {
  align-items: center;
}

.relative {
  position: relative;
}

input:focus,
select:focus {
  outline: none;
  border-color: #4299e1;
}
</style>
