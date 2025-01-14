<template>

    <!--about-->
    <div v-if="loading" class="max-w-3xl  mx-auto shadow-xl mt-5 justify-center items-center flex flex-col rounded-xl">
        <div class="skeleton-title w-1/2 h-6 rounded-md mb-4"></div>
        <div class="skeleton-content w-full h-80 rounded-md"></div>
    </div>

    <div v-else-if="about_list"
        class="max-w-3xl mx-auto shadow-xl mt-5 justify-center items-center flex flex-col rounded-xl">
        <HomeTitle title="pages.about_website" class="mx-auto justify-center items-center flex" />
        <div class="mx-auto p-5" v-html="about_list">
        </div>
    </div>

    <div v-else id="about_list" class="flex w-[50%] my-10 mx-auto  flex-col justify-center items-center">
        <img :src="NotFound" alt="NoFoundData">
    </div>

</template>

<script setup>

//imports
import NotFound from "@/assets/img/no_data.jpg";

//store
const { getAbout } = useSettingStore()
const { about_list } = toRefs(useSettingStore())
const { t } = useI18n();

//state
const loading = ref(true)

//hooks
onMounted(async () => {
    loading.value = true
    await getAbout()
    loading.value = false
})

</script>

<style>
/* Skeleton styles */
.skeleton-title,
.skeleton-content {
    background: linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%);
    background-size: 200% 100%;
    animation: skeleton-loading 1.5s infinite;
}

@keyframes skeleton-loading {
    from {
        background-position: 200% 0;
    }

    to {
        background-position: -200% 0;
    }
}
</style>