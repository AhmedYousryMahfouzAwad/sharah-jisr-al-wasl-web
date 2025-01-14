<template>
    <div class="relative rounded-lg w-96 h-full overflow-hidden cursor-pointer block">
        <div class="relative w-full h-[100%] shadow-xl bg-no-repeat bg-cover bg-center"
            :style="{ backgroundImage: `url(${data?.image})` }">
            <div
                class=" !h-[100%] py-9 inset-0 p-4 space-y-3 flex flex-col items-start justify-start bg-black bg-opacity-60">
                <h2 class="text-white font-semibold">{{ data?.name }}</h2>

                <h2 class="text-white font-semibold">
                    <span>{{ t('pages.sar') }}</span> {{ data?.total_price }}
                </h2>

                <p class="text-white text-sm line-clamp-3">{{ data?.description }}</p>

                <div class="grid grid-cols-12 w-full space-y-2 text-white text-sm">
                    <div class="col-span-6 flex mt-2">
                        <img src="~/assets/img/check-circle.svg" alt="Image" class="w-4 h-4 m-1" />
                        <span>{{ data?.service }}</span>
                    </div>

                    <div v-if="data.visits_num" class="col-span-6 flex">
                        <img src="~/assets/img/check-circle.svg" alt="Image" class="w-4 h-4 m-1" />
                        <button @click="see = !see" class="text-white underline">
                            {{ data.visits_num }} {{ t('pages.remain_visits') }}
                        </button>
                    </div>

                    <div v-else class="col-span-6 flex text-white">
                        <img src="~/assets/img/check-circle.svg" alt="Image" class="w-4 h-4 m-1" />
                        <span class="underline">{{ t('pages.no_visits') }}</span>
                    </div>
                    <div class="col-span-6 flex">
                        <img src="~/assets/img/check-circle.svg" alt="Image" class="w-4 h-4 m-1" />
                        <span>{{ data?.duration }} {{ t('pages.day') }}</span>
                    </div>
                    <!-- <div v-show="see" class="col-span-6 flex-col flex">
                        <div v-for="(item, index) in data?.visits" :key="item.id">
                            <span class="text-white px-2">{{ item.date }}</span>
                            <button @click="handleDeleteVisit(item.id)" class="text-red-2 hover:underline">
                                {{ t('pages.cancel') }}
                            </button>
                        </div>
                    </div> -->
                </div>
            </div>
        </div>

        <button @click="visible = true"
            class="text-primary-1 hover:underline absolute bottom-2 right-[37%] font-semibold">
            {{ t('pages.subscribe') }}
        </button>


        <BaseDialog v-model:visible="visible1" class="w-full mx-1 overflow-hidden">
            <template #content>
                <!-- Image -->
                <img :src="d_delete" alt="delete_image"
                    class="mx-auto flex justify-center md:w-40   items-center w-28 h-28 md:h-40" />

                <!-- Text -->
                <span class="text-surface-500 text-center text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                    {{ t('pages.how_want_delete_visit') }}
                </span>

                <!-- Buttons -->
                <div class="grid grid-cols-12 gap-4 w-full items-center justify-between mx-auto">
                    <!-- Confirm Delete Button -->
                    <ButtonAuth @click="confirmDelete" v-show="true" :label="t('pages.auth.of_course')"
                        class="col-span-12 md:col-span-6 mx-auto" />

                    <!-- Cancel Button -->
                    <Button type="button" label="Cancel"
                        class="col-span-12 md:col-span-6 w-full mx-auto !py-2 flex justify-center items-center !rounded-full"
                        severity="secondary" v-show="true" @click="handleCancel()" />
                </div>
            </template>
        </BaseDialog>





        <BaseDialog v-model:visible="visible" class="w-full max-w-xl mx-2">
            <template #content>
                <p class="text-black font-bold mx-auto text-center">{{ t('pages.choose_payment_method') }}</p>
                <div class="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 flex mx-auto">

                    <div v-for="item in list_payment" :key="item.id"
                        class="flex items-center justify-center mx-auto my-5">
                        <RadioButton name="dynamic" v-model="payment" class="mx-3 mt-1  " :value="item.key" />
                        <label :for="item.key" class="ml-2  ">{{ item.name }}</label>
                    </div>
                </div>
                <div class="flex justify-center items-center">

                    <div class="text-black justify-center gap-5 flex font-bold mx-auto text-center">
                        {{ t('pages.automatic_renewal') }}
                        <ToggleSwitch class="mb-5" v-model="the_is_renewable" />
                    </div>


                </div>
                <div class="w-[50%] mx-auto">
                    <ButtonAuth @click="submitPayment" :loading="loading" v-show="true"
                        :label="t('pages.auth.of_course')" class="col-span-12 md:col-span-6 mx-auto " />
                </div>


            </template>
        </BaseDialog>






    </div>
</template>

<script setup>
//import
import d_delete from '@/assets/img/d_delete.png';
import animation from '@/assets/img/animation.gif';

//store

const the_is_renewable = ref(0);
const see = ref(false);
const localePath = useLocalePath();
const router = useRouter();
const { t } = useI18n();
const { deleteVisit, deletePackage } = usePackageStore();
const { loading, } = storeToRefs(useOrderPackageStore());
const { createPayTypes } = useOrderPackageStore();
//state

const payment = ref(1);
const visible = ref(false);
const visible1 = ref(false);
const visitId = ref(null);
const list_payment = ref([
    { name: t('pages.wallet'), key: 1 },
    { name: t('pages.electronic'), key: 2 },
]);

//methods
const handleCancel = () => {
    visible.value = false;
    visible1.value = false;
};


const handleDeleteVisit = async (id) => {
    visitId.value = id;
    visible1.value = true;
};


const confirmDelete = async () => {

    visible1.value = false;
    visible_sure_delete.value = true;

    setTimeout(async () => {
        await deleteVisit(visitId.value);
        visible_sure_delete.value = false;
        router.push(localePath("index"));
    }, 3000);
};

const props = defineProps({
    data: Object
});

const submitPayment = async () => {
    loading.value = true;
    const payload = {
        package_id: props.data.id,
        pay_type: payment.value,
        is_renewable: the_is_renewable.value ? 1 : 0, // Convert to 1 or 0
        package_price: props.data.price,

    };

    try {

        await createPayTypes(payload);
        visible.value = false;

    } catch (error) {
        loading.value = false;

    } finally {
        loading.value = false;

    }
}


</script>

<style scoped>
.bg-cover {
    background-size: cover;
}

.bg-center {
    background-position: center;
}
</style>
