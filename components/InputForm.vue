<template>
  <Field
    v-model="modelValue"
    :name="name"
    :type="type"
    :rules="rules"
    validate-on-input
    v-slot="{ field, errorMessage }"
  >
    <div>
      <p class="font-bold mb-2 px-1 md:text-base text-sm" v-if="label">
        {{ label }}
      </p>
      <div class="relative flex items-center justify-center">
        <input
          :type="type"
          v-bind="field"
          class="w-full pl-3 pr-3 py-3 border-2 text-sm rounded-lg focus:outline-none focus:ring-1 focus:ring-primary-1"
          :placeholder="placeholder"
          :disabled="disabled"
          :readonly="readonly"
          :class="{
            'ps-20': $slots.leading,
            'ps-7': $slots.startIcon,
            'pe-7': $slots.startIcon,
          }"
          @click="openModal"
        />

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

      <!-- Animated Error Message -->
      <transition name="fade">
        <span
          v-if="errorMessage"
          class="error-message font-bold text-red-2 md:text-sm text-xs"
          >{{ errorMessage }}</span
        >
      </transition>
    </div>
  </Field>
</template>

<script setup>
import { Field } from "vee-validate";

// تعريف props بما فيها modelValue
defineProps({
  disabled: Boolean,
  name: String,
  type: String,
  label: String,
  placeholder: String,
  readonly: {
    type: Boolean,
    default: false,
  },

  rules: String,

  modelValue: String, // يجب تعريف modelValue
});

// استخدام defineModel لتفعيل v-model
const modelValue = defineModel("modelValue");

const emit = defineEmits(["update:modelValue", "click"]);

// Enable two-way binding with a computed setter

// Handle click and emit event
function openModal(event) {
  emit("click", event);
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}

.text-red-500 {
  position: absolute;
  top: calc(100% + 4px); /* ضع رسالة الخطأ أسفل الحقل مباشرة */
  font-size: 0.875rem; /* حجم خط صغير */
  color: #f56565; /* لون الخطأ */
}
</style>
