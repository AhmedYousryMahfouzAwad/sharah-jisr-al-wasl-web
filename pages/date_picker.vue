<template>
    <div class="max-w-3xl w-full p-4 gap-4 space-y-5 min-h-full mx-auto justify-center flex flex-col">
        <div class="picker-wrapper w-full my-5 justify-center items-center max-w-2xl mx-auto p-4 space-y-5 py-8 gap-4">
            <!-- Date Picker -->
            <DatePicker v-model="dates" inline selectionMode="multiple" dateFormat="d-mm-yy" class="w-full py-5" />

            <!-- Error Message -->
            <div v-if="error" class="text-red-2 font-semibold text-center">
                {{ error }}
            </div>

            <!-- Update Query Button -->
            <div class="w-[50%] mx-auto">
                <ButtonAuth @click="updateQuery" :loading="loading" :label="t('pages.auth.of_course')"
                    class="col-span-12 md:col-span-6 mx-auto bg-blue-500 text-white p-3 rounded" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import DatePicker from 'primevue/datepicker';

const { t, locale } = useI18n();
const router = useRouter();
const route = useRoute();
const dates = ref([])
const error = ref(""); // For displaying validation errors
const localePath = useLocalePath();

const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
};
// Use the dates store
// const datesStore = useDatesStore();
const { loading } = storeToRefs(useDatesStore());
const { remain_visits } = storeToRefs(useOrderPackageStore());
const { setSelectedDates } = useDatesStore();

const updateQuery = () => {
    error.value = ""; // Clear any previous errors
    loading.value = true;

    if (dates.value.length) {
        // Check if selected dates match the number of remain_visits
        if (dates.value.length !== remain_visits.value) {
            error.value = t("pages.auth.invalid_date_selection", {
                required: remain_visits.value,
            });
            loading.value = false;
            return;
        }

        // Format selected dates to dd-mm-yy
        const formattedDates = dates.value.map((date) => {
            if (date instanceof Date) {
                return formatDate(date);
            }
            return date; // If the value is already formatted or invalid
        });

        // Store the formatted dates in Pinia
        setSelectedDates(formattedDates);



        // Navigate to the next page
        setTimeout(() => {
            router.push(localePath("time"));
        }, 1000);

        loading.value = false;
    } else {
        error.value = t("pages.auth.no_dates_selected");
        loading.value = false;
    }
};

</script>

<style scoped>
::v-deep(.p-datepicker .p-datepicker-panel) {
    padding: 100px !important;
}

.w-full {
    width: 100%;
}
</style>
