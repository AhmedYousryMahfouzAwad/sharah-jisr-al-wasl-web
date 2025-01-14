<template>

    <div class=" d-flex gap-3 main-input w-100">
        <GMapAutocomplete placeholder="ابحث هنا" class="input-me" @place_changed="setPlace">
        </GMapAutocomplete>
        <!-- <button class="main-btn up" style="flex-shrink: 0;">
            موقعك الحالي
        </button> -->
    </div>
    <div style="width: 100%;">

        <GMapMap :center="center" :zoom="18" map-type-id="terrain" style="width: 100%; height: 400px">
            <GMapMarker @dragend="getPositionmarker($event)" :position="center" :draggable="true" />
        </GMapMap>
    </div>
    <div class="flex justify-center items-center gap-3">
        <button class="bg-primary-2 text-white w-full p-2 mt-5 rounded-lg"
            @click="$emit('getLocation', center.lat, center.lng, address)">تاكيد</button>
        <button class="main-btn blue2 mt-2  lg up" @click="$emit('closeModal')" v-if="reset">الغاء الفلتر</button>
    </div>


</template>

<script setup>

const props = defineProps({
    currentLocation: {
        type: Boolean,
        default: false
    },
    reset: {
        type: Boolean,
    },
    sendedLng: {
        type: String,
    },
    sendedLat: {
        type: String,
    },
    sendedAddress: {
        type: String,
    },

});
const currentLocationMain = ref(props.currentLocation)

/*************** DATA **************** */

//map refs
const address = ref(props.sendedAddress || '');
const center = ref({ lat: props.sendedLat || 24.7135517, lng: props.sendedLng || 46.6752957 });

/*************** Methods **************** */
// search places
function setPlace(e) {


    // sended data to backend
    address.value = e.formatted_address;

    // change marker pos
    if (e.geometry) {
        center.value.lat = e.geometry.location.lat();
        center.value.lng = e.geometry.location.lng();
    }
}
// get lat , lng , address from change marker position
function getPositionmarker(e) {
    center.value.lat = e.latLng.lat();
    center.value.lng = e.latLng.lng();
    getaddressfromlatlng();
}
// getaddress from latlng
function getaddressfromlatlng() {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: center.value }, (results, status) => {
        if (status === "OK") {
            if (results[0]) {
                address.value = results[0].formatted_address;

                document.querySelector(".pac-target-input").value =
                    results[0].formatted_address;

            } else {
                address.value = "No results found";
            }
        } else {
            address.value = "Geocoder failed due to: " + status;
        }
    });
}
// get current location
function getCurrentLocatoin() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                center.value.lat = position.coords.latitude;
                center.value.lng = position.coords.longitude;
                getaddressfromlatlng();
            },
            (error) => {
                console.error("Error getting location:", error);
            }
        );
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
}


/*************** Mounted **************** */
onMounted(() => {
    // if (currentLocationMain.value) {
    //     setTimeout(() => {

    //         getCurrentLocation()
    //     }, 500);
    // }

});

</script>

<style scoped></style>