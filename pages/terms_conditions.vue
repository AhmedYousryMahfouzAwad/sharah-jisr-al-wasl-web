<template>
    <div v-if="loading" class="max-w-3xl  mx-auto shadow-xl mt-5 justify-center items-center flex flex-col rounded-xl">
        <div class="skeleton-title w-1/2 h-6 rounded-md mb-4"></div>
        <div class="skeleton-content w-full h-80 rounded-md"></div>
    </div>

    <div v-else-if="terms_list"
        class=" max-w-3xl mx-auto  py-5 mt-5  h-full my-auto shadow-xl justify-center items-center flex flex-col  rounded-xl ">
        <HomeTitle title="pages.terms_conditions" />
        <div class=" mx-auto p-5" v-html="terms_list">

        </div>
    </div>
    <div v-else id="about_list" class="flex w-[50%] my-10 mx-auto  flex-col justify-center items-center">
        <img :src="NotFound" alt="NoFoundData">
    </div>

</template>

<script setup>
//import
import NotFound from "@/assets/img/no_data.jpg";

//store
const { getTerms } = useSettingStore()
const { terms_list } = toRefs(useSettingStore())

//state
const loading = ref(true)

//hooks
onMounted(async () => {
    loading.value = true
    await getTerms()
    loading.value = false
})

</script>
