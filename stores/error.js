// stores/errorStore.js
import { defineStore } from "pinia";
import { ref } from "vue";

export const useErrorStore = defineStore("errorStore", () => {
  const errorMessage = ref(null);

  function setError(message) {
    errorMessage.value = message;
  }

  function clearError() {
    errorMessage.value = null;
  }

  return { errorMessage, setError, clearError };
});
