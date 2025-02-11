<template>
  <div class="mx-auto !mt-20 grid grid-cols-12 gap-2 max-w-7xl my-10">
    <div
      class="flex md:col-span-6 col-span-12 flex-col items-center rounded-lg mx-auto justify-center w-full"
    ></div>
    <div
      class="flex md:col-span-6 col-span-12 flex-col items-center border-primary-1 border-2 p-2 rounded-lg bg-[#F9F5F1] mx-auto justify-center w-full"
    >
      <form @submit.prevent="submit" class="text-start space-y-10 w-full">
        <div class="card">
          <div class="p-4">
            <p class="font-bold text-lg">{{ t("pages.enter_data") }}</p>

            <p class="text-start font-bold my-2">
              {{ t("pages.name") }}
            </p>

            <!-- Name Input individual -->
            <div class="w-full grid grid-cols-12 gap-2">
              <!-- Name Input individual -->
              <div class="relative col-span-12">
                <InputForm
                  name="full_name"
                  v-model="full_name"
                  type="text"
                  :placeholder="t('pages.name')"
                  class="w-full !pr-10 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                >
                </InputForm>
              </div>
            </div>

            <p class="text-start font-bold my-2">
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
              <div class="col-span-12 sm:col-span-7 md:col-span-8">
                <InputForm
                  name="phone"
                  v-model="phone"
                  type="text"
                  :placeholder="t('pages.auth.call_number_placeholder')"
                  class="w-full pl-3 pr-3 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
                />
              </div>

              <div class="col-span-12">
                <p for="on_label" class="py-2 font-bold">
                  {{ t("pages.massage") }}
                </p>

                <Field
                  v-model="message"
                  name="message"
                  type="text"
                  v-slot="{ errorMessage }"
                >
                  <Textarea
                    id="over_label"
                    :placeholder="t('pages.enter_massage')"
                    class="!rounded-lg w-full"
                    v-model="message"
                    name="message"
                    rows="5"
                    style="
                      resize: none;
                      ::placeholder {
                        color: #a3a3a3;
                        font-size: 1rem;
                      }
                    "
                  />

                  <span
                    v-if="errorMessage"
                    class="error-message font-bold text-red-2 text-sm flex flex-col justify-center items-center"
                    >{{ errorMessage }}</span
                  >
                </Field>
              </div>
            </div>

            <div class="md:px-0 px-2 mt-5">
              <ButtonAuth
                :imageSrc="'/arrow_top.png'"
                :loading="loading_submit"
                type="submit"
                :label="t('pages.send')"
                :disabled="loading_submit"
                class="text-sm !w-[30%] !flex !bg-primary-1 justify-center items-center text-white font-bold"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
import * as yup from "yup";
import { Field, useForm } from "vee-validate";
const { fetchData } = useFetchData();

const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();
const loading_submit = ref(false);
const message = ref("");
const full_name = ref("");
const phone = ref("");
const validationSchema = yup.object({
  phone: yup
    .string()
    .trim()
    .required(t("validation.required"))
    .matches(/^[0-9]+$/, t("validation.only_digits"))
    .min(9, t("validation.min_n", { min: 9 }))
    .max(10, t("validation.max_n", { max: 10 })),

  message: yup.string().trim().required(t("validation.required")),
  full_name: yup.string().trim().required(t("validation.required")),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});

// Lifecycle hooks;
onMounted(async () => {
  try {
    await getCountries(); // Wait until getCountries() completes
  } catch (error) {
    console.error("Error fetching countries:", error);
  } finally {
  }
});

// Wrapping the submit logic
const submit = handleSubmit(async () => {
  const payload = {
    name: full_name.value,
    phone: phone.value,
    country_code: country.value.key,
    message: message.value,
  };
  try {
    loading_submit.value = true;

    await fetchData({
      url: `api/contact`,
      method: "post",
      body: payload,
      getSuccess: true,
    });
  } catch (error) {
    console.error("❌ Error in API request:", error);
  } finally {
    loading_submit.value = false; // Ensures loading resets no matter what happens
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
