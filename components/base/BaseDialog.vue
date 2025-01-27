<template>
  <Dialog
    :visible="visible"
    :modal="modal"
    :header="header"
    class="md:max-w-xl max-w-7xl"
    @update:visible="updateVisible"
  >
    <!-- <button
      type="button"
      label="Cancel"
      @click="handleCancel"
      class="text-gray-500 mb-5 flex justify-end items-end p-2 rounded-full bg-blue-100 hover:bg-red-200 hover:text-red-700"
    >
      <i class="pi pi-times flex justify-center items-center"></i>
    </button> -->
    <slot name="content"></slot>
    <div class="flex justify-center gap-2 mt-4">
      <Button
        type="button"
        :label="t('pages.cancel')"
        v-show="show"
        severity="secondary"
        @click="handleCancel"
      />

      <ButtonAuth
        class="!w-28 my-5"
        type="button"
        v-show="show_accept"
        :label="t('pages.auth.of_course')"
        @click="handleSave"
      />
    </div>
  </Dialog>
</template>

<script setup>
import { defineProps, defineEmits } from "vue";

// Define properties to pass into the component
const props = defineProps({
  visible: {
    type: Boolean,
    default: false,
  },
  show: {
    type: Boolean,
    default: false,
  },
  show_accept: {
    type: Boolean,
    default: false,
  },
  header: {
    type: String,
    default: "",
  },
  modal: {
    type: Boolean,
    default: true,
  },
});

const { t } = useI18n();
// Emit events to handle visibility and other actions
const emit = defineEmits(["update:visible", "save", "cancel"]);

// Function to handle the update of visible property
const updateVisible = (value) => {
  emit("update:visible", value);
};

// Function to handle save action
const handleSave = () => {
  emit("save");
  emit("update:visible", false);
};

// Function to handle cancel action
const handleCancel = () => {
  emit("cancel");
  emit("update:visible", false);
};
</script>

<style scoped>
.p-dialog-header {
  @apply bg-primary-1 !important;
}
/* Add any additional styles if needed */
</style>
