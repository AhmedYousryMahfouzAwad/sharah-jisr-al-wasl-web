<template>

  <Html :lang="head.htmlAttrs.lang" :dir="head.htmlAttrs.dir">

  <div class="flex h-screen w-full overflow-hidden">
    <aside :class="sidebarOpen ? 'start-0' : '-start-full'"
      class="!w-64 md:w-1/5 md:relative md:start-0 -start-full flex-shrink-0 overflow-hidden absolute bg-white border-r shadow-lg z-30 transform md:translate-x-0 transition-all duration-300 ease-in-out h-full">

      <button @click="toggleSidebar"
        class="p-2 rounded-full mt-2 flex justify-end items-end mx-2 bg-blue-100 hover:bg-blue-200 md:hidden">
        <i :class="sidebarOpen ? 'pi pi-times' : 'pi pi-bars'" class="text-primary-1" style="font-size: 1.2rem"></i>
      </button>

      <!-- Logo -->
      <NuxtLink :to="localeRoute({ name: 'index' })" @click="closeSidebar" class="p-6 text-center">
        <img src="@/assets/img/logo.png" width="100" alt="Image" class="mx-auto" />
      </NuxtLink>

      <nav class="mt-8 w-full">

        <ul class="space-y-2">

          <NavList :is-active="route.path === '/' || route.path === '/en'" :to="localePath('index')"
            :title="t('pages.home')" @click="closeSidebar"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsHomeIcon :is-active="route.path === '/' || route.path === '/en'" :to="localePath('index')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />

          </NavList>

          <NavList :is-active="route.path === '/orders' || route.path === '/en/orders'" :to="localePath('orders')"
            :title="t('pages.orders')" @click="closeSidebar"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsOrderIcon :is-active="route.path === '/orders' || route.path === '/en/orders'"
              :to="localePath('orders')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />
          </NavList>

          <!-- ===================================== -->
          <NavList :is-active="route.path === '/more' || route.path === '/en/more'" :to="localePath('more')"
            @click="closeSidebar" :title="t('pages.more')"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsMoreIcon :is-active="route.path === '/more' || route.path === '/en/more'" :to="localePath('more')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />
          </NavList>

          <NavList v-if="isAuth" :is-active="route.path === '/profile' || route.path === '/en/profile'"
            :to="localePath('profile')" @click="closeSidebar" :title="t('pages.profile')"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsProfileIcon :is-active="route.path === '/profile' || route.path === '/en/profile'"
              :to="localePath('profile')"
              class=" hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />
          </NavList>

          <NavList v-if="isAuth" :is-active="route.path === '/settings' || route.path === '/en/settings'"
            :to="localePath('settings')" @click="closeSidebar" :title="t('pages.settings')"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsSettingIcon :is-active="route.path === '/settings' || route.path === '/en/settings'"
              :to="localePath('settings')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />
          </NavList>

          <NavList :is-active="route.path === '/contact_us' || route.path === '/en/contact_us'"
            :to="localePath('contact_us')" @click="closeSidebar" :title="t('pages.contact_us')"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsPhoneIcon :is-active="route.path === '/contact_us' || route.path === '/en/contact_us'"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />
          </NavList>

          <NavList v-if="isAuth" :is-active="route.path === '/auth/login' || route.path === '/en/auth/login'"
            @click="logoutAuth" :title="t('auth.logout')"
            class="hover:bg-gray-200 hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105">
            <IconsLogoutIcon :is-active="route.path === '/auth/login' || route.path === '/en/auth/login'"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105" />
          </NavList>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <div class="flex-grow bg-gray-50 flex flex-col">
      <!-- Header -->
      <Header :toggleSidebar="toggleSidebar" />
      <div class="flex-grow h-screen  overflow-y-auto">
        <div class="sm:!container min-h-full px-2 mx-auto">
          <slot />
        </div>
      </div>

    </div>
  </div>


  <ConfirmDialog group="templating" class="confirm-alert" :draggable="false" :dismissableMask="true">
    <template #message="slotProps">
      <div class="d-flex flex-column align-items-center w-100 gap-4">
        <img :src="sign_up" loading="lazy" class="icon w-[50%] mx-auto contain-image" />
        <h4 class="message mx-auto w-full text-center mt-4 font-bold">{{ slotProps.message.message }}</h4>
      </div>
    </template>
  </ConfirmDialog>


  </Html>
</template>

<script setup>
import Header from '~/components/Header.vue';
import sign_up from "@/assets/img/sign_up.png";



// Sidebar open/close state
const sidebarOpen = ref(false);

// Function to toggle sidebar (open/close)
const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value;
};

// Function to close the sidebar
const closeSidebar = () => {
  sidebarOpen.value = false;
};

const { logOut } = useLogoutStore();
const logoutAuth = async () => {
  await logOut();
  await closeSidebar();
};


// i18n setup
const { t } = useI18n();

// Current route
const route = useRoute();
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