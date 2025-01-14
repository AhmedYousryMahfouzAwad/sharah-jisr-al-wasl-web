<template>
    <div class="flex mt-[7%] py-5 items-center justify-center">
        <div class="max-w-3xl w-full py-5 flex justify-center items-center shadow-lg m-auto flex-col rounded-xl">
            <HomeTitle title="pages.the_wallet" class="mx-auto flex justify-center items-center" />
            <div class="flex flex-col justify-center items-center text-center">
                <img src="@/assets/img/wallet.png" class="text-gray-500" alt="wallet" />
                <p class="mt-2 text-xl font-semibold">{{ t('pages.current_balance') }}</p>
                <p class="mt-2 text-xl text-primary-1 font-semibold">
                    {{ t('pages.sar') }} {{ formattedAvailableBalance }}
                </p>
                <div class="w-[40%]">
                    <ButtonAuth :loading="loading_btn" @click="handleButtonClick" :label="t('pages.shipping')"
                        class="mt-5" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>

// i18n
const { t } = useI18n();

// Store
const { getWallet } = useWalletStore();
const { available_balance } = storeToRefs(useWalletStore());

// Reactive loading state
const loading_btn = ref(false);

// Computed formatted balance
const formattedAvailableBalance = computed(() => {
    return Number(available_balance.value.toFixed(2));
});

// Fetch wallet data on component mount
onBeforeMount(async () => {
    await getWallet();
});

// Button click handler
const handleButtonClick = () => {
    loading_btn.value = true; // Set loading state to true
    // Redirect to the external URL
    window.location.href =
        "https://backend.swimmer.aait-sa.com/public/hyper-pay-form/89E4EE1987778E5DE45BE53D5675B58A.uat01-vm-tx04/2/VISA%20MASTER";
};
</script>
