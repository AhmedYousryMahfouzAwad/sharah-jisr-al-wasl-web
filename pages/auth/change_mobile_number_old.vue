<template>
  <Nav :title="t('pages.change_mobile_number')" />
  <div class="mx-auto !mt-32">
    <div
      class="flex col-span-12 flex-col items-center relative shadow-lg p-2 rounded-lg bg-white max-w-lg mx-auto justify-center w-full z-10"
    >
      <form @submit.prevent="submit" class="text-start space-y-10 w-full">
        <!-- Header -->
        <div>
          <h1 class="md:text-3xl text-black text-base text-center font-bold">
            {{ t("pages.mobile_number") }}
          </h1>
          <h1
            class="font-semibold my-1 md:text-sm text-xs text-center text-gray-600"
          >
            {{ t("pages.enter_phone") }}
          </h1>
        </div>

        <div class="card">
          <div class="p-4 my-5">
            <p class="text-start my-2">
              <span class="text-red-2">*</span>
              {{ t("pages.mobile_number") }}
            </p>
            <!-- Phone Input -->
            <div class="w-full grid grid-cols-12 gap-2">
              <!-- Country Select -->
              <div
                class="relative col-span-12 sm:col-span-5 md:col-span-4 self-start"
              >
                <Select
                  v-model="country"
                  :options="list_countries"
                  optionLabel="key"
                  class="w-full py-1 h-full flex border-2 text-sm rounded-lg !bg-gray-200 focus:outline-none focus:ring-1 focus:ring-primary-1"
                >
                  <!-- Selected Value Display -->
                  <template #value="slotProps">
                    <div v-if="slotProps.value" class="flex items-center">
                      <img
                        :alt="slotProps.value.label"
                        :src="slotProps.value.image"
                        class="mr-2"
                        style="
                          width: 25px;
                          height: 15px;
                          object-fit: cover;
                          border-radius: 3px;
                        "
                      />
                      <span class="text-gray-700 font-medium">{{
                        `${slotProps.value.key}`
                      }}</span>
                    </div>
                    <span v-else class="text-gray-400">{{
                      slotProps.placeholder
                    }}</span>
                  </template>

                  <!-- Dropdown Options -->
                  <template #option="slotProps">
                    <div
                      class="flex items-center justify-start w-full py-1 hover:bg-gray-300 cursor-pointer"
                      :key="slotProps.option.key"
                    >
                      <img
                        :alt="slotProps.option.label"
                        :src="slotProps.option.image"
                        style="
                          width: 25px;
                          height: 15px;
                          object-fit: cover;
                          border-radius: 3px;
                        "
                      />
                      <span class="text-gray-700 font-medium">{{
                        `${slotProps.option.key}`
                      }}</span>
                    </div>
                  </template>
                </Select>
              </div>

              <!-- Phone Input -->
              <div class="relative col-span-12 sm:col-span-7 md:col-span-8">
                <InputForm
                  name="phone"
                  :loading="loading"
                  v-model="phone"
                  type="text"
                  :placeholder="t('pages.auth.call_number_placeholder')"
                  class="w-full pl-3 pr-3 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                />
              </div>
            </div>

            <div class="md:px-0 px-2 mt-5">
              <ButtonAuth
                :imageSrc="'/arrow.png'"
                :loading="loading"
                type="submit"
                :label="t('pages.next')"
                :disabled="loading"
                class="!mx-auto !justify-center !items-center !flex !bg-primary-1 text-white font-bold"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Background Image -->
  <img
    :src="illustration"
    class="w-full h-auto object-cover bottom-0 fixed z-0"
    alt="Login Illustration"
  />
</template>

<script setup>
const { t } = useI18n();
import * as yup from "yup";
import illustration from "../../public/img/Illustration.png";
import { useCookie, useLocaleRoute, nextTick, navigateTo } from "#imports";

const { sendChangePhone } = useLoginStore();
const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();

const loading = ref(false);
const phone = ref("");
const validationSchema = yup.object({
  phone: yup
    .string()
    .required(t("validation.required"))
    .matches(/^[0-9]+$/, t("validation.only_digits"))
    .min(9, t("validation.min_n", { min: 9 }))
    .max(10, t("validation.max_n", { max: 10 })),
});

const { handleSubmit } = useForm({
  validationSchema,
});

onMounted(async () => {
  try {
    await getCountries();
  } catch (error) {
    console.error("Error fetching countries:", error);
  } finally {
  }
});
const submit = handleSubmit(async () => {
  loading.value = true;
  try {
    const payload = {
      phone: phone.value,
      country_code: country.value.key, // Ensure this is correctly set
    };

    useCookie("country_code").value = country.value.key;
    useCookie("phone").value = phone.value;

    await sendChangePhone(payload);
  } catch (error) {
    console.error("Error during login:", error);
  } finally {
    loading.value = false;
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
