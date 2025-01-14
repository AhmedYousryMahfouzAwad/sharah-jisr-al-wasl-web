<template>
    <!-- Title -->
    <div class="flex justify-between items-center mx-auto">
        <HomeTitle title="pages.online_store" class="my-3 max-w-6xl" />
    </div>

    <!-- Skeleton Loader -->
    <div v-if="loading_skeleton" class="grid grid-cols-12 mx-auto gap-3 mb-5">
        <!-- Skeleton for Shopping Cart -->
        <div v-for="i in 6" :key="i" class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12">
            <div class="animate-pulse grid grid-cols-12 gap-4 border p-4 rounded-lg ">
                <div class="h-28 w-full col-span-6 bg-gray-300 rounded"></div>


                <div class="col-span-6 pace-y-5 my-5">
                    <div class="h-6 w-3/4 bg-gray-300 rounded"></div>
                    <br>
                    <div class="h-6 w-1/2 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>


        <!-- Skeleton for Cost Section -->
        <div class="col-span-12 grid grid-cols-12 gap-3 mb-5 border p-5 rounded-lg shadow-lg">
            <div v-for="i in 5" :key="i" class="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-6">
                <div class="animate-pulse flex flex-col items-center gap-4">
                    <div class="h-10 w-10 bg-gray-300 rounded-full"></div>
                    <div class="h-4 w-3/4 bg-gray-300 rounded"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- online_store_shopping_cart-->
    <div v-else-if="cart && cart.length > 0">
        <div class=" grid grid-cols-12 mx-auto gap-3 mb-5">
            <OnlineStoreShoppingCart v-for="(item, index) in cart" :data="item" v-model:checked="checkedItems[index]"
                :key="item.id" class="col-span-12 xl:col-span-4 lg:col-span-6 md:col-span-12" />
        </div>
        <!--online_store_cost-->
        <div class=" grid grid-cols-12 mx-auto gap-3 mb-5 border p-5 rounded-lg shadow-lg">
            <OnlineStoreCost :name="t('pages.product_price')" :price="cart_details.totalProductPrice" :src="note"
                class="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-6" />
            <OnlineStoreCost :name="t('pages.delivery_price')" :price="cart_details.deliverPrice" :src="note"
                class="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-6" />
            <OnlineStoreCost :name="t('pages.discount_price')" :price="cart_details.couponAmount" :src="note"
                class="col-span-12 xl:col-span- lg:col-span-2 md:col-span-6" />
            <OnlineStoreCost v-if="cart_details.totalInstallationPrice" :name="t('pages.tax_value')"
                :price="cart_details.totalInstallationPrice" :src="note"
                class="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-6" />
            <OnlineStoreCost :name="t('pages.total_price')" :price="cart_details.orderFinalTotal" :src="note"
                class="col-span-12 xl:col-span-2 lg:col-span-2 md:col-span-6" />
        </div>
        <!--form-->
        <form @submit.prevent="create_Order" class="grid grid-cols-12  gap-4 border p-5 rounded-lg">
            <div class=" col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                <InputForm name="coupon_num" v-model="coupon_num" :label="t('pages.discount_coupon')" type="text"
                    :placeholder="t('pages.discount_coupon_placeholder')"
                    class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2  " />
            </div>

            <div class=" col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 ">
                <InputForm name="map" v-model="sendedAddress" readonly :label="t('pages.auth.the_site')" type="text"
                    :placeholder="t('pages.auth.placeholder_the_site')"
                    class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2" @click="openModal">
                    <template #endIcon>
                        <div class="flex items-center ps-3 ">
                            <img src="@/assets/img/map.svg" class="h-5 w-5 text-gray-500 float-right"
                                style="transform: scaleX(-1)" alt="Map icon" />
                        </div>
                    </template>

                </InputForm>

                <Dialog v-model:visible="visible" :style="{ width: '25rem' }">
                    <div>
                        <OnlineStoreMapComp @getLocation="getMyLoc" :currentLocation="true" />
                    </div>
                    <Button type="button" label="Cancel" severity="secondary" class="w-full mt-5 rounded-3xl"
                        @click="visible = false"></Button>
                </Dialog>

            </div>
            <BaseDialog v-model:visible="visible_success" class="w-full max-w-xl mx-2">
                <template #content>

                    <span
                        class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                        {{ resMsg }}
                    </span>

                    <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
                </template>
            </BaseDialog>

            <div class=" col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6  w-full">
                <p class="text-black font-bold">{{ t('pages.choose_payment_method') }}</p>
                <div v-for="category in categories" :key="category.key" class="flex items-center m-5">
                    <RadioButton v-model="selectedCategory" name="dynamic" class="mx-5 mt-1" :value="category.key" />
                    <label :for="category.key" class="ml-2">{{ category.name }}</label>
                </div>
            </div>

            <div class="w-full col-span-12  md:col-span-12 lg:col-span-6 xl:col-span-6 ">

                <p for="on_label" class="py-2 font-bold"> {{ t("pages.massage") }}
                </p>

                <Field v-model="message" name="message" type="text">
                    <Textarea id="over_label" :placeholder="t('pages.enter_massage')" class="!rounded-3xl w-full"
                        v-model="message" name="message" rows="5" style="resize: none" />
                </Field>
            </div>
            <div class=" col-span-12 w-[35%]  mx-auto">
                <ButtonAuth type="submit" :loading="loading" :label="t('pages.payment')"
                    class="w-full mx-auto text-center" />
            </div>
        </form>

    </div>

    <!-- Empty State -->
    <div v-else class="h-screen md:h-full">
        <div class="w-full h-1/2 flex justify-center items-center my-auto">
            <img :src="empty" alt="empty_cart" class="w-1/3" />
        </div>
    </div>

