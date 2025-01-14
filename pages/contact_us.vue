<template>

    <form @submit.prevent="submitContactUs" class="max-w-2xl w-full p-4 gap-4 space-y-5 mx-auto">
        <div class="flex flex-col justify-center gap-1 items-center">
            <h1 class="text-xl font-bold">{{ t("pages.contact_us") }} </h1>
            <p class=" text-gray-400 text-sm font-bold">{{ t("pages.Enter_the_following_data") }} </p>
        </div>

        <div class="shadow-xl w-full max-w-2xl mx-auto space-y-5 py-8 gap-4">
            <div class="card flex justify-center">
                <div class="md:w-[80%] w-[100%] md:px-0 px-2">
                    <!--name-->

                    <div class="relative w-full">
                        <InputForm v-model="name" name="name" :label="t('pages.auth.full_name')" type="text"
                            :placeholder="t('pages.auth.placeholders.full_name')" />
                    </div>

                    <!--NumberPhone-->
                    <div class="relative w-full">
                        <div class="relative w-full">
                            <InputForm name="phone" v-model="phone" :label="t('pages.auth.call_number')" type="number"
                                :placeholder="t('pages.auth.call_number_placeholder')">
                                <template #endIcon>

                                    <div class="flex items-center gap-2 relative">
                                        <!-- Customized Select Dropdown -->
                                        <Select v-model="country" :options="list_countries" optionLabel="key"
                                            :placeholder="$t('inputs.country_code.placeholder')"
                                            class="!border-none text-xs appearance-none bg-transparent text-gray-700   focus:outline-none cursor-pointer">
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
                    </div>


                    <div class="w-full col-span-12  md:col-span-6 lg:col-span-6 xl:col-span-6 ">

                        <p for="on_label" class="py-2 font-bold"> {{ t("pages.massage") }}
                        </p>

                        <Field v-model="message" name="message" type="text" v-slot="{ errorMessage }">


                            <Textarea id="over_label" :placeholder="t('pages.enter_massage')"
                                class="!rounded-3xl w-full" v-model="message" name="message" rows="5"
                                style="resize: none; ::placeholder { color: #a3a3a3; font-size: 1rem; }" />

                            <span v-if="errorMessage"
                                class="error-message font-bold text-red-2 text-sm flex flex-col justify-center items-center">{{
                                    errorMessage
                                }}</span>

                        </Field>
                    </div>

                    <!-- Button -->
                    <div class="my-8">
                        <ButtonAuth type="submit" :loading="loading" :label="t('pages.send')" />

                    </div>

                    <div class="space-y-2">
                        <!-- Contact Technical Support -->
                        <p class="text-gray-400 text-center text-sm font-bold">
                            {{ t("pages.contact_technical_support") }}
                        </p>
                        <div class="text-center flex gap-2 justify-center items-center">
                            <div v-if="loading_social === true" class="skeleton w-48 h-6"></div>
                            <p v-else>{{ contact_info }}</p>
                        </div>

                        <!-- Or Contact -->
                        <p class="text-gray-400 text-center text-sm font-bold">
                            {{ t("pages.or_contact") }}
                        </p>
                        <div class="text-center flex gap-2 justify-center items-center">
                            <div v-if="loading_social === true" class="flex gap-2">
                                <!-- Skeleton placeholders for socials -->
                                <div class="skeleton h-5 w-5"></div>
                                <div class="skeleton h-5 w-5"></div>
                                <div class="skeleton h-5 w-5"></div>
                            </div>
                            <template v-else>
                                <NuxtLink v-for="i in socials" :key="i.id" :to="i.link">
                                    <img :src="i.icon" class="h-5 w-5 text-gray-500" alt="Flag icon" />
                                </NuxtLink>
                            </template>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </form>
</template>

<script setup>

// imports
import * as yup from 'yup';
import { Field, useForm } from 'vee-validate';

//state
const loading_social = ref(false);
const loading = ref(false);


//store
const { name, message, phone, socials, contact_info } = storeToRefs(useContactUsStore());
const { contactUs, getContactUs } = useContactUsStore();
const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();



// Importing useI18n for translations
const { t } = useI18n();



// Define a combined validation schema for the form
const validationSchema = yup.object({
    name: yup.string().required(t('validation.required')),
    phone: yup.string().required(t('validation.required'))  // Phone number is required
        .matches(/^[0-9]+$/, t('validation.only_digits'))  // Ensures only digits
        .min(9, t('validation.min', { min: 9 }))   // Minimum length of 9 digits
        .max(10, t('validation.max', { max: 10 })),// Maximum length of 10 digits

    message: yup.string().required(t('validation.required')),

});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});



// Wrapping the submit logic
const submitContactUs = handleSubmit(async () => {

    loading.value = true;

    const payload = {

        name: name.value,
        phone: phone.value,
        message: message.value,
        country_code: country.value.key,
        iso: country.value.iso,

    };

    await contactUs(payload);

    loading.value = false;

    resetFormFields();


});

onMounted(async () => {
    try {
        loading_social.value = true;

        await getCountries();
        await getContactUs();
    } catch (error) {
        console.error('Error during onMounted:', error);
    } finally {
        loading_social.value = false;
    }
});


const resetFormFields = () => {
    name.value = '';
    message.value = '';
    phone.value = '';
    country.value.key = '';
    country.value.iso = '';

};



</script>


<style scoped>
.pi {
    font-size: 1.25rem;
    /* Adjust font size of PrimeIcons */
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

textarea::placeholder {
    color: #a1a1a1;
    /* لون أفتح */
    font-size: 0.9rem;
    /* حجم النص placeholder */
    opacity: 1;
    /* تأكد من أن النص واضح */
}

.loader {
    border: 2px solid #f3f3f3;
    /* لون خفيف */
    border-top: 2px solid #3498db;
    /* لون رئيسي */
    border-radius: 50%;
    width: 16px;
    height: 16px;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

.skeleton {
    background: linear-gradient(90deg,
            #e0e0e0 25%,
            #f8f8f8 50%,
            #e0e0e0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 4px;
}

@keyframes shimmer {
    0% {
        background-position: -200% 0;
    }

    100% {
        background-position: 200% 0;
    }
}
</style>