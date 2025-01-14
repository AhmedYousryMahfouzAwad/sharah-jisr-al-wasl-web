<template>
    <div class="  bg-transparent border rounded-lg shadow-sm overflow-hidden flex px-2 h-32  items-center">
        <div class="flex items-center justify-center !rounded-lg  pt-1">
            <img :src="data.image" alt="online_stores" class="w-24 h-32  object-cover !rounded-xl" />
        </div>

        <div class="flex-1">
            <div class="flex justify-between items-center px-1">

                <div class="flex items-center ">
                    <img :src="security" alt="security" class="w-4 h-4" />
                    <span class="mb-2  text-xs px-2">{{ truncateText(data.name, 15) }}</span>
                </div>

                <div class="flex items-center gap-x-1">
                    <ToggleSwitch v-model="localChecked" :trueValue="1" :falseValue="0"
                        @change="toggleInstallment(data.id)" />
                </div>

            </div>

            <div class="flex items-center  px-1">
                <img :src="money" alt="security" class="  w-4  h-4" />
                <span class="sm:text-sm font-semibold text-gray-800 text-sm px-2">{{ t('pages.sar') }} {{ data.price
                    }}</span>
            </div>
            <p class="text-gray-500  sm:text-xs text-xs px-2">
                {{ truncateText(data.description, 30) }}
            </p>

            <div class="flex justify-between items-center px-1">

                <div class="flex items-center m-1 ">
                    <BaseTheCounter v-model="count" @update:modelValue="updateCart(data.id, count)" />
                </div>

                <button :loading="loading" @click="deleteCart(data.id)" class="flex items-center gap-x-1 m-1 ">
                    <img :src="image_delete" alt="image_delete" class="w-5 h-5">
                </button>
                <!-- 
                <button :loading="loading" @click="updateCart(data.id, count)" class="flex items-center gap-x-1 m-1 ">
                    <img :src="image_delete" alt="image_delete" class="w-5 h-5">
                </button> -->

            </div>
        </div>
    </div>
</template>

<script setup>

const { t } = useI18n();
import security from "@/assets/img/security.svg";
import money from "@/assets/img/money.svg";
import image_delete from "@/assets/img/delete.svg";
const { deleteCart, updateCart } = useCartStore()
const { loading, cart } = storeToRefs(useCartStore())

function truncateText(text, maxLength) {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}
const props = defineProps({
    data: Object
});

const count = ref(props.data.quantity);
const { toggleInstallment } = useCartStore()
const emit = defineEmits(['update:checked']);
const localChecked = ref(props.data.is_installed); // Create a local copy of the prop

// // Watch for changes to localChecked and emit an update event
// watch(localChecked, (newValue) => {
//     emit('update:checked', newValue);
// });


</script>
