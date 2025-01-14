<template>
    <form @submit.prevent="submit" class="min-h-screen flex items-center justify-center p-4">
        <div class="bg-white rounded-lg shadow-md p-6 max-w-6xl w-full">
            <!-- Title -->
            <h2 class="text-center text-xl font-semibold mb-6 ">{{ t('pages.choose_time') }} </h2>

            <!-- Date Selection Grid -->
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 rounded-lg p-6">
                <div v-for="(item, index) in selectedDates" :key="index"
                    class="flex flex-col items-end justify-start  border shadow-lg border-gray-200 rounded-lg p-4 h-28">
                    <h3 class="text-gray-800 font-bold text-sm  ">{{ item }}</h3>
                    <div class="flex-auto w-full py-1">
                        <div class="relative w-full">

                            <!-- Time Input -->
                            <Field :name="`times[${index}]`" v-slot="{ errorMessage, field }">
                                <input v-bind="field" type="time" :id="'time-' + index"
                                    class="w-[100%] py-2 pl-10 pr-4 border border-blue-500 rounded-lg outline-none focus:ring-blue-500"
                                    v-model="timeValues[index]" />
                                <span v-if="errorMessage"
                                    class="error-message text-red-2 font-semibold text-sm flex flex-col justify-center items-center">
                                    {{ errorMessage }}
                                </span>
                            </Field>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Confirmation Button -->
            <div class="flex justify-center mt-6">
                <ButtonAuth type="submit" :loading="loading" class="!w-[40%]" :label="t('pages.auth.of_course')" />
            </div>
        </div>
    </form>
</template>

<script setup>
import { ref } from "vue";
const { t, locale } = useI18n();
import * as yup from 'yup';
import { Field, useForm } from 'vee-validate';

const loading = ref(false);
const { selectedDates } = storeToRefs(useDatesStore());

const { createVisits } = useOrderPackageStore();
const { order_id } = storeToRefs(useOrderPackageStore());



const isRtl = computed(() => locale.value === 'ar'); // assuming 'ar' is the code for Arabic

const validationSchema = yup.object({
    times: yup.array()
        .of(
            yup.string()
                .required(t('validation.required'))
                .matches(
                    /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/,
                    t('validation.invalid_time')
                )
        )
        .min(1, t('validation.at_least_one_time_required')), // التحقق من وجود وقت واحد على الأقل
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});

// Wrapping the submit logic
const submit = handleSubmit(async () => {
    loading.value = true;

    const payload = {
        order_id: order_id.value,
        visits: selectedDates.value.map((date, index) => ({
            date: date,
            time: timeValues.value[index],
        })),
    };

    await createVisits(payload);

    
    loading.value = false
});




// Array to store each time value
const timeValues = ref(Array(selectedDates.value.length).fill("")); // Create an array of empty strings



</script>

<style scoped>
/* تحسين التصميم وضمان استجابة أفضل */
.bg-gray-100 {
    min-height: 100vh;
    /* التأكد من أن الخلفية تغطي كامل الشاشة */
}

input[type="time" i]::-webkit-calendar-picker-indicator {
    background-image: url(@/assets/img/clock.svg) !important;
}

@media (max-width: 640px) {

    /* تحسين استجابة الشبكة على الشاشات الصغيرة */
    .grid {
        grid-template-columns: 1fr;
        /* عمود واحد للشاشات الصغيرة */
    }
}
</style>
