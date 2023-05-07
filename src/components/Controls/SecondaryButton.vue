<script setup lang="ts">

import BaseButton from "./BaseButton.vue";
</script>

<template>
    <base-button class="
        text-white
        bg-gray-400 border-gray-400
        hover:bg-gray-500 hover:border-gray-500
        active:bg-gray-600 active:border-gray-600 active:shadow-inner
        disabled:bg-gray-300 disabled:border-gray-300
    ">
        <slot/>
    </base-button>
</template>
