<template>
  <!-- <Transition name="fade" mode="out-in">
      <div
        v-if="!hide_splash"
        class="fixed w-full !h-screen !bg-white z-950 z-[1000] flex justify-center items-center"
      >
        <img
          class="animate-pulse duration-75 lg:scale-75"
          :src="defaultImage"
          alt="Logo"
        />
      </div>
    </Transition> -->

  <NuxtLayout>
    <Toast />
    <!-- Toast component available globally -->
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup>
import Toast from "primevue/toast";

useSeoMeta({
  title: "Swimmer",
  description: "[description]",
  ogTitle: "[og:title]",
  ogDescription: "[og:description]",
  ogImage: "[og:image]",
  ogUrl: "[og:url]",
  twitterTitle: "[twitter:title]",
  twitterDescription: "[twitter:description]",
  twitterImage: "[twitter:image]",
  twitterCard: "summary",
});

import logo_app from "/img/cover.png";
const defaultImage = ref(logo_app);
const hide_splash = ref(false);

onMounted(() => {
  setTimeout(() => {
    hide_splash.value = true;
  }, 1000);
});
useHead({
  htmlAttrs: {
    lang: "ar",
  },
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "/logo.png",
    },
  ],
});
</script>

<style>
/* @font-face {
  font-family: Cario;
  src: url(/fonts/Cairo-Black.ttf);
}
* {
  font-family: cario, sans-serif;
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
} */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to

/* .fade-leave-active in <2.1.8 */ {
  opacity: 0;
}
</style>
