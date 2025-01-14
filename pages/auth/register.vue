<template>
    <div class="max-w-2xl w-full p-4 gap-4 space-y-5 mx-auto">
        <div class="flex flex-col justify-center gap-1 items-center">
            <h1 class="text-xl font-bold">{{ t("pages.auth.register") }}</h1>
            <p class=" text-gray-400 text-sm font-bold">{{ t("pages.auth.please_enter") }}</p>
        </div>

        <form @submit="submitRegister" class="shadow-xl w-full max-w-2xl mx-auto space-y-5 py-8 gap-4">
            <div class="card flex justify-center">
                <div class="md:w-[80%] w-[100%] md:px-0 px-2">
                    <!-- Name Field -->
                    <div class="relative w-full">
                        <InputForm v-model="name" name="name" :label="t('pages.auth.full_name')" type="text"
                            :placeholder="t('pages.auth.placeholders.full_name')" />
                    </div>

                    <!--NumberPhone-->

                    <div class="relative w-full">
                        <InputForm name="phone" v-model="phone" :label="t('pages.auth.call_number')" type="number"
                            :placeholder="t('pages.auth.call_number_placeholder')">
                            <template #endIcon>
                                <div class="flex items-center gap-2 relative">
                                    <!-- Customized Select Dropdown -->
                                    <Select v-model="country" :options="list_countries" optionLabel="key"
                                        :placeholder="$t('inputs.country_code.placeholder')"
                                        class="!border-none appearance-none bg-transparent text-gray-700 text-sm focus:outline-none cursor-pointer">
                                        <!-- Selected Value Display -->
                                        <template #value="slotProps">
                                            <div v-if="slotProps.value" class="flex items-center">
                                                <img :alt="slotProps.value.label" :src="slotProps.value.image"
                                                    class="mr-2"
                                                    style="width: 25px; height: 15px; object-fit: cover; border-radius: 3px" />
                                                <span class="text-gray-700">{{ `+${slotProps.value.key}` }}</span>
                                            </div>
                                            <span v-else class="text-gray-400">{{ slotProps.placeholder }}</span>
                                        </template>

                                        <!-- Dropdown Option Display -->
                                        <template #option="slotProps">
                                            <div
                                                class="flex items-center py-1 px-2 hover:bg-gray-100 rounded transition duration-200">
                                                <img :alt="slotProps.option.label" :src="slotProps.option.image"
                                                    class="mr-2"
                                                    style="width: 18px; height: 12px; object-fit: cover; border-radius: 3px" />
                                                <span class="text-gray-700">{{ `+${slotProps.option.key}` }}</span>
                                            </div>
                                        </template>
                                    </Select>

                                </div>
                            </template>
                        </InputForm>
                    </div>


                    <!-- Email Field -->
                    <div class="relative w-full">
                        <InputForm v-model="email" name="email" type="email" :label="t('pages.auth.email')"
                            :placeholder="t('inputs.email.placeholder')" />
                    </div>

                    <!--Name friend Company-->
                    <div class="relative w-full">
                        <InputForm v-model="bank_account_name" name="friend"
                            :label="t('pages.auth.Name_of_the_account_holder')" type="text"
                            :placeholder="t('pages.auth.placeholders.Name_of_the_account_holder')" />
                    </div>
                    <!-- Name Bank -->
                    <div class="relative w-full">
                        <InputForm v-model="bank_name" name="nameBank" :label="t('pages.auth.name_bank')" type="text"
                            :placeholder="t('pages.auth.placeholders.name_bank')" />

                    </div>
                    <!-- Number  Ipn-->
                    <div class="relative w-full">
                        <InputForm v-model="iban" name="ibn" :label="t('pages.auth.iban')"
                            :placeholder="t('pages.auth.placeholders.iban')" />

                    </div>
                    <!-- Number Account Bank-->
                    <div class="relative w-full">
                        <InputForm v-model="bank_account_number" name="bankAccountNumber"
                            :label="t('pages.auth.bank_account_number')" type="number"
                            :placeholder="t('pages.auth.placeholders.bank_account_number')" />

                    </div>
                    <div class="mt-4">
                        <p class=" font-bold md:text-base text-sm mx-1 ">
                            {{ t("pages.auth.available") }}

                        </p>
                    </div>

                    <div class="flex items-center space-y-4">
                        <!-- Profile Picture Upload -->
                        <div class="flex items-center my-4  ">
                            <div class=" flex  ">
                                <div class="relative">
                                    <Avatar :image="uploadedImage || defaultImage"
                                        class="  rounded-full border bg-transparent relative border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80  "
                                        size="xlarge" shape="circle" />

                                    <button v-if="!uploadedImage" type="button" @click="triggerFileInput"
                                        class="absolute inset-0  transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-in-out hover:scale-125 text-primary-2 cursor-pointer animate-bounce">
                                        <i
                                            class="pi pi-upload text-xl text-primary-1 flex justify-center items-center"></i>
                                    </button>
                                </div>

                                <!-- Placeholder Text -->
                                <p v-if="!uploadedImage" class="text-sm text-gray-400 px-2 mt-5">
                                    {{ t("pages.auth.upload") }}
                                </p>

                                <!-- Upload Button on Image -->

                            </div>

                            <!-- Delete Button -->
                            <button class="text-gray-500 hover:text-red-700" type="button" @click="removeImage">
                                <i class="pi pi-times text-xl"></i>
                            </button>
                            <input type="file" accept="image/*" @change="onFileChange" class="hidden" ref="fileInput" />
                        </div>
                    </div>
                    <!-- Submit Button -->
                    <div class="my-8">
                        <ButtonAuth type="submit" :loading="loading" :disabled="loading"
                            :label="t('pages.auth.login_register')" />
                    </div>

                    <div class="text-center  mt-3 flex justify-center items-center">
                        <p class="md:text-base text-sm">
                            {{ t("pages.auth.have_an_account") }}
                        </p>

                        <NuxtLink :to="useLocaleRoute()({ name: 'auth-login' })"
                            class="text-center flex justify-center items-center cursor-pointer">
                            <p class="text-primary-1 hover:underline transition duration-200 mx-2  md:text-base
                                text-sm">
                                {{ t("pages.auth.login") }} </p>
                        </NuxtLink>
                    </div>

                </div>
            </div>
        </form>
    </div>
