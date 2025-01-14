<template>
    <div class="xl:mx-auto mt-5">
        <HomeTitle title="pages.profile" class="my-3 " />
    </div>

    <div class="max-w-2xl w-full p-4 gap-4 space-y-5 mx-auto">
        <div class="shadow-xl w-full max-w-2xl mx-auto space-y-5 py-8 gap-4 bg-white">
            <div class="card flex justify-center">
                <div class="md:w-[80%] w-[100%] md:px-0 px-2">
                    <!-- Loader -->
                    <div v-if="loading" class="flex justify-center items-center">
                        <span class="animate-bounce text-gray-500">{{ t('pages.loading') }}</span>
                    </div>

                    <!-- Form (shown after data is loaded) -->
                    <div v-else>
                        <!-- img -->
                        <div class="mx-auto flex justify-center items-center">
                            <Avatar :image="avatar"
                                class="mr-2 rounded-full border bg-transparent border-gray-300 object-cover bg-gradient-to-t from-gray-800/80 to-transparent dark:from-gray-900/80"
                                size="xlarge" shape="circle" />
                        </div>

                        <!-- Name -->
                        <div class="relative w-full">
                            <InputForm v-model="name" :readonly="true" name="name" :label="t('pages.auth.full_name')"
                                type="text" class="small-label" />
                        </div>

                        <!-- Number Phone -->
                        <div class="relative w-full">
                            <InputForm v-model="full_phone" :readonly="true" name="number"
                                :label="t('pages.auth.call_number')" type="number" class="small-label" />
                        </div>

                        <!-- Email Field -->
                        <div class="relative w-full">
                            <InputForm v-model="email" name="email" :readonly="true" type="email"
                                :label="t('pages.auth.email')" class="small-label" />
                        </div>

                        <!-- Name Friend Account -->
                        <div class="relative w-full">
                            <InputForm v-model="bank_account_name" :readonly="true" name="friend"
                                :label="t('pages.auth.Name_of_the_account_holder')" type="text" class="small-label" />
                        </div>

                        <!-- Name Bank -->
                        <div class="relative w-full">
                            <InputForm v-model="bank_name" name="nameBank" :readonly="true"
                                :label="t('pages.auth.name_bank')" type="text" class="small-label" />
                        </div>

                        <!-- Number IBAN -->
                        <div class="relative w-full">
                            <InputForm v-model="iban" name="iban" :readonly="true" :label="t('pages.auth.iban')"
                                type="text" class="small-label" />
                        </div>


                        <!-- Number Account Bank -->
                        <div class="relative w-full">
                            <InputForm v-model="bank_account_number" name="bankAccountNumber" :readonly="true"
                                :label="t('pages.auth.bank_account_number')" type="number" class="small-label" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
const { t } = useI18n();
const { getProfile } = useProfileStore();
const {
    name,
    email,
    full_phone,
    iban,
    bank_name,
    bank_account_name,
    bank_account_number,
    avatar
} = storeToRefs(useProfileStore());

// Loading state
const loading = ref(true);

onMounted(async () => {
    try {
        await getProfile();
    } finally {
        loading.value = false; // Hide loading state after data is fetched
    }
});
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

/* Small label styling */
.small-label label {
    font-size: 0.875rem;
    /* Smaller label size */
    color: #6b7280;
    /* Gray tone */
}
</style>