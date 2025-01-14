export default defineNuxtRouteMiddleware(() => {
  const { errorMessage } = storeToRefs(useErrorStore());
  const { setError, clearError } = useErrorStore();
  const errorStore = useErrorStore();

  // Check if there is an error message in the store
  if (errorStore.errorMessage) {
    // Check for specific error messages
    if (
      errorStore.errorMessage === "The Phone field is required" ||
      errorStore.errorMessage === "الهاتف مطلوب"
    ) {
      // Clear the error message
      errorStore.clearError();
      // Navigate to the login page
      return navigateTo("/auth/login");
    }
    // Optionally, clear the error if you want to handle other cases
    // errorStore.clearError();
  }
});
