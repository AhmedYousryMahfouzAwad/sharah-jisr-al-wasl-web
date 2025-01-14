<template>

    <div class="flex  flex-col items-start gap-x-1  ">
        <div class="flex items-start gap-x-1 ">
            <img :src="src" alt="security" class="w-4 h-4 sm:w-5 sm:h-5 md:mt-0  mt-1" />
            <span class=" text-sm   font-semibold text-gray-400 w-full flex">
                {{ name }}</span>
        </div>

        <span class=" text-sm font-semibold text-gray-800 w-full mx-5 flex"> <span class=" px-1  text-sm">

                {{ t('pages.sar') }}
            </span>{{ price }}</span>
    </div>
</template>

<script setup>


const { t } = useI18n()
defineProps({
    name: String,
    src: String,
    price: [Number || String],
})

</script>
