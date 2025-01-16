<template>
  <li>
    <NuxtLink
      :to="to"
      class="flex items-center justify-between font-semibold !w-full"
      @click="loading = true"
    >
      <div class="flex items-center">
        <span
          class="text-sm"
          :style="{
            color: inActiveColor,
            position: 'relative',
            transition: 'color 0.3s ease-in-out',
          }"
        >
          {{ title }}
          <span
            v-if="isActive"
            :style="{
              position: 'absolute',
              bottom: '-2px',
              left: '0',
              width: '100%',
              height: '2px',
              backgroundColor: activeColor,
              transition: 'width 0.3s ease-in-out',
            }"
          >
          </span>
        </span>
      </div>
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

// const arrowIcon = computed(() =>
//   locale.value === "ar" ? "pi pi-chevron-left" : "pi pi-chevron-right"
// ); // Right for RTL, left for LTR

const inActiveColor = ref("#000");
const activeColor = ref("#C69E73");
</script>

<style></style>
