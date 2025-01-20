<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <nav class="bg-white shadow-md w-full">
      <div
        class="container mx-auto px-4 flex items-center justify-between py-3"
      >
        <!-- Logo -->
        <div class="flex items-center">
          <img src="../public/logo.png" alt="Logo" class="w-24" />
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
        <ul class="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <NavList
            :is-active="route.path === '/' || route.path === '/en'"
            :to="localePath('index')"
            :title="t('pages.home')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="route.path === '/about-us'"
            :to="localePath({ name: 'about-us' })"
            :title="t('pages.aboutUs')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="route.path === '/my-orders'"
            :to="localePath({ name: 'my-orders' })"
            :title="t('pages.my_orders')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
          <NavList
            :is-active="route.path === '/contact-us'"
            :to="localePath({ name: 'contact-us' })"
            :title="t('pages.contact_us')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          ></NavList>
        </ul>

        <!-- User Actions (Desktop View) -->
        <div class="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
          <button
            class="text-gray-700 hover:text-gray-900 p-1 rounded-md bg-primary-2"
          >
            <img src="../public/img/notification.png" alt="notification" />
          </button>
          <button
            class="text-black px-4 py-1 rounded-md border border-primary-1 flex justify-center items-center"
          >
            <span class="text-sm font-semibold"> حساب جديد </span>
          </button>
          <Select
            v-model="lang"
            :options="languages"
            optionLabel="name"
            class="border-0 shadow-none outline-none text-xs font-semibold"
          >
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
        <button class="md:hidden text-gray-700" @click="toggleSidebar">
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
          ></NavList>
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

    <nav class="bg-black shadow-md">
      <p class="text-white p-3 max-w-[94rem] mx-auto">dsadsadsadsad</p>
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
import saudi from "../public/img/saudi.png";
import Flag_of_the_United from "../public/img/Flag_of_the_United.webp";

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
const closeSidebar = () => {
  isSidebarOpen.value = false;
};
// Function to close the sidebar

// const { logOut } = useLogoutStore();
// const logoutAuth = async () => {
//   await logOut();
// };

// i18n setup
const { t, locale } = useI18n();

const lang = ref(locale.value);
const languages = ref([
  { name: "Saudi Arabia", image: saudi },
  { name: "English", image: Flag_of_the_United },
]);
// Current route
const route = useRoute();
const localePath = useLocalePath();

// watch(isToastVisible, (newValue) => {
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

const { isAuth } = storeToRefs(useAuthStore());
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
