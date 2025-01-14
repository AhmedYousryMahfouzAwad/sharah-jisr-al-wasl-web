<template>

    <form @submit="submitInstant" class="max-w-2xl w-full p-4 gap-4 space-y-5 mx-auto">

        <div class="flex flex-col justify-center gap-1 items-center">
            <h1 class="text-xl font-bold">{{ t("pages.immediate_maintenance") }} </h1>
            <p class=" text-gray-400 text-sm font-bold">{{ t("pages.Enter_the_following_data") }} </p>
        </div>

        <div class="shadow-xl w-full bg-white rounded-lg max-w-2xl mx-auto space-y-5 py-8 gap-4">
            <div class="card flex justify-center">
                <div class="md:w-[80%] w-[100%] md:px-0 px-2">
                    <!--message-->

                    <div class="relative w-full">
                        <div class="w-full col-span-12 md:col-span-6 lg:col-span-6 xl:col-span-6  space-y-2">
                            <label class="font-bold"> {{ t("pages.auth.problem_description") }} </label>

                            <Field v-model="message" name="message" type="text" v-slot="{ errorMessage }">
                                <Textarea id="over_label" :placeholder="t('pages.auth.problem_description')"
                                    class="!rounded-3xl w-full" v-model="message" name="message" rows="5"
                                    style="resize: none; ::placeholder { color: #a3a3a3; font-size: 1rem; }" />
                                <span v-if="errorMessage"
                                    class="error-message text-red-2 font-bold text-sm flex flex-col justify-start items-start mx-2">{{
                                        errorMessage
                                    }}</span>
                            </Field>
                        </div>
                    </div>

                    <!--map-->
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
                                <!-- DatePicker with Tailwind for size and color -->
                                <DatePicker
                                    class="w-full py-2 pl-10 pr-4 text-base text-gray-700 placeholder:text-xs placeholder:!text-red-400 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary-2 focus:outline-none"
                                    name="date" v-model="date"
                                    :placeholder="t('pages.auth.placeholders.specify_date')" />

                                <!-- Icon positioned with fixed alignment -->
                                <div class="absolute inset-y-0 top-1/2 transform -translate-y-1/2 flex items-center pointer-events-none"
                                    :class="isRtl ? 'left-3' : 'right-3'">
                                    <img src="@/assets/img/data.svg" class="h-5 w-5 text-gray-400" alt="Date icon" />
                                </div>
                            </div>

                            <!-- Error message display below input -->
                            <span v-if="errorMessage"
                                class="text-red-2 font-bold text-sm flex justify-start items-start mt-1 mx-2">
                                {{ errorMessage }}
                            </span>
                        </Field>

                    </div>

                    <!--Time-->
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
                    <p class="font-bold my-2">
                        {{ t("pages.auth.spare_parts") }}
                    </p>

                    <div class="card flex flex-wrap justify-start gap-4">
                        <div v-for="item in list_spare_parts" :key="item.id" class="flex items-center gap-3">
                            <Checkbox v-model="selectedParts" :value="item.id" :inputId="'ingredient' + item.id"
                                class="mt-1" />
                            <label :for="'ingredient' + item.id" class="ml-2 text-xs font-bold"> {{ item.name }}
                            </label>
                        </div>
                    </div>

                    <div class="my-2">
                        <p class="font-bold ">
                            {{ t("pages.picture_problems") }}

                        </p>
                    </div>





                    <div class="flex flex-wrap gap-4 items-center my-4">
                        <!-- Multiple Image Uploads -->
                        <div v-for="(image, index) in uploadedImages" :key="index" class="relative flex">
                            <img :src="image" alt="Uploaded Image"
                                class="w-16 h-16 rounded-full border border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80" />
                            <!-- Delete Button -->
                            <button class=" text-red-2 absolute top-0 right-0" type="button"
                                @click="removeImage(index)">
                                <i class="pi pi-times text-xl"></i>
                            </button>


                        </div>
                        <span v-show="!uploadedImages.length" class="text-gray-400">{{ t("pages.please_problems")
                            }}</span>
                        <!-- Upload Button for Multiple Images -->
                        <button @click="triggerFileInput" type="button"
                            class="text-cyan-200 cursor-pointer animate-bounce">
                            <i class="pi pi-upload text-xl"></i>
                        </button>
                        <input type="file" accept="image/*" multiple @change="onFileChange" class="hidden"
                            ref="fileInput" />
                    </div>

                    <!-- Button -->
                    <div class="my-8">
                        <ButtonAuth type="submit" :loading="loading" :label="t('pages.send_request')" />
                    </div>

                </div>
            </div>
        </div>

    </form>
