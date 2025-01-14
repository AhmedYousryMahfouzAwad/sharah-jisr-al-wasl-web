<template>
    <div class="col-span-12 lg:col-span-3 shadow-lg mt-5 rounded-md">
        <div class="flex justify-between items-center p-5">
            <div class="flex justify-center items-center gap-x-2">
                <img :src="note" alt="note_img" class="md:w-5 md:h-5   w-4 h-4">
                <p class="text-sm font-semibold">{{ num }} </p>
            </div>
            <div class="flex justify-center items-center gap-x-2">
                <img :src="reports" alt="note_img" class="md:w-5 md:h-5   w-4 h-4">
                <p class="text-sm font-semibold">{{ state }} </p>
            </div>

        </div>
        <hr class="shadow-sm" />
        <div class="flex justify-between items-center p-5">
            <div class="flex justify-center items-center gap-x-2">
                <img :src="data" alt="note_img" class="md:w-5 md:h-5   w-4 h-4">
                <p class="text-sm  font-semibold">{{ date }} </p>
            </div>
            <div class="flex justify-center items-center ">
                <NuxtLink :to="to" class="text-primary-1 cursor-pointer hover:underline "> {{
                    t('pages.details') }}
                </NuxtLink>
            </div>


        </div>
    </div>
</template>

<script setup>
import note from "@/assets/img/note.svg";
import reports from "@/assets/img/reports.svg";
import data from "@/assets/img/data.svg";

const { t } = useI18n();

defineProps({
    num: Number,
    state: {
        type: [String, Number],
        required: true
    },
    date: String,
    to: {
        type: [String, Object],
        required: true
    },
})
</script>