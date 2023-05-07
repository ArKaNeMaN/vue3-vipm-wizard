<script setup lang="ts">

import BaseButton from "./BaseButton.vue";
</script>

<template>
    <base-button class="
        text-white
        bg-blue-500 border-blue-500
        hover:bg-blue-600 hover:border-blue-600
        active:bg-blue-700 active:border-blue-700 active:shadow-inner
        disabled:bg-blue-400 disabled:border-blue-400
    ">
        <slot/>
    </base-button>
</template>
