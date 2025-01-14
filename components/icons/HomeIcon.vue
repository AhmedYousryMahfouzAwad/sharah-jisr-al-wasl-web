<template>
    <div>

        <svg width="23" height="22" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M7.92732 21H5.61821C3.06764 21 1 18.9323 1 16.3818V9.11688C1 7.50197 1.84353 6.00438 3.22458 5.16737L8.99735 1.66873C10.4686 0.77709 12.3134 0.77709 13.7846 1.66873L19.5574 5.16737C20.9384 6.00438 21.782 7.50197 21.782 9.11688V16.3818C21.782 18.9323 19.7143 21 17.1637 21H14.8546M7.92732 21V16.3818C7.92732 14.4688 9.478 12.9181 11.391 12.9181C13.304 12.9181 14.8546 14.4688 14.8546 16.3818V21M7.92732 21H14.8546"
                :stroke="isActive ? activeColor : inActiveColor" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round" />
        </svg>

    </div>
</template>



<script setup>
const props = defineProps({

    isActive: {
        type: Boolean,
        default: false
    }
})

const inActiveColor = ref('#848484');
const activeColor = ref('#16B7F7'); 
</script>