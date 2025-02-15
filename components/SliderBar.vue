<template>
  <li>
    <NuxtLink
      :to="to"
      class="flex rounded-lg items-center justify-between font-semibold p-2 !w-full transition-all ease-in-out"
      :class="
        isActive
          ? 'bg-primary-3 border-2 border-primary-1 shadow-lg'
          : 'bg-transparent'
      "
    >
      <div class="flex items-center">
        <!-- Icon -->
        <span
          class="flex items-center p-2 rounded-full transition-all duration-300"
          :class="isActive ? 'bg-primary-2 text-white' : 'bg-primary-2'"
        >
          <slot></slot>
        </span>

        <!-- Title -->
        <span
          class="mx-5 transition-all duration-300"
          :class="isActive ? 'text-primary-1 font-bold' : 'text-gray-700'"
        >
          {{ title }}
        </span>
      </div>

      <!-- Arrow Icon -->
      <i
        :class="arrowIcon"
        :style="{
          color: isActive ? activeColor : inActiveColor,
          transform: isActive ? 'rotate(180deg)' : 'rotate(0deg)',
          transition: 'transform 0.3s ease-in-out, color 0.3s ease-in-out',
        }"
        class="mx-3"
      ></i>
    </NuxtLink>
  </li>
</template>

<script setup>
const { locale } = useI18n();
defineProps({
  to: [String, Object],
  title: String,
  isActive: Boolean,
});
const arrowIcon = computed(() =>
  locale.value === "ar" ? "pi pi-chevron-left" : "pi pi-chevron-right"
);

const inActiveColor = ref("#C69E73");
const activeColor = ref("#C69E73");
</script>
