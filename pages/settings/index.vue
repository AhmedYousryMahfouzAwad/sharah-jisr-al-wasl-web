<template>
    <HomeTitle title="pages.settings" class="my-3" />
    <div class="shadow-xl max-w-3xl mx-auto py-10 rounded-xl space-y-5">

        <button v-for="(item, idx) in settings" :key="item.id"
            @click="item.name === 'pages.change_mobile_number' ? changeMobileNumberRequest() : handleSettingClick(settings[idx].to)"
            class="flex justify-between cursor-pointer bg-white items-center shadow-xl p-2 rounded-lg w-[70%] mx-auto">
            <div class="flex justify-center items-center gap-x-2">
                <div class="card border-2 border-primary-1 p-3 justify-center items-center flex rounded-full">
                    <img :src="item.image" alt="my_wallet" />
                </div>
                <p class="text-sm font-bold">{{ t(item.name) }}</p>
            </div>
            <div class="arrow-container">
                <i :class="['icon-class', arrowIcon]"></i>
            </div>
        </button>


        <button @click="visible = true"
            class="flex justify-between cursor-pointer bg-white items-center shadow-xl p-2 rounded-lg w-[70%] mx-auto">
            <div class="flex justify-center items-center gap-x-2">
                <div class="card border-2 border-primary-1 p-3 justify-center items-center flex rounded-full">
                    <img :src="language_icon" alt="language" />
                </div>
                <p class="text-sm font-bold">{{ t('pages.change_language') }}</p>
            </div>
            <i :class="['icon-class', arrowIcon]"></i>
        </button>

        <BaseDialog v-model:visible="visible" class="w-full ">
            <template #content>
                <div class=" ">
                    <span
                        class="text-surface-500 text-center dark:text-surface-400 block mb-8 mx-auto text-lg md:text-xl">
                        {{ t('pages.language') }}
                    </span>
                    <div class="flex gap-4 justify-center flex-wrap">
                        <div class="flex items-center gap-2">

                            <RadioButton v-model="language" inputId="ar" name="language" value="ar" />
                            <label for="ar" class="ml-2 text-sm md:text-base">اللغة العربية</label>
                        </div>
                        <div class="flex items-center gap-2">
                            <RadioButton v-model="language" inputId="en" name="language" value="en" />
                            <label for="en" class="ml-2 text-sm md:text-base">English</label>
                        </div>
                    </div>
                    <ButtonAuth @click="toggle_locale()" :label="t('pages.auth.of_course')" class="gap-3 mt-5" />
                </div>
            </template>
        </BaseDialog>

        <div class="flex justify-between cursor-pointer items-center p-2 rounded-full w-[70%] mx-auto">
            <div>
                <p>{{ t('pages.notifications') }}</p>
            </div>
            <div>
                <ToggleSwitch v-model="the_notify" @change="toggleNotifications" />
            </div>
        </div>

        <div class="flex cursor-pointer text-start bg-red-2 text-white p-2 rounded-lg w-[70%] mx-auto">
            <button @click="visible1 = true" class="w-full flex space-x-2 items-center px-3">
                <img :src="delete_account" alt="delete_account" />
                <p>{{ t('pages.delete_account') }}</p>
            </button>
        </div>

        <BaseDialog v-model:visible="visible1" class="w-full mx-1 overflow-hidden">
            <template #content>
                <!-- Image -->
                <img :src="d_delete" alt="delete_image"
                    class="mx-auto flex justify-center md:w-40   items-center w-28 h-28 md:h-40" />

                <!-- Text -->
                <span class="text-surface-500 text-center text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                    {{ t('pages.how_want_delete_account') }}
                </span>

                <!-- Buttons -->
                <div class="grid grid-cols-12 gap-4 w-full items-center justify-between mx-auto">
                    <!-- Confirm Delete Button -->
                    <ButtonAuth @click="sureDeleteAccount()" :loading="sure_delete" v-show="true"
                        :label="t('pages.auth.of_course')" class="col-span-12 md:col-span-6 mx-auto" />

                    <!-- Cancel Button -->
                    <Button type="button" label="Cancel"
                        class="col-span-12 md:col-span-6 w-full mx-auto flex justify-center items-center !rounded-full"
                        severity="secondary" v-show="true" @click="handleCancel()" />
                </div>
            </template>
        </BaseDialog>

        <BaseDialog v-model:visible="visible_sure_delete" class="w-full max-w-xl mx-2">
            <template #content>

                <span
                    class="text-surface-500 text-center font-bold text-sm dark:text-surface-400 block mb-8 mx-auto md:text-xl">
                    {{ t('pages.successfully_deleted') }}
                </span>

                <img :src="animation" alt="animation_image" class="mx-auto justify-center items-center flex">
            </template>
        </BaseDialog>
    </div>
</template>

<script setup>

//imports
const checked = ref(false);
import d_delete from '@/assets/img/d_delete.png';
import animation from '@/assets/img/animation.gif';
import edit_profile from '@/assets/img/edit_profile.svg';
import delete_account from '@/assets/img/trash.svg';
import change_mobile_number from '@/assets/img/change_mobile_number.svg';
import language_icon from '@/assets/img/language.svg';
import RadioButton from 'primevue/radiobutton';
//store
const { switchNotification, deviceNotification } = useNotification();
const { deleteAccount } = useLogoutStore();
const { the_notify } = storeToRefs(useNotification())
const { changeMobileNumber } = usePhoneStore()
const localePath = useLocalePath();
const { t, locale } = useI18n();
const switchLocalePath = useSwitchLocalePath()
const language = ref(null);
const settings = reactive([
    {
        name: 'pages.edit_profile',
        image: edit_profile,
        to: localePath('/settings/edit_profile'),
    },
    {
        name: 'pages.change_mobile_number',
        image: change_mobile_number,
        to: localePath('/settings/change_mobile_number'),
    },
]);

//state
const arrowIcon = computed(() => (locale.value === 'ar' ? 'pi pi-chevron-left' : 'pi pi-chevron-right')); // Right for RTL, left for LTR
const visible = ref(false);
const visible1 = ref(false);
const visible_sure_delete = ref(false);
const loading = ref(false);
const sure_delete = ref(false);

//methods
const toggle_locale = () => {
    navigateTo(switchLocalePath(language.value))
};
const handleCancel = () => {
    visible1.value = false;
};

const toggleNotifications = async () => {
    const payload = {
        device_id: 2,
        device_type: "web",
    }
    await switchNotification(payload);
};

onMounted(() => {
    deviceNotification();
});


const sureDeleteAccount = async () => {
    try {
        // Set initial states
        sure_delete.value = true;
        visible_sure_delete.value = true;
        visible1.value = false;

        // Perform the asynchronous account deletion
        await deleteAccount();

        // Reset state after successful deletion
        sure_delete.value = false;

    } catch (error) {
        console.error("Failed to delete account:", error);
    } finally {
        visible1.value = false;
    }
};


const changeMobileNumberRequest = async () => {
    try {
        loading.value = true;

        await changeMobileNumber();

        loading.value = false;

    } catch (error) {
        console.error('Error:', error);
    }

};

const handleSettingClick = (to) => {
    navigateTo(to);
};
// Function to handle toggle change 
</script>
<style scoped>
.icon-class {
    font-size: 11px;
    font-weight: bold;
    line-height: 1;
}
</style>