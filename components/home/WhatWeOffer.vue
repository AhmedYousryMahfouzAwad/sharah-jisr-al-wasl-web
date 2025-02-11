<template>
  <div
    class="bg-primary-2 relative w-full overflow-hidden cursor-pointer block"
  >
    <HomeTitle
      :src="'/elements.png'"
      class="my-5 mx-auto text-center justify-center items-center flex"
      :title="t('pages.what_we_offer')"
    />
    <div class="max-w-7xl py-5 grid grid-cols-12 gap-5 mx-auto">
      <NuxtLink
        to="/"
        class="border col-span-4 mx-auto border-gray-300 p-10 rounded-lg !bg-white shadow-sm flex w-full flex-col items-center"
      >
        <img
          src="/bg-section.png"
          alt="مكاتب الاستشارات الهندسية"
          class="w-10 h-10"
        />
        <p class="text-gray-900 font-medium mt-3">مكاتب الاستشارات الهندسية</p>
      </NuxtLink>
      <div class="col-span-4 mx-auto">cxzczxczxczxczx</div>
      <div class="col-span-4 mx-auto">cxzczxczxczxczx</div>
      <!-- تأكد أن الصورة في مجلد public مباشرة -->
      <img
        src="/bg-section.png"
        class="w-full object-cover absolute z-0 bottom-0 right-0 max-w-[500px] left-0 top-3/4 transform -translate-y-1/2"
        alt="Login Illustration"
      />
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n();
</script>

<style scoped></style>
