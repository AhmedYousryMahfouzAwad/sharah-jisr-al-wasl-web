<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <nav class="bg-white shadow-md w-full">
      <div
        class="container mx-auto max-w-[85rem] px-4 flex items-center justify-between"
      >
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink :to="localeRoute({ name: 'index' })">
            <img src="../public/logo.png" alt="Logo" class="w-24" />
          </NuxtLink>
          <div
            class="hidden md:flex items-center space-x-2 rtl:space-x-reverse"
          >
            <img src="../public/img/elements.png" alt="Location Icon" />
            <div class="flex-col px-2 flex">
              <label for="location" class="text-gray-700 font-bold text-xs">
                الموقع
              </label>
              <button
                id="location"
                class="rounded-md text-gray-700 text-xs focus:ring-2"
              >
                <span>تحديد الموقع</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Links (Desktop View) -->
        <ul class="hidden lg:flex items-center space-x-4 rtl:space-x-reverse">
          <NavList
            :is-active="route.path === '/' || route.path === '/en'"
            :to="localePath('index')"
            :title="t('pages.home')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="
              route.path === '/who_we_are' || route.path === '/en/who_we_are'
            "
            :to="localePath({ name: 'who_we_are' })"
            :title="t('pages.aboutUs')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="
              route.path === '/my_orders' || route.path === '/en/my_orders'
            "
            :to="localePath({ name: 'my-orders' })"
            :title="t('pages.my_orders')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="
              route.path === '/contact_us' || route.path === '/en/contact_us'
            "
            :to="localePath({ name: 'contact_us' })"
            :title="t('pages.contact_us')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="
              route.path === '/about_the_website' ||
              route.path === '/en/about_the_website'
            "
            :to="localePath({ name: 'about_the_website' })"
            :title="t('pages.about_the_website')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="
              route.path === '/privacy_policy' ||
              route.path === '/en/privacy_police'
            "
            :to="localePath({ name: 'privacy_policy' })"
            :title="t('pages.privacy_policy')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="route.path === '/terms' || route.path === '/en/terms'"
            :to="localePath({ name: 'terms' })"
            :title="t('pages.auth.terms')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
        </ul>

        <!-- User Actions (Desktop View) -->
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <NuxtLink
            :to="localeRoute({ name: 'notification' })"
            class="text-gray-700 relative hover:text-gray-900 p-1 rounded-md bg-primary-2"
          >
            <img src="../public/img/notification.png" alt="notification" />

            <span
              v-if="count"
              class="absolute top-0 right-0 flex items-center justify-center min-w-[20px] h-5 px-2 text-xs font-bold text-white bg-red-500 rounded-full border-2 border-white transform translate-x-1/2 -translate-y-1/2"
            >
              {{ count }}
            </span>
          </NuxtLink>

          <button
            v-if="!isAuth"
            class="text-black px-4 py-1 rounded-md border border-primary-1 flex justify-center items-center"
          >
            <span class="text-sm font-semibold">
              {{ t("pages.new_account") }}
            </span>
          </button>

          <NuxtLink
            v-if="isAuth"
            :to="userRoute"
            class="text-black px-4 py-1 rounded-md flex justify-center items-center"
          >
            <span class="text-sm font-semibold"> {{ userInfo.name }} </span>
            <Avatar :image="userInfo.image" class="mx-2" shape="circle" />
            <i :class="arrowIcon" class="mx-1 !w-2"> </i>
          </NuxtLink>
          <Select
            v-model="lang"
            :options="locales"
            @update:model-value="$router.push(switchLocalePath(lang.code))"
            optionLabel="name"
            class="border-0 shadow-none outline-none text-xs font-semibold"
          >
            <template #value="slotProps">
              <div class="flex items-center">
                <img
                  class="w-4 h-4 rounded-md mx-1"
                  :alt="slotProps.value?.label"
                  :src="slotProps.value?.image || lang.s"
                  style="width: 18px"
                />
                <div class="text-xs font-semibold">
                  {{ slotProps.value?.name }}
                </div>
              </div>
            </template>
            <template #option="slotProps">
              <div class="flex items-center">
                <img
                  class="w-4 h-4 rounded-md mx-1"
                  :alt="slotProps.option.label"
                  :src="slotProps.option.image"
                  style="width: 18px"
                />
                <div class="text-xs font-semibold">
                  {{ slotProps.option.name }}
                </div>
              </div>
            </template>
          </Select>
        </div>

        <!-- Mobile Menu Button -->
        <button class="lg:hidden text-gray-700" @click="toggleSidebar">
          <i class="pi pi-bars text-2xl"></i>
        </button>
      </div>

      <!-- Sidebar (Mobile View) -->
      <div
        :class="['sidebar', { 'sidebar-open': isSidebarOpen }]"
        class="fixed top-0 left-0 h-full bg-white shadow-lg z-50 w-64 p-4"
      >
        <button class="text-gray-700 mb-4" @click="toggleSidebar">
          <i class="pi pi-times text-2xl"></i>
        </button>
        <ul class="space-y-4">
          <NavList
            :is-active="route.path === '/' || route.path === '/en'"
            :to="localePath('index')"
            :title="t('pages.home')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
            @click.native="closeSidebar"
          ></NavList>
          <NavList
            :is-active="route.path === '/about-us'"
            :to="localePath({ name: 'about-us' })"
            :title="t('pages.aboutUs')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
            @click.native="closeSidebar"
          ></NavList>
          <NavList
            :is-active="route.path === '/my-orders'"
            :to="localePath({ name: 'my-orders' })"
            :title="t('pages.my_orders')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
            @click.native="closeSidebar"
          >
          </NavList>
          <NavList
            :is-active="route.path === '/contact-us'"
            :to="localePath({ name: 'contact-us' })"
            :title="t('pages.contact_us')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
            @click.native="closeSidebar"
          ></NavList>
        </ul>
      </div>
    </nav>

    <slot />

    <ConfirmDialog
      group="templating"
      class="confirm-alert"
      :draggable="false"
      :dismissableMask="true"
    >
      <template #message="slotProps">
        <div class="d-flex flex-column align-items-center w-100 gap-4">
          <img
            :src="logo"
            loading="lazy"
            class="icon w-[50%] mx-auto contain-image"
          />
          <h4 class="message mx-auto w-full text-center mt-4 font-bold">
            {{ slotProps.message.message }}
          </h4>
        </div>
      </template>
    </ConfirmDialog>
  </Html>
