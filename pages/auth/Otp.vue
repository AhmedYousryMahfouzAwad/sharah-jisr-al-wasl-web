<template>
  <form
    @submit.prevent="otpLogin"
    class="max-w-2xl w-full shadow-lg p-4 mt-10 gap-4 space-y-5 sm:mx-auto mx-3"
  >
    <p class="text-center text-lg font-bold">
      {{ t("pages.verification_code") }}
    </p>

    <p class="text-center text-sm font-bold">
      {{ t("pages.please_enter_verification") }} {{ phone }} +{{ country_code }}
    </p>

    <div class="card flex-col flex justify- items-center mx-auto !gap-5">
      <Field
        v-model="otpInput"
        name="otp"
        type="text"
        v-slot="{ errorMessage, field }"
      >
        <InputOtp
          v-model="otpInput"
          type="number"
          integerOnly
          class="focus:ring-2 focus:!ring-cyan-500"
          dir="ltr"
        />
        <span
          v-if="errorMessage"
          class="error-message text-red-2 text-sm flex flex-col justify-center items-center"
          >{{ errorMessage }}</span
        >
      </Field>
    </div>

    <div v-if="timerActive" class="flex justify-center items-center">
      <p class="text-gray-400 font-bold text-center text-sm">
        {{ t("pages.the_remaining_time") }}
      </p>

      <Countdown
        v-if="timerActive"
        :time="59999"
        v-slot="{ minutes, seconds }"
        dir="ltr"
        @end="onCountdownEnd"
        class="text-sm !text-primary-1 px-2 font-medium"
      >
        {{ minutes }}:{{ seconds }}
      </Countdown>

      <p v-else class="text-gray-400 font-bold text-center mt-1">00:00</p>
    </div>

    <button
      v-else
      @click="resendCode()"
      :disabled="loading"
      class="text-center mx-auto flex justify-center items-center cursor-pointer"
      type="button"
    >
      <p
        v-if="!loading"
        class="text-primary-1 hover:underline transition duration-200"
      >
        {{ t("pages.auth.resend_code") }}
      </p>
      <p v-else class="text-primary-1 transition duration-200">
        {{ t("pages.loading_send") }}
      </p>
    </button>

    <div class="md:w-[50%] md:px-0 mx-auto my-5 px-2">
      <ButtonAuth
        :loading="submitLoading"
        :label="t('pages.auth.of_course')"
        :disabled="submitLoading"
        type="submit"
      />
    </div>
  </form>
</template>

<script setup>
// imports
import img_otp from "@/assets/img/otp.png";
import * as yup from "yup";
import { Field, useForm } from "vee-validate";

// state
const loading = ref(false);
const { t } = useI18n();
const loginStore = useLoginStore();
const { sendOtp, resendOtp } = loginStore;
const { phone, otpInput, country_code, device_type, timerActive } = storeToRefs(
  useLoginStore()
);

const { setError } = useErrorStore();
const { country } = storeToRefs(useCountries());

const submitLoading = ref(false);

// Define validation schema
const validationSchema = yup.object({
  otp: yup
    .string()
    .required(t("validation.required"))
    .matches(/^[0-9]+$/, t("validation.only_digits"))
    .min(4, t("validation.min", { min: 4 }))
    .max(4, t("validation.max", { max: 4 })),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
  validationSchema,
});

// ========================= methods
const onCountdownEnd = async () => {
  timerActive.value = false;
};
// Wrapping the submit logic
const otpLogin = handleSubmit(async () => {
  submitLoading.value = true;
  await sendOtp({
    phone: phone.value,
    country_code: country.value.key,
    code: otpInput.value,
    device_type: device_type.value,
    device_id: 111,

    // Make the login request
  });
  submitLoading.value = false;
});

// on mounted
onMounted(async () => {
  timerActive.value = true;
});

const resendCode = async () => {
  loading.value = true;
  try {
    await resendOtp({
      phone: phone.value,
      country_code: country.value.key,
      iso: country.value.iso,
    });
  } catch (error) {
    const errorMessage = error?.response?.data?.message || error.message;
    if (
      errorMessage === "The Phone field is required" ||
      errorMessage === "الهاتف مطلوب"
    ) {
      setError(errorMessage);
      return navigateTo("/auth/login");
    }
    setError("An unexpected error occurred.");
  } finally {
    loading.value = false;
  }
};

definePageMeta({
  middleware: ["redirect-login"],
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
