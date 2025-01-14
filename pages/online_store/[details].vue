<template>
    <div>
        <HomeTitle title="pages.online_store" class="my-3 max-w-6xl" />
        <div v-if="!loading" class="w-full h-44 sm:h-64">
            <img :src="products_details?.image" class="contain w-full h-full rounded-xl" alt="Image" />
        </div>

        <div v-else class="w-full sm:h-64 h-44">
            <Skeleton height="10rem" class="object-cover w-full h-full rounded-xl" borderRadius="16px"></Skeleton>
        </div>

        <div class="justify-between items-center grid grid-cols-12 gap-3 py-4 ">
            <div v-if="!loading" class="shadow-lg w-ful lg:col-span-7 col-span-12 rounded-lg space-y-5 p-2 h-full ">
                <div class="flex justify-start gap-x-16 items-center px-1">
                    <div class="flex items-center ">
                        <img :src="security" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                        <span class="m-1 md:text-base text-sm font-semibold"> {{ products_details?.name }}</span>
                    </div>
                    <div class="flex items-center gap-x-1 ">
                        <img :src="money" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                        <span class=" md:text-base text-sm font-semibold text-gray-800 w-full flex "><span
                                class=" px-1 md:text-base text-sm">
                                {{ t('pages.sar') }}
                            </span> {{ products_details?.price }}</span>
                    </div>
                    <div class="xl:flex  hidden  items-center gap-x-1 ">
                        <Rating v-model="rate" />

                    </div>
                </div>
                <div class="xl:hidden flex  items-center mx-2 ">
                    <Rating v-model="rate" />
                </div>
                <p class="text-gray-400  md:text-base text-xs px-2">
                    {{ products_details?.description }}
                </p>

                <!-- Buttons to increment and decrement the value -->
                <div v-if="products_details.stock_quantity > 0" class="flex gap-4 card  ">
                    <BaseTheCounter v-model="count" />
                </div>
                <p v-if="!products_details.stock_quantity" class="text-red-2 text-sm font-bold px-2">{{
                    t('pages.out_of_stock') }}
                </p>

                <BaseDialog v-model:visible="visible_sure_add" class="w-full max-w-xl mx-2">
                    <template #content>
                        <span
                            class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                            {{ t('pages.successfully_add') }}
                        </span>
                        <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
                    </template>
                </BaseDialog>

                <BaseDialog v-model:visible="visible_sure_add_favorite" class="w-full max-w-xl mx-2">
                    <template #content>
                        <span
                            class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                            {{ resMsg }}
                        </span>
                        <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
                    </template>
                </BaseDialog>

                <div class="xl:flex block  gap-4 justify-start items-center">
                    <Button v-if="products_details.stock_quantity > 0" @click="AddToCart()" label="Save"
                        class="!bg-transparent !text-primary-1 !border-none">
                        <img :src="shopping_cart" alt="shopping_cart" class="w-6 h-6" /> <span class="text-xxs
                            xl:text-base">
                            {{ t('buttons.add_to_cart') }}
                        </span>
                    </Button>

                    <Button v-if="findIdx(products_details?.id) === -1" @click="toggle" label="Save"
                        class="!bg-transparent !text-primary-1 !border-none">
                        <img :src="favorite" alt="wishlist" class="w-6 h-6" />
                        <span class="text-xxs xl:text-base">
                            {{ t('buttons.add_to_wishlist') }}
                        </span>
                    </Button>

                    <Button v-else @click="toggle" label="Save" class="!bg-transparent !text-primary-1 !border-none">
                        <img :src="favorite" alt="wishlist" class="w-6 h-6" />
                        <span class="text-xxs xl:text-base">
                            {{ t('pages.remove_from_favorites') }}
                        </span>
                    </Button>

                </div>

            </div>

            <div v-else class=" lg:col-span-7 col-span-12 rounded-lg space-y-5 p-2 h-full ">
                <Skeleton height="10rem" class="mt-5  
           " borderRadius="16px"></Skeleton>
            </div>

            <div v-if="!loading" class="lg:col-span-5 col-span-12 shadow-lg rounded-lg h-full p-2">
                <p class="text-gray-500 my-5"> {{ t('buttons.warranty') }}:</p>
                <hr />
                <div class="flex justify-start gap-5 my-5">
                    <IconsOfferIcon class="w-6 h-6 mt-1 !text-primary-1 " />
                    <p class="text-gray-400  md:text-base text-xs">
                        {{ products_details?.warranty }}
                    </p>
                </div>
            </div>

            <div v-else class="lg:col-span-5 col-span-12   rounded-lg h-full p-2">
                <Skeleton height="10rem" class="mt-5 col-span-12 xl:col-span-4 lg:col-span-6
            md:col-span-12 " borderRadius="16px"></Skeleton>
            </div>
        </div>

    </div>
</template>

<script setup>
import animation from '@/assets/img/animation.gif';
import security from "@/assets/img/security.svg";
import money from "@/assets/img/money.svg";
import shopping_cart from "@/assets/img/shopping_cart.svg";
import favorite from "@/assets/img/favorite.svg";
const { $i18n } = useNuxtApp();

const { t } = useI18n();
const confirm = useConfirm();

const localeRoute = useLocaleRoute();
const route = useRoute();
import { ref, onMounted } from 'vue';
const { addCart } = useCartStore();
const { toggleFavorite, findIdx } = useFavoritesStore();
const { visible_sure_add_favorite, resMsg } = storeToRefs(useFavoritesStore());
const { visible_sure_add } = storeToRefs(useCartStore());
const { getProductDetails } = useProductDetailsStore();
const { products_details } = storeToRefs(useProductDetailsStore());
const loading = ref(false);
const count = ref(1);
const rate = ref(null);
const { isAuth } = storeToRefs(useAuthStore());

const AddToCart = async () => {
    if (isAuth.value) {

        try {
            await addCart({
                product_id: route.params.details,
                quantity: count.value,
            });

        } catch (error) {
            console.log(error);
        }
    } else {
        confirm.require({
            group: "templating",
            message: $i18n.t("pages.sorry_you_are_not_registered"),
            icon: "img/sing_up.png",
            rejectClass: "mt-4 !bg-red-2 mx-auto text-white w-[40%] !rounded-2xl",
            acceptClass: " mt-4 !bg-primary-2 mx-auto w-[60%] text-white !rounded-2xl",
            acceptLabel: $i18n.t("pages.auth.login"),
            rejectLabel: $i18n.t("pages.cancel"),
            accept: () => {
                return navigateTo(localeRoute({ name: "auth-login" }));
            },
        });
    }

};




const toggle = () => {
    if (isAuth.value) {
        try {
            toggleFavorite(route.params.details);
        } catch (error) {
            console.log(error);
        }
    } else {
        confirm.require({
            group: "templating",
            message: $i18n.t("pages.sorry_you_are_not_registered"),
            icon: "img/sing_up.png",
            rejectClass: "mt-4 !bg-red-2 mx-auto text-white w-[40%] !rounded-2xl",
            acceptClass: " mt-4 !bg-primary-2 mx-auto w-[60%] text-white !rounded-2xl",
            acceptLabel: $i18n.t("pages.auth.login"),
            rejectLabel: $i18n.t("pages.cancel"),
            accept: () => {
                return navigateTo(localeRoute({ name: "auth-login" }));
            },
        });
    }


};


onMounted(async () => {
    loading.value = true;
    await getProductDetails(route.params.details);
    rate.value = products_details.value?.avg_rate
    loading.value = false;
});

</script>