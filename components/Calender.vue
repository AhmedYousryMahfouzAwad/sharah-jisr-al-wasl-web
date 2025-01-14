<template>
    <Field v-model="modelValue" :name="name" :rules="rules" validate-on-input v-slot="{ field, errorMessage }">
        <div>
            <h1 class="font-bold my-2 px-1">{{ label }}</h1>
            <div class="relative flex items-center justify-center">
                <!-- PrimeVue Calendar Component -->
                <Calendar v-model="modelValue" :type="type" v-bind="field" :placeholder="placeholder"
                    :disabled="disabled" :readonly-input="readonly" :showIcon="showIcon"
                    class="w-full pl-4 pr-4 py-2 border-2 rounded-full focus:outline-none focus:ring-1 focus:ring-primary-1"
                    :class="{ 'ps-20': $slots.leading, 'ps-5': $slots.startIcon, 'pe-5': $slots.startIcon }" />

                <!-- Leading Icon Slot -->
                <span class="absolute inset-y-0 start-0 *:h-full">
                    <slot name="leading"></slot>
                </span>
                <span class="absolute inset-y-0 start-2 *:h-full">
                    <slot name="startIcon"></slot>
                </span>

                <span class="absolute inset-y-0 end-2 *:h-full">
                    <slot name="endIcon"></slot>
                </span>
            </div>

            <!-- Error Message -->
            <span v-if="errorMessage" class="error-message text-red-500">{{ errorMessage }}</span>
        </div>
    </Field>
</template>

<script setup>
import { Field } from 'vee-validate';
import { ref } from 'vue';
import Calendar from 'primevue/calendar';  // Import PrimeVue Calendar component

// Define props
defineProps({
    disabled: Boolean,
    name: String,
    label: String,
    placeholder: String,
    readonly: {
        type: Boolean,
        default: false
    },
    rules: String,
    modelValue: String, // v-model binding for Calendar
});

// Define emit to update model value
const emit = defineEmits(['update:modelValue', 'click']);

// Enable two-way binding for modelValue
const modelValue = ref('');

// Handle click event for any custom actions (e.g., open modal)
function openModal(event) {
    emit('click', event);  // Emit click event (customize as needed)
}
</script>

<style scoped>
/* Add any additional styles as needed */
</style>
