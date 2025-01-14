<template>
    <div class="grid grid-cols-12 max-w-7xl container px-5">
        <form @submit.prevent="submitLogin" class="sm:col-span-7 col-span-12 text-start space-y-10">
            <div>
                <h1 class="md:text-3xl text-base font-bold">{{ t("pages.auth.login") }}</h1>
                <h1 class="font-semibold my-1 md:text-sm text-xs text-gray-300">{{ t("pages.auth.hint") }}</h1>
            </div>

            <div class="md:w-[80%] w-full md:px-0 px-2">
                <div class="relative w-full">
                    <!-- Input Form -->
                    <InputForm name="phone" :loading="loading" v-model="phone" :label="t('pages.auth.call_number')"
                        type="number" :placeholder="t('pages.auth.call_number_placeholder')" class="w-full">
                        <!-- End Icon Template -->
                        <template #endIcon>
                            <div class="flex items-center gap-2 relative">
                                <!-- Customized Select Dropdown -->
                                <div>

                                    <!-- Select Component -->
                                    <Select v-model="country" :options="list_countries" optionLabel="key"
                                        :placeholder="$t('inputs.country_code.placeholder')"
                                        class="!border-none text-xs appearance-none bg-transparent text-gray-700 focus:outline-none cursor-pointer">
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
                            </div>
                        </template>
                    </InputForm>
                </div>
            </div>

            <div class="md:w-[80%] w-![100%] md:px-0 px-2">
                <ButtonAuth :loading="loading" type="submit" :label="t('pages.auth.login')" :disabled="loading" />
            </div>


            <div class="md:w-[80%] w-[100%] md:px-0 px-2">
                <Nuxt-link :to="localeRoute({ name: 'index' })"
                    class="text-center flex justify-center items-center cursor-pointer">
                    <p class="text-primary-1 hover:underline transition duration-200">{{ t("pages.auth.login_as_guest")
                        }}</p>
                </Nuxt-link>
                <div class="text-center mt-3 mb-2 md:text-base text-xs flex justify-center items-center">
                    <p>{{ t("pages.auth.have_an_account") }}</p>
                    <NuxtLink :to="localeRoute({ name: 'auth-register' })"
                        class="text-center flex justify-center items-center cursor-pointer">
                        <p class="text-primary-1 hover:underline md:text-base text-xs  transition duration-200 mx-2">
                            {{
                                t("pages.auth.create_a_new_account") }}</p>
                    </NuxtLink>
                </div>
            </div>
        </form>

        <div class="sm:col-span-5 md:mt-0 mt-2 col-span-12">
            <img src="~/assets/img/img_login.png" class="mx-auto justify-center items-center flex"
                alt="Login Illustration" />
        </div>

    </div>
</template>

<script setup>
const localeRoute = useLocaleRoute();
const { loading, phone } = storeToRefs(useLoginStore());
const { list_countries, country } = storeToRefs(useCountries());
const { getCountries } = useCountries();

const { t } = useI18n();
import * as yup from 'yup';
const { sendLogin } = useLoginStore();

const validationSchema = yup.object({
    phone: yup.string()
        .matches(/^[0-9]+$/, t('validation.only_digits'))
        .min(9, t('validation.min', { min: 9 }))
        .max(10, t('validation.max', { max: 10 }))
        .required(t('validation.required')),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});

//hooks
onMounted(async () => {
    try {
        await getCountries(); // Wait until getCountries() completes
    } catch (error) {
        console.error("Error fetching countries:", error);
    } finally {
    }
});

// Wrapping the submit logic
const submitLogin = handleSubmit(() => {
    loading.value = true;

    sendLogin({
        phone: phone.value,
        country_code: country.value.key,
        iso: country.value.iso,

    });
    loading.value = false;

});






definePageMeta({ layout: "auth" });
</script>