</template>

<script setup>

import * as yup from 'yup';
import defaultImage from "@/assets/img/default-avatar.jpg";
const { loading, name, lang, email, bank_account_number, bank_name, uploadedImage, bank_account_name, phone, country_code, iban } = storeToRefs(useLoginStore());

const { register } = useLoginStore();
const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();

// Importing useI18n for translations
const { t } = useI18n();
const imageEmpty = ref(false);
const fileInput = ref(null);

// Define a combined validation schema for the form
const validationSchema = yup.object({
    email: yup.string().required(t('validation.required')).email(t('validation.email')),
    name: yup.string().required(t('validation.required')),
    phone: yup.string()
        .matches(/^[0-9]+$/, t('validation.only_digits'))  // Ensures only digits
        .min(9, t('validation.min', { min: 9 }))   // Minimum length of 9 digits
        .max(10, t('validation.max', { max: 10 })) // Maximum length of 10 digits
        .required(t('validation.required')),  // Phone number is required
    friend: yup.string().required(t('validation.required')),
    ibn: yup.string().required(t('validation.required')).matches(
        /^[A-Z]{2}[0-9]{2}[A-Z0-9]{1,30}$/,
        t('validation.invalid_iban') // رسالة الخطأ إذا كان IBAN غير صحيح
    ),



    nameBank: yup.string().required(t('validation.required')),
    bankAccountNumber: yup.string()
        .min(9, t('validation.min', { min: 9 }))   // Minimum length of 9 digits
        .max(18, t('validation.max', { max: 18 })) // Maximum length of 10 digits
        .matches(/^[0-9]+$/, t('validation.only_digits'))  // Ensures only digits
        .required(t('validation.required')),  // Bank account number is required
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});

definePageMeta({ layout: "auth" });

// Wrapping the submit logic
const submitRegister = handleSubmit(async () => {
    loading.value = true;
    const payload = {
        avatar: fileInput.value.files[0],
        name: name.value,
        country_code: country_code.value,
        phone: phone.value,
        email: email.value,
        bank_account_number: bank_account_number.value,
        bank_name: bank_name.value,
        bank_account_name: bank_account_name.value,
        lang: lang.value,
        iban: iban.value || undefined, // Optional field
        iso: country.value.iso,

    };

    await register(payload);
    loading.value = false;
    resetFormFields();


});


const resetFormFields = () => {
    name.value = '';
    email.value = '';
    phone.value = '';
    bank_account_number.value = '';
    bank_name.value = '';
    bank_account_name.value = '';
    iban.value = '';
    country.value.key = '';
    country.value.iso = '';
    uploadedImage.value = null;  // Clear uploaded image preview
    if (fileInput.value) {
        fileInput.value.value = '';  // Clear the file input
    }
};




onMounted(() => {
    getCountries();
});


const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
        uploadedImage.value = URL.createObjectURL(file);
    }
};

const triggerFileInput = () => {
    document.querySelector('input[type="file"]').click();
};

const removeImage = () => {
    uploadedImage.value = null;
};

</script>

<style scoped>
.pi {
    font-size: 1.25rem;
}

.cursor-pointer {
    cursor: pointer;
}

/* Adding the bounce animation */
@keyframes bounce {

    0%,
    20%,
    50%,
    80%,
    100% {
        transform: translateY(0);
    }

    40% {
        transform: translateY(-10px);
    }

    60% {
        transform: translateY(-5px);
    }
}

.animate-bounce {
    animation: bounce 1s infinite;
}
</style>
