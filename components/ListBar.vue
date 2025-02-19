<template>
  <div class="flex w-full overflow-hidden">
    <!-- Sidebar -->
    <aside
      :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'"
      class="w-full lg:relative md:translate-x-0 bg-white !shadow-lg z-50 fixed md:static top-0 left-0 h-full transform transition-transform duration-300 ease-in-out"
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
              route.path === '/en/auth/profile' ||
              route.path === '/en/auth/profile-provider' ||
              route.path === '/auth/profile-provider'
            "
            :to="userRoute"
            :title="t('pages.profile')"
            @click="closeSidebar"
            class="hover:bg-primary-3 rounded-lg bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform"
          >
            <IconsProfileIcon
              :is-active="
                route.path === '/auth/profile' ||
                route.path === '/en/auth/profile' ||
                route.path === '/en/auth/profile-provider' ||
                route.path === '/auth/profile-provider'
              "
              :to="localePath('index')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>
          <SliderBar
            :is-active="
              route.path === '/auth/settings' ||
              route.path === '/en/auth/settings' ||
              route.path === '/auth/settings-provider' ||
              route.path === '/en/auth/settings-provider'
            "
            :to="userRouteSettings"
            :title="t('pages.settings')"
            @click="closeSidebar"
            class="hover:bg-primary-3 rounded-lg bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsSettingIcon
              :is-active="
                route.path === '/auth/settings' ||
                route.path === '/en/auth/settings' ||
                route.path === '/auth/settings-provider' ||
                route.path === '/en/auth/settings-provider'
              "
              :to="localePath('settings')"
              class="hover:text-gray-800 transition-all duration-300 ease-in-out transform hover:scale-105"
            />
          </SliderBar>
          <SliderBar
            :is-active="route.path === '/orders' || route.path === '/en/orders'"
            :to="localePath({ name: 'orders' })"
            :title="t('pages.orders')"
            @click="closeSidebar"
            class="hover:bg-primary-3 rounded-lg bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
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
            :is-active="route.path === '/wallet' || route.path === '/en/wallet'"
            :to="localePath({ name: 'wallet' })"
            @click="closeSidebar"
            :title="t('pages.the_wallet')"
            class="hover:bg-primary-3 bg-primary-3 rounded-lg hover:rounded-lg hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <IconsWalletIcon
              :is-active="
                route.path === '/wallet' || route.path === '/en/wallet'
              "
              :to="localePath('/wallet')"
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
            class="hover:border-primary-1 rounded-lg bg-primary-3 hover:text-gray-800 cursor-pointer transition-all duration-300 ease-in-out transform hover:scale-105"
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
      class="p-2 rounded-full flex md:hidden fixed top-20 right-4 z-50 bg-primary-2 hover:bg-primary-2 shadow-lg"
      style="position: fixed !important"
    >
      <i
        :class="sidebarOpen ? 'pi pi-times' : 'pi pi-bars'"
        class="text-black text-xl"
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

const userRoute = computed(() => {
  return userInfo.value?.model_type === "provider"
    ? localeRoute({ name: "auth-profile-provider" })
    : localeRoute({ name: "auth-profile" });
});
const userRouteSettings = computed(() => {
  return userInfo.value?.model_type === "provider"
    ? localeRoute({ name: "auth-settings-provider" })
    : localeRoute({ name: "auth-settings" });
});

if (isAuth.value) {
  watch(
    () => route.path,
    async () => {
      await countNotification();
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