</template>

<script setup>
//Auth
definePageMeta({
    requiresAuth: true
})

//i18n
const { t, locale } = useI18n(); // Access `locale` directly from `useI18n`
//image
import img_login from "@/assets/img/jock.webp"

//validation
import { Field, useForm } from 'vee-validate';
import * as yup from 'yup';

//store
const { getSpareParts, createInstant } = useInstantStore();
const { list_spare_parts } = storeToRefs(useInstantStore());




//state
const selectedParts = ref([]);
const uploadedImage = ref("");
const date = ref();
const message = ref("");
const time = ref("");
const visible = ref(false);
const loading = ref(false);

//modal
function openModal() {
    visible.value = true;
}

const isRtl = computed(() => locale.value === 'ar'); // assuming 'ar' is the code for Arabic

//request
onMounted(() => {
    getSpareParts();
})

const validationSchema = yup.object({
    message: yup.string().required(t('validation.required')).min(10, t('validation.min', { min: 10 })),  // Minimum length of 9 digits,
    map: yup.string().required(t('validation.required')),
    date: yup
        .date()
        .required(t('validation.required'))
        .nullable(),
    time: yup
        .string()
        .required(t('validation.required'))
        .matches(/^([01]?[0-9]|2[0-3]):([0-5][0-9])$/, t('validation.invalid_time')),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
})

const submitInstant = handleSubmit(async () => {
    loading.value = true;

    const formData = new FormData();
    imageFiles.value.forEach((file, index) => {
        formData.append(`images[${index}]`, file); // إضافة الملفات الفعلية إلى FormData
    });
    formData.append('details', message.value);
    formData.append('map_desc', sendedAddress.value);
    formData.append('lng', sendedLng?.value);
    formData.append('lat', sendedLat?.value);
    // Try to parse the date if it's a string
    const parsedDate = typeof date.value === 'string' ? new Date(date.value) : date.value;
    const formattedDate = parsedDate instanceof Date && !isNaN(parsedDate)
        ? parsedDate.toISOString().split('T')[0]  // This will give the format 'Y-m-d'
        : null;


    formData.append('date', formattedDate);
    formData.append('time', time?.value);
    formData.append('product_id', selectedParts.value);


    await createInstant(formData);
    loading.value = false;
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

// Wrapping the submit logic

const uploadedImages = ref([]);
const imageFiles = ref([]);

const removeImage = (index) => {
    uploadedImages.value.splice(index, 1);
};
const onFileChange = (e) => {
    const files = e.target.files;
    for (const file of files) {
        if (file) {
            uploadedImages.value.push(URL.createObjectURL(file)); // للعرض
            imageFiles.value.push(file); // للحفظ كملفات
        }
    }
};

const defaultImage = ref(img_login);

const triggerFileInput = () => {
    document.querySelector('input[type="file"]').click();
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

.v-input input::placeholder {
    color: #a3a3a3;
    font-size: 8px;
    opacity: 0.8;
}

textarea::placeholder {
    color: #a1a1a1;
    /* لون أفتح */
    font-size: 0.9rem;
    /* حجم النص placeholder */
    opacity: 1;
    /* تأكد من أن النص واضح */
}






.custom-datepicker::placeholder {
    color: #a3a3a3;
    font-size: 8px;
    /* Adjust placeholder size */
}

.icon-style {
    color: #a3a3a3;
    /* Custom icon color */
}

.error-text {
    color: #e53e3e;
    /* Custom red color */
    font-size: 12px;
    font-weight: 500;
}
</style>