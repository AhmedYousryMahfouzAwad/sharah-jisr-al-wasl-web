<template>
    <form @submit="submitComplaints" class="max-w-2xl w-full p-4 gap-4 space-y-5 mx-auto">
        <div class="flex flex-col justify-center gap-1 items-center">
            <h1 class="md:text-xl text-lg font-bold">{{ t("pages.complaints_inquiries") }} </h1>
            <p class=" text-gray-400 text-sm font-bold">{{ t("pages.Enter_the_following_data") }} </p>
        </div>

        <div class="shadow-xl w-full max-w-2xl mx-auto space-y-5 py-8 gap-4">
            <div class="card flex justify-center">
                <div class="md:w-[80%] w-[100%] md:px-0 px-2">
                    <div class="mt-4">
                        <p class="!font-bold md:text-base text-sm ">
                            {{ t("pages.complaint_images") }}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-4 items-center my-4">
                        <!-- Multiple Image Uploads -->
                        <div v-for="(image, index) in uploadedImages" :key="index" class="relative">
                            <img :src="image" alt="Uploaded Image"
                                class="w-16 h-16 rounded-full border border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80" />


                            <!-- Delete Button -->
                            <button class=" text-red-2 absolute top-0 right-0" type="button"
                                @click="removeImage(index)">
                                <i class="pi pi-times text-xl"></i>
                            </button>

                        </div>

                        <!-- Upload Button for Multiple Images -->
                        <div class="flex items-center gap-2">
                            <button @click="triggerFileInput" type="button"
                                class="text-cyan-200 cursor-pointer animate-bounce">
                                <i class="pi pi-upload text-xl"></i>

                            </button>
                            <p class="text-gray-500 cursor-pointer text-sm">
                                {{ t('pages.upload_complaint_images') }}
                            </p>
                        </div>

                        <input type="file" accept="image/*" multiple @change="onFileChange" class="hidden"
                            ref="fileInput" />
                    </div>

                    <div class="relative w-full">
                        <div class="w-full">
                            <!-- <label for="on_label"> {{ t("pages.auth.problem_description") }} </label> -->
                            <Field v-model="message" name="message" type="text" v-slot="{ errorMessage }">


                                <Textarea id="over_label" :placeholder="t('pages.complaint_details')"
                                    class="!rounded-3xl w-full" v-model="message" name="message" rows="5"
                                    style="resize: none" />
                                <span v-if="errorMessage"
                                    class="error-message text-red-2 text-sm flex flex-col justify-center items-center">{{
                                        errorMessage
                                    }}</span>

                            </Field>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="my-8">
                        <ButtonAuth type="submit" :loading="loading" :label="t('pages.send')" />
                    </div>
                </div>
            </div>
        </div>
    </form>
</template>

<script setup>
import default_img from "@/assets/img/default.png";
import * as yup from 'yup';
const { t } = useI18n();

const { loading, message } = storeToRefs(useComplaintStore());
const { addComplaint } = useComplaintStore();



const triggerFileInput = () => {
    document.querySelector('input[type="file"]').click();
};

const removeImage = (index) => {
    uploadedImages.value.splice(index, 1);
};

import { Field, useForm } from 'vee-validate';
// Define a combined validation schema for the form
const validationSchema = yup.object({
    message: yup.string().required(t('validation.required')),
});

// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});



// Wrapping the submit logic

const uploadedImages = ref([]); // للعرض فقط
const imageFiles = ref([]); // للملفات الحقيقية

const onFileChange = (e) => {
    const files = e.target.files;
    for (const file of files) {
        if (file) {
            uploadedImages.value.push(URL.createObjectURL(file)); // للعرض
            imageFiles.value.push(file); // للحفظ كملفات
        }
    }
};

const submitComplaints = handleSubmit(async () => {
    loading.value = true;

    const formData = new FormData();
    imageFiles.value.forEach((file, index) => {
        formData.append(`images[${index}]`, file); // إضافة الملفات الفعلية إلى FormData
    });
    formData.append('complaint', message.value);

    await addComplaint(formData);




    loading.value = false;
    resetFormFields();
});

const resetFormFields = () => {
    message.value = '';
    uploadedImages.value = [];
    imageFiles.value = []; // إعادة تعيين ملفات الصور بعد الإرسال
};




</script>

<style scoped>
.pi {
    font-size: 1.25rem;
}

.cursor-pointer {
    cursor: pointer;
}

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
