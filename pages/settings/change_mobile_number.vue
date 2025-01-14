<template>
    <HomeTitle title="pages.change_mobile_number_sa" class="my-3 " />
    <form @submit.prevent="otpSendCode" class="max-w-2xl w-full shadow-lg p-4 gap-4 space-y-5 mx-auto">

        <div>
            <h2 class="text-lg font-bold">{{ t("pages.auth.code_verification") }}</h2>
        </div>

        <div class="border-t border-gray-300 my-4"></div>

        <div class="card flex justify-center">
            <Image :src="img_otp" alt="Image" width="250" />
        </div>
        <p class="text-center  text-gray-400  font-bold ">
            {{ t("pages.auth.Please_enter_the_verification_code") }}
        </p>

        <div class="card flex-col flex justify- items-center mx-auto !gap-5">
            <Field v-model="otpInput" name="otp" type="text" v-slot="{ errorMessage, field }">
                <InputOtp v-model="otpInput" type="number" integerOnly class="focus:ring-2 focus:!ring-cyan-500"
                    dir="ltr" />
                <span v-if="errorMessage"
                    class="error-message text-red-2 text-sm flex flex-col justify-center items-center">{{ errorMessage
                    }}</span>
            </Field>
        </div>


        <div class="timer">
            <div class="flex items-center justify-center text-gray-700">
                <p class="text-base px-2 text-gray-400 font-bold">{{ t("pages.auth.remaining_time") }}</p>
                <p v-if="timerActive" class="text-primary-1 text-base font-bold">{{ formattedTime }}</p>
                <p v-else class="text-gray-400 text-base font-bold">00:00</p>
            </div>
        </div>

        <button @click="resendToCode()" :loading="loading" :disabled="loading"
            class="text-center mx-auto flex justify-center items-center cursor-pointer" type="button">
            <p v-if="!loading" class="text-primary-1 hover:underline transition duration-200">
                {{ t("pages.auth.resend_code") }}
            </p>
            <p v-else class="text-primary-1 transition duration-200">{{ t("pages.loading_send") }}
            </p>
        </button>
        <!-- Button -->
        <div class="md:w-[50%]  md:px-0 mx-auto my-5 px-2">
            <ButtonAuth @click="otpCheck()" :loading="submitLoading" type="submit" :label="t('pages.auth.of_course')" />
        </div>
    </form>

</template>

<script setup>
// Import dependencies
import img_otp from "@/assets/img/otp.png";
import * as yup from "yup";
import { Field, useForm } from "vee-validate";

// Store
const { t } = useI18n();
const { resendCode, checkOtp } = usePhoneStore();
const { otpInput } = storeToRefs(usePhoneStore());
const { phone } = storeToRefs(useLoginStore());
const { country } = storeToRefs(useCountries());

// State
const loading = ref(false);
const timeLeft = ref(60); // Timer starts at 60 seconds
const formattedTime = ref("01:00");
const timerActive = ref(true); // Indicates if the timer is active

// Functions
const resendToCode = async () => {
    loading.value = true;
    const payload = {
        phone: phone.value,
        country_code: country.value.key,
        iso: country.value.iso,
    };
    await resendCode(payload);
    // Restart timer when the code is resent
    timeLeft.value = 60;
    timerActive.value = true;
    loading.value = false;
};

const submitLoading = ref(false);

// Validation schema
const validationSchema = yup.object({
    otp: yup
        .string()
        .required(t("validation.required"))
        .matches(/^[0-9]+$/, t("validation.only_digits"))
        .min(4, t("validation.min", { min: 4 }))
        .max(4, t("validation.max", { max: 4 })),
});

const { handleSubmit } = useForm({
    validationSchema,
});

const otpCheck = handleSubmit(async () => {
    submitLoading.value = true;
    await checkOtp({
        code: otpInput.value,
    });

    submitLoading.value = false;
});

// Timer logic
const updateTimer = () => {
    if (timeLeft.value > 0) {
        timeLeft.value--;
        const minutes = Math.floor(timeLeft.value / 60);
        const seconds = timeLeft.value % 60;
        formattedTime.value = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    } else {
        timerActive.value = false; // Stop the timer
    }
};

let timerInterval;

onMounted(() => {
    timerInterval = setInterval(updateTimer, 1000);
});

onBeforeUnmount(() => {
    clearInterval(timerInterval);
});
</script>



<style scoped>
.p-inputotp {
    gap: 2rem !important;
}

.p-inputtext:enabled:focus {
    border-color: rgb(7, 8, 8) !important;
}
</style>
