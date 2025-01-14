<template>
    <div class="flex justify-between items-center   mx-auto  ">
        <HomeTitle title="pages.online_store" class="my-3 max-w-6xl" />
        <div>

            <button @click="visible = true" class="p-2 rounded-full bg-blue-100 hover:bg-blue-200">
                <img :src="filter" alt="filter" class="w-5 h-5" />
            </button>

            <div class="mx-5">
                <BaseDialog v-model:visible="visible" :style="{ width: dialogWidth }">
                    <template #content>
                        <div class="mx-auto container px-4 sm:px-6 lg:px-8">
                            <span
                                class="text-surface-500 text-center dark:text-surface-400 block mb-8 mx-auto text-lg md:text-xl">
                                {{ t('pages.filter_by') }}
                            </span>
                            <div class="container mx-auto">
                                <span class="text-surface-500 dark:text-surface-400 block my-4 text-base md:text-lg">
                                    {{ t('pages.price') }}
                                </span>
                                <div class="flex   gap-4 justify-center md:justify-start">
                                    <div class="flex items-center gap-2">
                                        <RadioButton v-model="ingredient" inputId="ingredient1" name="pizza"
                                            value="Cheese" />
                                        <label for="ingredient1" class="ml-2 text-sm md:text-base">{{
                                            t('pages.the_highest')
                                        }}</label>
                                    </div>
                                    <div class="flex items-center gap-2">
                                        <RadioButton v-model="ingredient" inputId="ingredient2" name="pizza"
                                            value="Mushroom" />
                                        <label for="ingredient2" class="ml-2 text-sm md:text-base">{{
                                            t('pages.the_lowest') }}</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </BaseDialog>
            </div>

        </div>

    </div>
    <div class=" grid grid-cols-12 mx-auto gap-3 ">
        <OnlineStoreCartOnlineStore v-for="item in 15" :key="item" name="مسبح"
            title="تم توليد هذا النص من مولد النص العربي" price="1200" :to="localeRoute({ name: 'product_details' })"
            class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12" />

    </div>


</template>

<script setup>
import filter from "@/assets/img/filter.svg"
const localeRoute = useLocaleRoute();

const visible = ref(false);
const ingredient = ref('');
let dialogWidth = ref('');

//  responsive 
const updateDialogWidth = () => {
    if (window.innerWidth < 640) {
        dialogWidth.value = '100%';
    } else if (window.innerWidth <= 768) {
        dialogWidth.value = '55%';
    } else if (window.innerWidth < 1024) {
        dialogWidth.value = '25%';
    }
};

const { t } = useI18n();

onMounted(() => {
    updateDialogWidth();
    window.addEventListener('resize', updateDialogWidth);
});

</script>
