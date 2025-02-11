<template>
  <Nav :title="t('pages.auth.login')" />

  <div class="!md:container">
    <form
      @submit.prevent="otpLogin"
      class="max-w-xl flex flex-col !bg-white justify-center relative items-center w-full rounded-lg shadow-lg p-4 md:!h-[350px] h-full !mt-28 gap-3 z-10 space-y-4 sm:mx-auto"
    >
      <p class="text-center text-lg font-bold">
        {{ t("pages.verification_code") }}
      </p>

      <p class="text-center text-sm font-bold">
        {{ t("pages.please_enter_verification") }} {{ useCookie("phone") }}
        {{ useCookie("country_code") }}
      </p>

      <div class="card flex-col flex justify- items-center mx-auto">
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
            class="error-message text-red-2 pt-3 font-bold text-sm flex flex-col justify-center items-center"
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
        @click="resendOtp()"
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

      <div class="sm:w-[50%] w-full md:px-0 mx-auto px-2">
        <ButtonAuth
          :imageSrc="'/arrow.png'"
          :loading="submitLoading"
          :label="t('pages.verify')"
          :disabled="submitLoading"
          type="submit"
        />
      </div>
    </form>
  </div>
  <!-- Background Image -->
  <img
    :src="illustration"
    class="w-full h-auto object-cover bottom-0 fixed z-0"
    alt="Login Illustration"
  />
</template>

<script setup>
// imports
import illustration from "../../public/img/Illustration.png";
import * as yup from "yup";
import { Field, useForm } from "vee-validate";

// state
const otpInput = ref("");
const loading = ref(false);
const { t } = useI18n();
const loginStore = useLoginStore();
const { sendOtp } = loginStore;
const { country_code, device_type, timerActive } = storeToRefs(useLoginStore());

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
    phone: useCookie("phone").value,
    country_code: useCookie("country_code").value,
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

const payload = {
  phone: useCookie("phone").value,
  country_code: useCookie("country_code").value,
};
const resendOtp = async () => {
  await fetchData({
    url: `api/provider/resend-code`,
    method: "post",
    body: payload,
    getSuccess: true,
    onSuccess: () => {
      timerActive.value = true;
    },
  });
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
