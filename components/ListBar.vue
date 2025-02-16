<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-full md:relative md:translate-x-0 bg-white !shadow-lg z-50 fixed md:static top-0 left-0 h-full transform transition-transform duration-300 ease-in-out"
    >
      <!-- Close Button (Only visible on small screens) -->
      <nav class="mt-8 w-full">
        <div
          class="flex flex-col items-center p-2 justify-center bg-black my-2 rounded-lg"
        >
          <Avatar
            :image="userInfo.image"
            class="my-2"
            shape="circle"
            size="large"
          />
          <span class="text-sm font-semibold text-white">
            {{ userInfo.name }}
          </span>
          <span class="text-sm font-semibold text-white">
            {{ userInfo.full_phone }}
          </span>
        </div>
        <ul class="space-y-2">
          <SliderBar
            :is-active="
              route.path === '/auth/profile' ||
              route.path === '/en/auth/profile'
            "
            :to="localePath('/auth/profile')"
            :title="t('pages.profile')"
            @click="closeSidebar"
            class="hover:bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform"
          >
            <IconsProfileIcon
              :is-active="route.path === '/' || route.path === '/en'"
              :to="localePath('index')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>

          <SliderBar
            :is-active="route.path === '/orders' || route.path === '/en/orders'"
            :to="localePath({ name: 'orders' })"
            :title="t('pages.orders')"
            @click="closeSidebar"
            class="hover:bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsFavourtieIcon
              :is-active="
                route.path === '/orders' || route.path === '/en/orders'
              "
              :to="localePath('orders')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>

          <!-- ===================================== -->
          <SliderBar
            :is-active="route.path === '/more' || route.path === '/en/more'"
            :to="localePath({ name: 'more' })"
            @click="closeSidebar"
            :title="t('pages.more')"
            class="hover:bg-primary-3 rounded-lg hover:rounded-lg hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsWalletIcon
              :is-active="route.path === '/more' || route.path === '/en/more'"
              :to="localePath('more')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>

          <!-- <SliderBar
            v-if="isAuth"
            :is-active="
              route.path === '/profile' || route.path === '/en/profile'
            "
            :to="localePath({ name: 'profile' })"
            @click="closeSidebar"
            :title="t('pages.profile')"
            class="hover:bg-primary-2 hover:text-gray-800 cursor-pointer rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsProfileIcon
              :is-active="
                route.path === '/profile' || route.path === '/en/profile'
              "
              :to="localePath('profile')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar> -->

          <SliderBar
            :is-active="
              route.path === '/settings' || route.path === '/en/settings'
            "
            :to="localePath({ name: 'settings' })"
            @click="closeSidebar"
            :title="t('pages.settings')"
            class="hover:bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsSettingIcon
              :is-active="
                route.path === '/settings' || route.path === '/en/settings'
              "
              :to="localePath('settings')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>

          <!-- <SliderBar
            :is-active="
              route.path === '/contact_us' || route.path === '/en/contact_us'
            "
            :to="localePath({ name: 'contact_us' })"
            @click="closeSidebar"
            :title="t('pages.contact_us')"
            class="hover:bg-primary-2 hover:text-gray-800 transition-all cursor-pointer duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsPhoneIcon
              :is-active="
                route.path === '/contact_us' || route.path === '/en/contact_us'
              "
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar> -->

          <SliderBar
            v-if="isAuth"
            :is-active="
              route.path === '/auth/login' || route.path === '/en/auth/login'
            "
            @click="logoutAuth"
            :title="t('auth.logout')"
            class="hover:bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsLogoutIcon
              :is-active="
                route.path === '/auth/login' || route.path === '/en/auth/login'
              "
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>
        </ul>
      </nav>
    </aside>

    <button
      @click="toggleSidebar"
      class="p-1 rounded-full flex md:hidden fixed top-19 right-3 z-50 bg-blue-100 hover:bg-blue-200"
    >
      <i
        :class="sidebarOpen ? 'pi pi-times' : 'pi pi-bars'"
        class="text-primary-1 text-xl"
      ></i>
    </button>
  </div>
</template>

<script setup>
const localeRoute = useLocaleRoute();
const localePath = useLocaleRoute();

// Is Auth
const { isAuth, userInfo } = storeToRefs(useAuthStore());
const { countNotification } = useNotification();
// i18n setup
const { t } = useI18n();
// Current route

const router = useRouter();
const route = useRoute();
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

if (isAuth.value) {
  watch(
    () => route.path,
    async () => {
      try {
        await countNotification(); // Call the function to count notifications
      } catch (error) {
        console.error("Error counting notifications:", error);
      }
    }
  );
}

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: "id",
  addSeoAttributes: true,
});
</script>

<style scoped>
/* Add any additional styles here */
</style>