</template>

<script setup>
//image
import animation from '@/assets/img/animation.gif';
import note from "@/assets/img/note.svg";
import empty from "@/assets/img/empty.png";


// translation
const { t } = useI18n();
//cart store
const { getCart } = useCartStore();
const { cart, cart_details } = storeToRefs(useCartStore());
//order store
const { loading, visible_success, resMsg } = storeToRefs(useCreateOrderStore());
const { createOrder } = useCreateOrderStore();
//validation
import * as yup from 'yup';
import { Field, useForm } from 'vee-validate';
//state
const coupon_num = ref("");
const message = ref("");
const selectedCategory = ref(1);
const items = Array(15).fill(null);
const checkedItems = ref(Array(items.length).fill(false));
const anyChecked = computed(() => checkedItems.value.some(item => item));
const visible = ref(false);
const categories = ref([
    { name: t('pages.wallet'), key: 1 },
    { name: t('pages.electronic'), key: 2 },
]);
const loading_skeleton = ref(true);

// Define a combined validation schema for the form
const validationSchema = yup.object({
    map: yup.string().required(t('validation.required')),
});

function openModal() {
    visible.value = true;
}
//map refs
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
//get cart
onMounted(async () => {
    loading_skeleton.value = true
    await getCart()
    loading_skeleton.value = false
});
// Set up the form with VeeValidate
const { handleSubmit } = useForm({
    validationSchema,
});

// Wrapping the submit logic with try-catch for success/failure handling
const create_Order = handleSubmit(async () => {
    loading.value = true;
    try {
        const payload = {
            lng: sendedLng?.value,
            lat: sendedLat?.value,
            map_desc: sendedAddress?.value,
            notes: message?.value || null,
            pay_type: selectedCategory.value,
            coupon_num: coupon_num?.value || null,
            total_products_price: cart?.value?.total_products_price
        };
        await createOrder(payload);

        
    } catch (error) {

    } finally {
        loading.value = false;
        resetFormFields();
    }
});
//rest form
const resetFormFields = () => {
    coupon_num.value = '';
    message.value = '';
    sendedAddress.value = '';
};

// Watch for changes and update body overflow



</script>
<style scoped>
body {
    margin: 0;
    padding: 0;
    overflow: hidden;
    height: 100%;
}
</style>
