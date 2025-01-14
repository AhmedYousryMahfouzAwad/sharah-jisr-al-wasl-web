<template>
    <div class="bg-transparent border rounded-lg shadow-sm overflow-hidden flex p-2  items-center">
        <div class="flex items-center justify-center  aspect-square ">
            <img :src="src" alt="online_stores" class="w-24 h-24 object-cover rounded-lg " />
        </div>
        <div class="flex-1 space-y-1">
            <div class="flex justify-between items-center px-1">

                <div class="flex items-center ">
                    <img :src="security" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                    <span class=" text-sm ">{{ name }}</span>
                </div>

                <div class="flex items-center gap-x-1">
                    <img :src="money" alt="security" class="sm:w-5 w-4 sm:h-5 h-4" />
                    <span class="sm:text-lg font-semibold text-gray-800 !text-sm">{{ t('pages.sar') }} {{ price
                        }}</span>
                </div>

            </div>

            <p class="text-gray-500  sm:text-sm text-xs px-2">
                {{ title }}
            </p>

            <div class=" flex justify-between items-center">
                <NuxtLink :to="to" class="text-primary-1 sm:text-sm hover:underline text-xs px-2"> {{
                    t('pages.product_details') }}
                </NuxtLink>

                <button v-if="showDeleteButton" @click="deleteItem" class="flex items-center gap-x-1 m-1">
                    <img :src="image_delete" alt="image_delete" class="w-5 h-5">
                </button>
            </div>


        </div>
    </div>
</template>

<script setup>


const { t } = useI18n();
import security from "@/assets/img/security.svg";
import money from "@/assets/img/money.svg";
import image_delete from "@/assets/img/delete.svg";

defineProps({
    name: String,
    title: String,
    price: String,
    to: {
        type: [String, Object],
        required: true
    },
    src: String,
    showDeleteButton: {
        type: Boolean,
        default: false // Default to false, meaning the button is hidden unless specified
    },


});
// Define emit to send delete event to the parent
const emit = defineEmits(['delete-item']);

// Method to handle deletion
const deleteItem = () => {
    emit('delete-item');  // Emit event for parent to handle delete action
};

</script>
