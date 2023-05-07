<script setup lang="ts">

import BaseButton from "./BaseButton.vue";
</script>

<template>
    <base-button class="bg-gray-400 text-white hover:bg-gray-500 active:bg-gray-600 active:shadow-inner disabled:bg-gray-300">
        <slot/>
    </base-button>
</template>
