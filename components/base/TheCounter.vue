<template>

    <div class="flex items-center border border-gray-500 rounded-full">

        <!-- plus Button -->
        <button @click="increment" class=" font-bold text-gray-500 hover:text-gray-800 px-3">+</button>

        <!-- Counter Value -->
        <span class=" font-medium  px-2 ">{{ modelValue }}</span>

        <!-- Minus Button -->
        <button @click="decrement" class=" font-bold text-gray-500  hover:text-gray-800 px-3">-</button>
    </div>

</template>
<script setup lang="ts">
const props = defineProps({
    // count: {
    //     type: Number,
    //     default: 1
    // }
    modelValue: {
        type: Number,
        default: 1
    }
})

const emit = defineEmits(["update:modelValue"]);

// Watch currentCount and emit the change to the parent
// watch(currentCount, (newCount) => {
//     emit("update:modelValue", newCount);
// });

const increment = () => {
    emit("update:modelValue", props.modelValue + 1)
}

const decrement = () => {
    if (props.modelValue > 1)
        emit("update:modelValue", props.modelValue - 1)
}
</script>

<style scoped>
/* Add any custom styles if needed */
</style>