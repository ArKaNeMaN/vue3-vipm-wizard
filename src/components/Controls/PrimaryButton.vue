<script setup lang="ts">

import BaseButton from "./BaseButton.vue";
</script>

<template>
    <base-button class="bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 active:shadow-inner disabled:bg-blue-400">
        <slot/>
    </base-button>
</template>
