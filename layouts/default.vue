<template>
  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">
    <nav class="bg-white shadow-md">
      <div
        class="container mx-auto px-4 flex items-center justify-between py-1"
      >
        <!-- Logo -->
        <div class="flex items-center space-x-2">
          <img src="../public/logo.png" alt="Logo" class="w-24" />
          <div class="flex items-center space-x-2 rtl:space-x-reverse">
            <img src="../public/img/elements.png" alt="Location Icon" />
            <div class="flex-col px-2 flex">
              <label for="location" class="text-gray-700 font-bold text-xs"
                >الموقع</label
              >
              <button
                id="location"
                class="rounded-md text-gray-700 text-xs focus:ring-2"
              >
                <span value="">تحديد الموقع </span>
              </button>
            </div>
          </div>
        </div>

        <!-- Navigation Links -->
        <ul class="flex items-center space-x-4 rtl:space-x-reverse">
          <NavList
            :is-active="route.path === '/' || route.path === '/en'"
            :to="localePath('index')"
            :title="t('pages.home')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
          </NavList>

          <NavList
            :is-active="
              route.path === '/about-us' || route.path === '/en/about-us'
            "
            :to="localePath({ name: 'about-us' })"
            :title="t('pages.aboutUs')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
          </NavList>

          <NavList
            :is-active="
              route.path === '/my-orders' || route.path === '/en/my-orders'
            "
            :to="localePath({ name: 'my-orders' })"
            :title="t('pages.my_orders')"
            class="cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
          </NavList>

          <li>
            <a href="#" class="text-gray-700 hover:text-gray-900">حول الموقع</a>
          </li>
          <li>
            <a href="#" class="text-gray-700 hover:text-gray-900"
              >سياسة الخصوصية</a
            >
          </li>
          <li>
            <a href="#" class="text-gray-700 hover:text-gray-900"
              >الشروط والأحكام</a
            >
          </li>
        </ul>

        <!-- User Actions -->
        <div class="flex items-center space-x-4 rtl:space-x-reverse">
          <button
            class="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            حساب جديد
          </button>
          <div class="relative">
            <button class="text-gray-700 hover:text-gray-900">العربية</button>
          </div>
        </div>
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
// Function to close the sidebar

// const { logOut } = useLogoutStore();
// const logoutAuth = async () => {
//   await logOut();
// };

// i18n setup
const { t } = useI18n();

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
/* Add any additional styles here */
</style>
