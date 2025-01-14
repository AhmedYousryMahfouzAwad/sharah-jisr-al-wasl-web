<template>
    <HomeTitle title="pages.change_mobile_number_sa" class="my-3 " />

    <form @submit.prevent="phoneChange" class="max-w-2xl w-full p-4  gap-4 space-y-5 mx-auto">


        <div class="shadow-xl w-fu ll max-w-2xl mx-auto bg-white rounded-lg space-y-5 py-8 gap-4">
            <div class="card flex justify-center">



                <div class="md:w-[80%] w-[100%] md:px-0 px-2">



                    <!--NumberPhone-->
                    <div class="md:w-[80%] w-[100%] md:px-0 px-2 mx-auto">
                        <div class="relative w-full">
                            <InputForm name="phone" v-model="phone" :label="t('pages.new_mobile_number')" type="number"
                                :placeholder="t('pages.change_mobile_number_sa')">
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

                    <!-- dialog_animation-->
                    <BaseDialog v-model:visible="visible_animation" class="w-full max-w-xl mx-2">
                        <template #content>
                            <img :src="animation" alt="animation_image"
                                class="mx-auto justify-center items-center flex">
                            <span
                                class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                                {{ t('pages.congratulations_change_phone') }}
                            </span>


                        </template>
                    </BaseDialog>
                    <div class="my-8 flex justify-center">
                        <ButtonAuth :loading="loading" class="w-full sm:w-3/4 md:w-1/2 lg:w-1/2" type="submit"
                            :label="t('pages.auth.update')" />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>

// imports
import * as yup from 'yup';
import animation from "@/assets/img/animation.gif";


//store
const localeRoute = useLocaleRoute();
const { loading, phone } = storeToRefs(usePhoneStore());
const { changePhone } = usePhoneStore();
const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();
const { t } = useI18n();
const visible_animation = ref(false);

// Define a combined validation schema for the form
const validationSchema = yup.object({
    phone: yup.string()
        .matches(/^[0-9]+$/, t('validation.only_digits'))  // Ensures only digits
        .min(9, t('validation.min', { min: 9 }))   // Minimum length of 9 digits
        .max(10, t('validation.max', { max: 10 })) // Maximum length of 10 digits
        .required(t('validation.required')),  // Phone number is required
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});

onMounted(() => {
    getCountries();
});

// Wrapping the submit logic
const phoneChange = handleSubmit(() => {

    visible_animation.value = true;

    changePhone({
        phone: phone.value,
        country_code: country.value.key,
        iso: country.value.iso,
    });

    setTimeout(() => {
        visible_animation.value = false;
    }, 1500);




});

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
</style>