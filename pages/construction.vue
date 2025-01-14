<template>

    <form @submit.prevent="submitConstruction" class="max-w-2xl w-full p-4 gap-4 space-y-5 mx-auto">
        <div class="flex flex-col justify-center gap-1 items-center">
            <h1 class="text-xl font-bold">{{ t("pages.construction") }} </h1>
            <p class=" text-gray-400 text-sm font-bold">{{ t("pages.Enter_the_following_data") }} </p>
        </div>

        <div class="shadow-xl w-fu ll max-w-2xl mx-auto space-y-5 py-8 gap-4">
            <div class="card flex justify-center">
                <div class="md:w-[80%] w-[100%] md:px-0 px-2">


                    <div class="relative w-full">
                        <InputForm name="length" v-model="length" :label="t('pages.length')" type="text"
                            :placeholder="t('pages.from_length')" />
                    </div>
                    <div class="relative w-full">
                        <InputForm :label="t('pages.auth.width')" name="width" v-model="width" type="text"
                            :placeholder="t('pages.auth.Please_enter_width')" />

                    </div>
                    <div class="relative w-full">
                        <InputForm name="height" v-model="height" :label="t('pages.auth.Height')" type="name"
                            :placeholder="t('pages.auth.Please_enter_Height')" />

                    </div>


                    <div class="relative w-full">
                        <InputForm name="map" v-model="sendedAddress" readonly :label="t('pages.auth.the_site')"
                            type="text" :placeholder="t('pages.auth.placeholder_the_site')"
                            class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2" @click="openModal">
                            <template #endIcon>
                                <div class="flex items-center ps-3 ">
                                    <img src="@/assets/img/map.svg" class="h-5 w-5 text-gray-500 float-right"
                                        style="transform: scaleX(-1)" alt="Map icon" />
                                </div>
                            </template>

                        </InputForm>

                    </div>

                    <Dialog v-model:visible="visible" :style="{ width: '25rem' }">
                        <div>
                            <OnlineStoreMapComp @getLocation="getMyLoc" :currentLocation="true" />
                        </div>
                        <Button type="button" label="Cancel" severity="secondary" class="w-full mt-5 rounded-3xl"
                            @click="visible = false"></Button>
                    </Dialog>


                    <!--Date-->
                    <div class="relative w-full my-4 space-y-2">
                        <label for="on_label" class="font-bold ">{{ t("pages.auth.service_history")
                            }}</label>
                        <Field v-model="date" name="date" v-slot="{ errorMessage }">
                            <div class="relative w-full">
                                <DatePicker class="w-full py-2 pl-10 pr-4 " name="date" v-model="date"
                                    :placeholder="t('pages.auth.placeholders.specify_date')" />

                                <!-- Icon positioned with fixed alignment -->
                                <div class="absolute inset-y-0 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none"
                                    :class="isRtl ? 'left-3' : 'right-3'">
                                    <img src="@/assets/img/data.svg" class="h-5 w-5 text-gray-500" alt="Flag icon" />
                                </div>
                            </div>

                            <!-- Error message display below input -->
                            <span v-if="errorMessage"
                                class="error-message text-red-500 text-sm flex justify-start items-start mt-1 mx-2">
                                {{ errorMessage }}
                            </span>
                        </Field>
                    </div>
                    <div class="relative w-full">
                        <InputForm name="details" v-model="details" :label="t('pages.details')" type="text"
                            :placeholder="t('pages.details_plase')" />
                    </div>
                    <div class="relative w-full">
                        <InputForm name="time" v-model="time" :label="t('pages.auth.Service_time')"
                            :placeholder="t('pages.auth.placeholders.specify_time')"
                            class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2">
                            <template #endIcon>
                                <div class="flex items-center ps-3 ">
                                    <img src="@/assets/img/clock.svg" class="h-5 w-5 text-gray-500 float-right"
                                        style="transform: scaleX(-1)" alt="Map icon" />
                                </div>
                            </template>

                        </InputForm>

                    </div>

                    <div class="relative w-full mt-4">
                        <h2 class="font-bold my-2 px-1 md:text-base text-sm">
                            {{ t('pages.image_of_design') }}
                        </h2>
                        <Field v-model="selectedColor" name="image" type="text" v-slot="{ errorMessage }">
                            <Select v-model="selectedColor" @change="changeColor(selectedColor)" :options="list_color"
                                optionLabel="color" :placeholder="t('pages.select_color')" name="color" optionValue="id"
                                class="w-full" />
                            <!-- Error Message -->
                            <span v-if="errorMessage" class="error-message text-red-500 mt-2 block">
                                {{ errorMessage }}
                            </span>
                        </Field>
                    </div>
                    <div
                        class="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                        <div v-for="item in list_images" :key="item.id">
                            <img :src="item.image" class="w-40 h-40 object-cover rounded-md" alt="Selected Image" />
                        </div>
                    </div>
                    <div class="my-8">
                        <ButtonAuth type="submit" :loading="submitLoading" :label="t('pages.send_request')" />

                    </div>

                </div>
            </div>

        </div>
    </form>

</template>

<script setup>


definePageMeta({
    requiresAuth: true
})
import * as yup from 'yup';
import { Field, useForm } from 'vee-validate';
const selectedColor = ref('');
const { list_color, list_images } = storeToRefs(useBoolConstructionStore());
const { getDesignImages, getDesignDetails, createConstruction } = useBoolConstructionStore();
const { t, locale } = useI18n();
const length = ref('');
const width = ref('');
const height = ref('');
const time = ref('');
const date = ref('');
const details = ref('');
const submitLoading = ref(false);

const isRtl = computed(() => locale.value === 'ar'); // assuming 'ar' is the code for Arabic


const changeColor = (selectedColor) => {
    getDesignDetails(selectedColor);
};


const visible = ref(false);
// methods
function openModal() {
    visible.value = true;
}
onMounted(() => {

    getDesignImages();


})
const sendedLat = ref(null);
const sendedLng = ref(null);
const sendedAddress = ref("");
// get lat, lng, address from change marker position
const getMyLoc = (lat, lng, address) => {
    sendedLat.value = lat;
    sendedLng.value = lng;
    sendedAddress.value = address;
    visible.value = false;
};

defineExpose({
    sendedLat,
    sendedLng,
})

const validationSchema = yup.object({

    length: yup.string().required(t('validation.required')),
    time: yup
        .string()
        .required(t('validation.required'))
        .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, t('validation.invalid_time')), // Add time validation here
    width: yup.string().required(t('validation.required')),
    map: yup.string().required(t('validation.required')),
    height: yup.string().required(t('validation.required')),
    date: yup.string().required(t('validation.required')),
    details: yup.string().required(t('validation.required')),
    image: yup.string().required(t('validation.required')),


});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});



// Wrapping the submit logic
const submitConstruction = handleSubmit(async () => {

    submitLoading.value = true;
    await createConstruction({

        length: length.value,
        time: time.value,
        width: width.value,
        height: height.value,
        lat: sendedLat.value,
        lng: sendedLng.value,
        map_desc: sendedAddress.value,
        date: date.value,
        design_images_id: selectedColor.value,
        details: details.value


    });
    submitLoading.value = false;


});
















</script>