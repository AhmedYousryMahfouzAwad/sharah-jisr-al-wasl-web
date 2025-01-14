export default defineNuxtRouteMiddleware((to, from) => {
  const { $i18n } = useNuxtApp();
  const localeRoute = useLocaleRoute();
  const requiresAuth = to.meta.requiresAuth;

  const { isAuth } = storeToRefs(useAuthStore());
  const { setAuth } = useAuthStore();
  const confirm = useConfirm();

  if (useCookie("auth").value) {
    setAuth();
  }

  if (requiresAuth && !isAuth.value) {
    confirm.require({
      group: "templating",
      message: $i18n.t("pages.sorry_you_are_not_registered"),
      icon: "img/sing_up.png",
      rejectClass: "mt-4 !bg-red-2 mx-auto text-white w-[40%] !rounded-2xl",
      acceptClass: " mt-4 !bg-primary-2 mx-auto w-[60%] text-white !rounded-2xl",
      acceptLabel: $i18n.t("pages.auth.login"),
      rejectLabel: $i18n.t("pages.cancel"),
      accept: () => {
        return navigateTo(localeRoute({ name: "auth-login" }));
      },
    });
    return false;
  }
});
