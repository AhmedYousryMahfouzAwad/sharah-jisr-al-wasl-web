<template>
  <div class="bg-black py-10">
    <div class="grid grid-cols-12 max-w-7xl mx-auto justify-center ">
        <!-- Logo -->
      <div class="md:col-span-4 col-span-12 text-white mx-auto flex flex-col justify-start ">
        <div class="md:col-span-4 col-span-12 text-white">
          <NuxtLink :to="localeRoute({ name: 'index' })">
            <img src="/logo_footer.png" alt="logo" />
          </NuxtLink>
          <p>
          {{ app_description }}
          </p>

          <div class="flex gap-x-5">
            <div
              v-for="social in socials"
              :key="social.id"
              class="relative p-4 w-12 h-12 my-3 rounded-full !bg-primary-2 cursor-pointer flex justify-center items-center hover:bg-primary-3"
            >
              <a
                :href="social.link"
                target="_blank"
                rel="noopener noreferrer"
                class="flex justify-center mx-5 items-center"
              >
                <img :src="social.icon" alt="socials" class="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Home Title -->
      <div class="md:col-span-4 col-span-12 text-white mx-auto flex flex-col justify-start">
            
            <p class="text-lg font-bold"> {{ t("pages.company") }} </p>
            <div class="grid grid-cols-12 gap-4 mt-3">
                <div class=" col-span-6 space-y-2 ">
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.home')" />
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.who_we_are')" />
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.my_orders')" />
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.contact_us')" />
                </div>
                <div class=" col-span-6 space-y-2 ">
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.home')" />
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.auth.terms')" />
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.privacy_policy')" />
        <HomeTitleFooter :src="'/footer_defult.png'" :title="t('pages.complaints_inquiries')" />


                </div>


            </div>
       </div>

      <!-- Contact Information -->
      <div class="md:col-span-4 space-y-3 flex  flex-col rounded-lg  justify-start col-span-12 text-white mx-auto">
  
       <p class="font-bold text-white text-lg">{{ t("pages.contact_information") }}</p>


   <div class="flex items-center gap-x-2">
    <div
      class="relative p-3 rounded-full !bg-primary-2 cursor-pointer hover:bg-primary-3"
    >
      <img src="/phone.png" alt="notifications" class="w-4 h-4" />
    </div>
    <div>
      <p class="text-sm">{{ t("pages.mobile_number") }}</p>
      <p class="font-semibold text-sm">
        <template v-if="contacts && contacts.phone">
          <a
            :href="`tel:${contacts.phone}`"
            class="text-sm font-semibold flex underline"
          >
            {{ contacts.phone }}
          </a>
        </template>
        <div v-else class="animate-pulse bg-gray-300 h-4 w-24 rounded"></div>
      </p>
    </div>
  </div>

   <div class="flex items-center gap-x-2">
    <div
      class="relative p-3 rounded-full !bg-primary-2 cursor-pointer hover:bg-primary-3"
    >
      <img src="/img/email.svg" alt="notifications" class="w-4 h-4" />
    </div>
    <div>
      <p class="text-sm">{{ t("pages.auth.email") }}</p>
      <p class="font-semibold text-sm">
        <template v-if="contacts && contacts.email">
          {{ contacts.email }}
        </template>
        <div v-else class="animate-pulse bg-gray-300 h-4 w-32 rounded"></div>
      </p>
    </div>
  </div>

   <div class="flex items-center gap-x-2">
    <div
      class="relative p-3 rounded-full !bg-primary-2 cursor-pointer hover:bg-primary-3"
    >
      <img src="/location_map.png" alt="notifications" class="w-4 h-4" />
    </div>
    <div>
      <p class="text-sm">{{ t("pages.address") }}</p>
      <p class="font-semibold text-sm">
        <template v-if="contacts && contacts.lat && contacts.lng">
          <a
            :href="`https://www.google.com/maps?q=${contacts.lat},${contacts.lng}`"
            target="_blank"
            rel="noopener noreferrer"
            class="text-xs sm:text-sm font-semibold underline"
          >
            {{ contacts.map_desc }}
          </a>
        </template>
        <div v-else class="animate-pulse bg-gray-300 h-4 w-40 rounded"></div>
      </p>
    </div>
  </div>
 

      </div>
    </div>
  </div>
</template>

<script setup>
const localeRoute = useLocaleRoute();
const { t } = useI18n();

defineProps({
    app_description: String,
  socials: {
    type: Array,
    default: [],
  },
  contacts: {
    type: Object,
    default: {},
  },
  
});
</script>