</template>

<script setup>
const switchLocalePath = useSwitchLocalePath();
const { userInfo, isAuth } = storeToRefs(useAuthStore());
const localeRoute = useLocaleRoute();

const { countNotification } = useNotification();

const { count } = storeToRefs(useNotification());
// const localePath = useLocaleRoute();

// i18n setup
const { t, locale, locales } = useI18n();

const userRoute = computed(() => {
  return userInfo.value.model_type === "provider"
    ? localeRoute({ name: "auth-profile-provider" })
    : localeRoute({ name: "auth-profile" });
});

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

const lang = ref(locale.value);

// Current route
const route = useRoute();
const localePath = useLocalePath();

const arrowIcon = computed(() =>
  locale.value === "ar" ? "pi pi-chevron-left" : "pi pi-chevron-right"
); // Right for RTL, left for LTR

//   if (newValue) {
//     toast.add(
//       {
//         severity: globalStore.toastMsg.type,
//         summary: globalStore.toastMsg.summary,
//         detail: globalStore.toastMsg.message,
//         life: globalStore.toastMsg.time
//       }
//     );
//   }
// })
// Locale head setup for language direction
const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
// if (isAuth.value) {
//   watch(
//     () => route.path,
//     async () => {
//       await countNotification();
//     }
//   );
// }
onMounted(() => {
  lang.value = locales.value.find((l) => l.code === locale.value);
  // countNotification();
});
</script>

<style scoped>
.sidebar {
  transform: translateX(-100%);
  transition: transform 0.3s ease-in-out; /* Animation effect */
}
.sidebar-open {
  transform: translateX(0);
}
</style>
