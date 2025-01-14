<template>
    <InputForm name="map" :label="t('pages.auth.the_site')" type="text"
        :placeholder="t('pages.auth.placeholder_the_site')" class="col-span-1 md:col-span-2 lg:col-span-2 xl:col-span-2"
        @click="openModal">
        <template #endIcon>
            <div class="flex items-center ps-3 ">
                <img src="@/assets/img/map.svg" class="h-5 w-5 text-gray-500 float-right" style="transform: scaleX(-1)"
                    alt="Map icon" />
            </div>
        </template>

    </InputForm>

    <Dialog v-model:visible="visible" :style="{ width: '25rem' }">
        <div>
            <OnlineStoreMapComp @getLocation="getMyLoc" :currentLocation="true" />
        </div>
        <Button type="button" label="Cancel" severity="secondary" class="w-full mt-5 rounded-3xl"
            @click="visible = false"></Button>
    </Dialog>


</template>

<script setup>
const { t } = useI18n();
const visible = ref(false);
// methods
function openModal() {
    visible.value = true;
}
//map refs
const sendedLat = ref(null);
const sendedLng = ref(null);
const sendedAddress = ref("");
// get lat , lng , address from change marker position
const getMyLoc = (lat, lng, address) => {
    sendedLat.value = lat
    sendedLng.value = lng
    sendedAddress.value = address
    visible.value = false
};

defineExpose({
    sendedLat,
    sendedLng,
})
</script>